import express from 'express';
import {createStore} from 'redux';

import {Paths} from './paths';
import {Client} from '../utils/github';
import {NotFoundError} from '../utils/errors';
import UserService from '../domain/UserService';
import db from '../steps';
import {rootReducerFactory} from '../flux/reducers';
import {EventService} from '../domain/EventService';

const app = express();

export const getUserState = async function getUserState(token) {
	const client = new Client(token);

	let {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	let [email] = await client.getEmails();
	let repoName;
	try {
		 ({repoName} = await UserService.get({id}));
	} catch (e) {
		if (e instanceof TypeError) {
			throw new NotFoundError(`Cannot find user with ID ${id}`);
		}
		throw e;
	}

	let state = {
		user: {
			id,
			token,
			login,
			repoName,
			email,
			avatar: avatar_url,  // eslint-disable-line camelcase
			currentStep: db.modules[db.moduleOrder[0]].steps[0],
		},
		env: {
			SERVER_DOMAIN: process.env.SERVER_DOMAIN,
		},
		ui: {},
		db,
	};

	let eventService = new EventService(id);
	let events = await eventService.getEventsForUser();
	let rootReducer = rootReducerFactory(state);

	let store = createStore(rootReducer);
	events.forEach(event => {
		store.dispatch({...event});
	});

	return store;

	return store.getState();
};

const handleStateRequest = async function handleStateRequest(request, response) {
	const store = await getUserState(request.query.token);
	response.status(200).send(store.getState());
};

app.get(Paths.GET_USER_STATE, handleStateRequest);

export default app;
