import express from 'express';
import bodyParser from 'body-parser';
import Firebase from 'firebase';

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
	const step = await StepService.get({branchName});

	if (!step) {
		return;
	}

	notify(token, step.id, 'commit');
	let success = testMapping[branchName](hook);
	notify(token, step.id, success ? 'success' : 'failure');
	StepService.commit(userId, step.id, success);
};

function notify(token, stepId, event) {
	let child = firebaseApp.child(token).child(stepId).child(event);
	child.set(true);
	child.remove();
}

app.post(Paths.HOOK[0], hookFn);

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
