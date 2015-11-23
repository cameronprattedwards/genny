import express from 'express';
import qs from 'qs';
import randomstring from 'randomstring';
import 'isomorphic-fetch';
import cookieParser from 'cookie-parser';
import {Paths, reversePath} from './paths';
import mysql from '../utils/mysql';
import squel from 'squel';

const app = express();

const STATE_KEY = 'state';

const {
	CLIENT_ID,
	CLIENT_SECRET,
} = process.env;

app.use(cookieParser());

app.get(Paths.LOGIN, (request, response) => {
	const redirectUri = reversePath(Paths.CALLBACK);
	const state = randomstring.generate({ length: 32 });
	const params = {
		[STATE_KEY]: state,
		scope: 'user, repo',
		redirect_uri: redirectUri,
		client_id: CLIENT_ID,
	};

	response
		.cookie('state', state)
		.redirect('https://github.com/login/oauth/authorize?' + qs.stringify(params));
});

app.get(Paths.CALLBACK, (request, response) => {
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

function getToken(code) {
	const params = {
		code,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	const options = {
		headers: {
			'Accept': 'application/json',
		}
	};

	return fetch('https://github.com/login/oauth/access_token?' + qs.stringify(params), options)
		.then(githubResponse => githubResponse.json())
		.then(body => body.access_token);
}

const BASE_REPO_NAME = 'genny-test';

const makeRepo = async function makeRepo(accessToken) {
	const headers = {
		'Accept': 'application/json',
		'Authorization': 'Token ' + accessToken,
	};

	const githubResponse = await fetch('https://api.github.com/user', {headers});
	const body = await githubResponse.json();
	const query = squel.select().from('User').where(`id = ${id}`);
	const [user] = await mysql(query);
	if (!user) {
		let repoName = BASE_REPO_NAME;
		const reposResponse = await fetch('https://api.github.com/user/repos?sort=full_name', {headers});
		const reposBody = await githubResponse.json();
		console.log(reposBody);
	}
}

export default app;
