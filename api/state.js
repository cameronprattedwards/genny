import express from 'express';
import {fromJS} from 'immutable';

import {Paths} from './paths';
import {Client} from '../utils/github';
import {NotFoundError} from '../utils/errors';
import UserService from '../domain/UserService';
import db from '../steps';
import {
	EVENT_TYPE_KEY,
	STEP_COMMIT,
	STEP_VISIT,
	EventService,
} from '../domain/EventService';

const app = express();

export const getUserState = async function getUserState(token) {
	const client = new Client(token);

	let {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	let repoName;
	try {
		 ({repoName} = await UserService.get({id}));
	} catch (e) {
		if (e instanceof TypeError) {
			throw new NotFoundError(`Cannot find user with ID ${id}`);
		}
		throw e;
	}

	let state = fromJS({
		id,
		token,
		login,
		repoName,
		avatar: avatar_url,  // eslint-disable-line camelcase
		currentStep: db.modules[db.moduleOrder[0]].steps[0],
		db,
	});

	let eventService = new EventService(id);
	let events = await eventService.getEventsForUser();

	state = events.reduce(reducer, state);

	return state;

	function stepCommitReducer(state, {step, success, failureMessage}) {
		failureMessage = failureMessage || true;
		let status = success ? 'success' : 'failure';
		let notStatus = success ? 'failure' : 'success';
		state = state.setIn(['db', 'steps', step, 'commit'], true);
		state = state.setIn(['db', 'steps', step, status], failureMessage);
		return state.setIn(['db', 'steps', step, notStatus], false);
	}

	function stepVisitReducer(state, {step}) {
		return state.set('currentStep', step);
	}

	function reducer(state, event) {
		switch (event[EVENT_TYPE_KEY]) {
			case STEP_COMMIT:
				return stepCommitReducer(state, event);
			case STEP_VISIT:
				return stepVisitReducer(state, event);
		}
	}
};

const handleStateRequest = async function handleStateRequest(request, response) {
	const state = await getUserState(request.query.token);
	response.status(200).send(state);
};

app.get(Paths.GET_USER_STATE, handleStateRequest);

export default app;
