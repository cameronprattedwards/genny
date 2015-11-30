import express from 'express';
import squel from 'squel';
import mysql from '../utils/mysql';

import {Paths} from './paths';
import {Client} from '../utils/github';
import UserService from '../domain/UserService';

const app = express();

const getUserState = async function getUserState(request, response) {
	const {token} = request.query;
	const client = new Client(token);

	const {id, login, avatar_url} = await client.getUser();  // eslint-disable-line camelcase
	const {repoName} = await UserService.get({id});
	let db = {
		steps: {},
		modules: {},
		directoryNameToStep: {},
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

	let query = squel.select().from('Module').order('createdAt');

	let modules = await mysql(query);

	for (let module of modules) {
		let {name, id, index} = module;
		db.modules[id] = {name, id, steps: []};
		state.modules.splice(index, 0, id);
	}

	query = squel.select().from('Step').order('createdAt');
	let steps = await mysql(query);
	for (let step of steps) {
		let {name, id, index, Module_id} = step;  // eslint-disable-line camelcase
		db.steps[id] = {name, id, module: Module_id};  // eslint-disable-line camelcase
		db.modules[Module_id].steps.splice(index, 0, id);
	}

	query = squel.select().from('Step_directoryName_update').order('updatedAt');
	let updates = await mysql(query);
	for (let update of updates) {
		let {Step_id, directoryName} = update;  // eslint-disable-line camelcase
		db.steps[Step_id].directoryName = directoryName;
		db.directoryNameToStep[directoryName] = Step_id;  // eslint-disable-line camelcase
	}

	query = squel.select().from('Step_commit').order('committedAt')
		.where(`User_id = ${id}`)
		.field('Step_id')
		.field('success');

	let commits = await mysql(query);
	for (let commit of commits) {
		let {Step_id, success} = commit;  // eslint-disable-line camelcase
		let step = db.steps[Step_id];  // eslint-disable-line camelcase
		step.commit = true;
		if (success) {
			step.success = true;
		} else {
			step.failure = true;
		}
	}

	query = squel.select().from('Step_visit').order('visitedAt', false)
		.where(`User_id = ${id}`)
		.limit(1);

	let [visit] = await mysql(query);

	if (visit) {
		state.currentStep = visit.Step_id;
	}

	if (state.currentStep === null) {
		state.currentStep = db.modules[state.modules[0]].steps[0];
	}

	response.status(200).send(state);
};

app.get(Paths.GET_USER_STATE, getUserState);

export default app;
