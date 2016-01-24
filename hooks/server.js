import express from 'express';
import bodyParser from 'body-parser';
import Firebase from 'firebase';
import {AssertionError} from '../utils/assert/AssertionError';

import {Paths} from './paths';
import UserService from '../domain/UserService';
import StepService from '../domain/StepService';
import {getHookSignature} from '../utils/github';
import {errorSerializer} from '../utils/errorSerializer';
import testMapping from '../steps/tests';
import {SUCCESS, COMMIT, FAILURE} from '../domain/constants';

const {WEBHOOK_PORT, FIREBASE_NAME} = process.env;

const firebaseApp = new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`);

const app = express();

app.use(bodyParser.json());

const hookFn = async function hookFn(request, response) {
	response.status(200).send('');
	const hook = request.body;
	const {userId} = request.params;
	const {webhookSecret, token} = await UserService.get({id: userId});
	const calculatedSignature = getHookSignature(JSON.stringify(hook), webhookSecret).toString();
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;

	if (!isSecure) {
		return;
	}

	const [, branchName] = /refs\/heads\/(.*)/.exec(hook.ref);

	const lastCommit = await StepService.getLastCommit(userId, branchName);

	if (lastCommit && lastCommit.success) {
		return;
	}

	notify(token, branchName, COMMIT);
	let status = SUCCESS;
	let error = false;

	try {
		await testMapping[branchName](hook);
	} catch (e) {
		console.log(e.message);
		console.log(e.stack);
		console.log('is assertion error');
		console.log(e instanceof AssertionError);
		if (e instanceof AssertionError) {
			error = errorSerializer(e);
			status = FAILURE;
		} else {
			throw e;
		}
	}

	notify(token, branchName, status, error);
	StepService.commit(userId, branchName, status === SUCCESS, error);
};

function notify(token, stepId, status, error = false) {
	console.log('notifying');
	console.log(arguments);
	let child = firebaseApp.child(token).child(stepId).child(status);
	child.set(error);
	child.remove();
}

app.post(Paths.HOOK[0], hookFn);

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
