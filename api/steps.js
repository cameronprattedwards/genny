import express from 'express';
import squel from 'squel';

import UserService from '../domain/UserService';
import {Paths} from './paths';
import mysql from '../utils/mysql';

const app = express();

const addVisit = async function addVisit(request, response) {
	const {token} = request.query;
	const user = await UserService.get({token});

	if (!user) {
		response.status(403).send('');
	}

	let query = squel.insert().into('Step_visit')
		.set('visitedAt', new Date().getTime())
		.set('User_id', user.id)
		.set('Step_id', request.params.stepId);
	await mysql(query);
	response.status(200).send('');
};

app.post(Paths.ADD_VISIT[0], addVisit);

export default app;
