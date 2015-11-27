import express from 'express';
import {Paths} from './paths';
import {Client} from '../utils/github';
import UserService from '../domain/UserService';

const app = express();

const getUserState = async function getUserState(request, response) {
	const {token} = request.query;
	const client = new Client(token);

	const {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	const {repoName} = await UserService.get(id);
	const state = {
		id,
		token,
		login,
		repoName,
		avatar: avatar_url,  // eslint-disable-line camelcase
		currentStep: null,
		steps: {},
		modules: {},
	};
	response.status(200).send(state);
};

app.get(Paths.GET_USER_STATE, getUserState);

export default app;
