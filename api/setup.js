import express from 'express';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import UserService from '../domain/UserService';
import {Paths} from './paths';
import {Client} from '../utils/github';
import setupConfig from '../steps/html/environment-setup';

const {branchName} = setupConfig;

const app = express();

const scriptPath = path.join(__dirname, 'setup.sh');
const script = fs.readFileSync(scriptPath, {encoding: 'utf8'});
const tmpl = _.template(script);

const getSetupScript = async function getSetupScript(request, response) {
	try {
		const {token} = request.params;
		const user = await UserService.get({token});

		if (!user) {
			response.status(403).send('');
		}

		let {repoName} = user;
		let client = new Client(token);
		let {login} = await client.getUser();
		let [email] = await client.getEmails();

		response.set('Content-Type', 'text/plain');
		response.status(200).send(tmpl({login, email: email.email, repoName, branchName}));
	} catch (e) {
		console.log(e.stack);
	}
};

app.get(Paths.SETUP[0], getSetupScript);

export default app;
