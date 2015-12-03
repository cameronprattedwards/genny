import express from 'express';
import squel from 'squel';
import mysql from '../utils/mysql';

import {Paths} from './paths';
import {Client} from '../utils/github';
import UserService from '../domain/UserService';
import {
	EVENT_TYPE_KEY,
	MODULE_CREATE,
	STEP_CREATE,
	STEP_BRANCH_NAME_UPDATE,
	STEP_COMMIT,
	STEP_VISIT,
	STEP_DELETE,
	EventService,
} from '../domain/EventService';

const app = express();

export const getUserState = async function getUserState(token) {
	const client = new Client(token);

	let {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	const {repoName} = await UserService.get({id});
	let db = {
		steps: {},
		modules: {},
		branchNameToStep: {},
	};

	let state = {
		id,
		token,
		login,
		repoName,
		avatar: avatar_url,  // eslint-disable-line camelcase
		currentStep: null,
		db,
		modules: [],
	};

	let eventService = new EventService(id);
	let events = await eventService.getEventsForUser();
	console.log('events!');
	console.log(events);
	events.forEach(reducer);

	if (state.currentStep === null) {
		state.currentStep = db.modules[state.modules[0]].steps[0];
	}

	return state;

	function moduleCreateReducer({name, id, index}) {
		db.modules[id] = {name, id, steps: []};
		state.modules.splice(index, 0, id);
	}

	function stepCreateReducer({name, id, index, module}) {
		db.steps[id] = {name, id, module};
		db.modules[module].steps.splice(index, 0, id);
	}

	function stepBranchNameUpdateReducer({step, branchName}) {
		db.steps[step].branchName = branchName;
		db.branchNameToStep[branchName] = step;
	}

	function stepCommitReducer({step, success}) {
		let status = success ? 'success': 'failure';
		db.steps[step].commit = true;
		db.steps[step][status] = true;
	}

	function stepVisitReducer({step}) {
		if (db.steps[step]) {
			state.currentStep = step;
		}
	}

	function stepDeleteReducer({step}) {
		let {module} = db.steps[step];
		let moduleObject = db.modules[module];
		moduleObject.steps.splice(moduleObject.steps.indexOf(step), 1);
		delete db.steps[step];

		if (state.currentStep === step) {
			state.currentStep = null;
		}
	}

	function reducer(event) {
		switch (event[EVENT_TYPE_KEY]) {
			case MODULE_CREATE:
				moduleCreateReducer(event);
				break;
			case STEP_CREATE:
				stepCreateReducer(event);
				break;
			case STEP_BRANCH_NAME_UPDATE:
				stepBranchNameUpdateReducer(event);
				break;
			case STEP_COMMIT:
				stepCommitReducer(event);
				break;
			case STEP_VISIT:
				stepVisitReducer(event);
				break;
			case STEP_DELETE:
				stepDeleteReducer(event);
				break;
		}
	}	
};

const handleStateRequest = async function handleStateRequest(request, response) {
	const state = await getUserState(request.query.token);
	response.status(200).send(state);
};

app.get(Paths.GET_USER_STATE, handleStateRequest);

export default app;
