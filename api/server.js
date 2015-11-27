import express from 'express';
import randomstring from 'randomstring';
import 'isomorphic-fetch';
import cookieParser from 'cookie-parser';
import apiPaths from './paths';
import github from '../utils/github';
import UserService from '../domain/UserService';
import {RepoService} from '../domain/RepoService';

const app = express();

const STATE_KEY = 'state';

const {CLIENT_ID, CLIENT_SECRET} = process.env;

app.use(cookieParser());

app.get(apiPaths.Paths.LOGIN, login);

function login(request, response) {
	const redirectUri = apiPaths.reversePath(apiPaths.Paths.CALLBACK);
	const state = randomstring.generate({ length: 32 });
	const params = {
		[STATE_KEY]: state,
		scope: 'user, repo',
		'redirect_uri': redirectUri,
		'client_id': CLIENT_ID,
	};

	response
		.cookie('state', state)
		.redirect(github.Paths.authorize(params));
}

const getToken = async function getToken(code) {  // eslint-disable-line no-unused-vars
	const params = {
		code,
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET,
	};

	const response = await github.request(github.Paths.accessToken(params));

	return response['access_token'];
};

const makeRepo = async function makeRepo(accessToken) {  // eslint-disable-line no-unused-vars
	const client = new github.Client(accessToken);
	const {id, login} = await client.getUser();
	const gennyUser = await UserService.get(id);

	if (!gennyUser) {
		const repoService = new RepoService(accessToken, {id, login});
		const {repoName, webhookSecret} = await repoService.create();
		const user = {
			id,
			repoName,
			accessToken,
			webhookSecret,
		};

		return UserService.create(user);
	}
};

const callback = async function callback(request, response) {  // eslint-disable-line no-unused-vars
	const {code} = request.query;
	const storedState = request.cookies[STATE_KEY];
	const receivedState = request.query[STATE_KEY];

	if (storedState !== receivedState) {
		response.status(400).send('Ya tryin to trick me?');
	}

	const accessToken = await getToken(code);  // eslint-disable-line no-undef
	await makeRepo(accessToken);  // eslint-disable-line no-undef
	response.status(200).send('yeah!');
};

app.get(apiPaths.Paths.CALLBACK, callback);  // eslint-disable-line no-undef

const getUserState = async function getUserState(request, response) {
	const {token} = request.query;
	const client = new github.Client(token);

	const {id, login, avatar_url} = await client.getUser();
	const state = {
		id,
		token,
		login,
		avatar: avatar_url,
		currentStep: null,
		steps: {},
		modules: {},
	};
	response.status(200).send(state);
};

app.get(apiPaths.Paths.GET_USER_STATE, getUserState);

export default app;
