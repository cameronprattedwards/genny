import express from 'express';
import qs from 'qs';
import randomstring from 'randomstring';
import 'isomorphic-fetch';
import cookieParser from 'cookie-parser';
import apiPaths from './paths';
import webhookPaths from '../hooks/paths';
import mysql from '../utils/mysql';
import squel from 'squel';
import github from '../utils/github';

const app = express();

const STATE_KEY = 'state';

const {
	CLIENT_ID,
	CLIENT_SECRET,
	WEBHOOK_DOMAIN,
} = process.env;

app.use(cookieParser());

app.get(apiPaths.Paths.LOGIN, (request, response) => {
	const redirectUri = apiPaths.reversePath(apiPaths.Paths.CALLBACK);
	const state = randomstring.generate({ length: 32 });
	const params = {
		[STATE_KEY]: state,
		scope: 'user, repo',
		redirect_uri: redirectUri,
		client_id: CLIENT_ID,
	};

	response
		.cookie('state', state)
		.redirect(github.Paths.AUTHORIZE(params));
});

app.get(apiPaths.Paths.CALLBACK, (request, response) => {
	const {code} = request.query;
	const storedState = request.cookies[STATE_KEY];
	const receivedState = request.query[STATE_KEY];

	if (storedState !== receivedState) {
		response.status(400).send('Ya tryin to trick me?');
	}

	getToken(code)
		.then(accessToken => makeRepo(accessToken))
		.then(() => {
			response.status(200).send('yeah!');
		});
});

const getToken = async function getToken(code) {
	const params = {
		code,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	const {access_token} = await github.request(github.Paths.ACCESS_TOKEN(params));

	return access_token;
}

const BASE_REPO_NAME = 'genny-test';
const GITHUB_ADMIN = 'cameronprattedwards';

const makeRepo = async function makeRepo(accessToken) {
	const client = new github.Client(accessToken);
	const {id, login} = await client.getUser();
	const query = squel.select().from('User').where(`id = ${id}`);
	const [gennyUser] = await mysql(query);

	if (!gennyUser) {
		const repos = await client.getRepos();
		const repoName = getRepoName(repos);
		const repo = {
			name: repoName,
			description: 'This is your Genny repository',
		};
		await client.createRepo(repo);
		await client.addPermissions(login, repoName, GITHUB_ADMIN);
		const hookUrl = webhookPaths.reversePath(webhookPaths.Paths.HOOK, true, {userId: id});
		const secret = randomstring.generate({ length: 32 });
		const hook = {
			name: 'web',
			events: ['push', 'pull_request'],
			config: {
				url: hookUrl,
				content_type: 'json',
				secret,
			},
			active: true,
		};

		await client.createHook(hook, login, repoName);

		const createQuery = squel.insert().into('User').set('id', id).set('repoName', repoName).set('token', accessToken).set('webhookSecret', secret);
		return mysql(createQuery);
	}
}

function getRepoName(repos) {
	let repoName = BASE_REPO_NAME;
	let counter = 1;

	for (let i = 0; i < repos.length; i++) {
		const {name} = repos[i];
		if (name === repoName) {
			repoName = `${BASE_REPO_NAME}-${counter}`;
			counter++;
		} else if (name[0] > BASE_REPO_NAME[0]) {
			break;
		}
	}

	return repoName;
}

function signHookRequest(body, secret) {
	return HmacSHA1(JSON.stringify(body), secret);
}

export default app;
