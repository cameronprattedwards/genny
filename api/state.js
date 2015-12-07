import express from 'express';
import squel from 'squel';
import {fromJS} from 'immutable';

import mysql from '../utils/mysql';
import {Paths} from './paths';
import {Client} from '../utils/github';
import UserService from '../domain/UserService';
import db from './steps';
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
	const {repoName} = await UserService.get({id});

	let state = fromJS({
		id,
		token,
		login,
		repoName,
		avatar: avatar_url,
		currentStep: db.modules[db.moduleOrder[0]].steps[0],
		db
	});

	let eventService = new EventService(id);
	let events = await eventService.getEventsForUser();

	state = events.reduce(reducer, state);

	return state;

	function stepCommitReducer(state, {step, success}) {
		let status = success ? 'success': 'failure';
		state = state.setIn(['db', 'steps', step, 'commit'], true);
		return state.setIn(['db', 'steps', step, status], true);
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
