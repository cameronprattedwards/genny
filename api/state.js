import express from 'express';
import {Paths} from './paths';
import {Client} from '../utils/github';

const app = express();

const getUserState = async function getUserState(request, response) {
	const {token} = request.query;
	const client = new Client(token);

	const {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	const state = {
		id,
		token,
		login,
		avatar: avatar_url,  // eslint-disable-line camelcase
		currentStep: null,
		steps: {},
		modules: {},
	};
	response.status(200).send(state);
};

app.get(Paths.GET_USER_STATE, getUserState);

export default app;
