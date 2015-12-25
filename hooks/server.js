import express from 'express';
import bodyParser from 'body-parser';
import Firebase from 'firebase';
import AssertionError from 'assertion-error';

import {Paths} from './paths';
import UserService from '../domain/UserService';
import StepService from '../domain/StepService';
import {getHookSignature} from '../utils/github';
import testMapping from '../steps/tests';

const {WEBHOOK_PORT, FIREBASE_NAME} = process.env;

const firebaseApp = new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`);

const app = express();

app.use(bodyParser.json());

const hookFn = async function hookFn(request, response) {
	console.log(1);
	response.status(200).send('');
	const hook = request.body;
	const {userId} = request.params;
	const {webhookSecret, token} = await UserService.get({id: userId});
	const calculatedSignature = getHookSignature(JSON.stringify(hook), webhookSecret).toString();
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;
	console.log(2);

	if (!isSecure) {
		return;
	}

	const [, branchName] = /refs\/heads\/(.*)/.exec(hook.ref);

	const lastCommit = await StepService.getLastCommit(userId, branchName);

	if (lastCommit && lastCommit.success) {
		return;
	}

	console.log(3);
	notify(token, branchName, 'commit');
	let success;
	let failureMessage;

	console.log(4);
	try {
		await testMapping[branchName](hook);
		success = true;
	} catch (e) {
		console.log(e.message);
		console.log(e.stack);
		if (e instanceof AssertionError) {
			failureMessage = e.message;
			success = false;
		} else {
			throw e;
		}
	}

	console.log(5);
	let event = success ? 'success' : 'failure';

	let eventContent = failureMessage || true;
	console.log(6);

	notify(token, branchName, event, eventContent);
	console.log(7);
	StepService.commit(userId, branchName, success, failureMessage);
	console.log(8);
};

function notify(token, stepId, event, eventContent = true) {
	let child = firebaseApp.child(token).child(stepId).child(event);
	child.set(eventContent);
	child.remove();
}

app.post(Paths.HOOK[0], hookFn);

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
