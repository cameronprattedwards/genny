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
	console.log(1);
	response.status(200).send('');
	console.log(2);
	const {userId} = request.params;
	console.log(3);
	const {webhookSecret, token} = await UserService.get({id: userId});
	console.log(4);
	const calculatedSignature = getHookSignature(JSON.stringify(request.body), webhookSecret).toString();
	console.log(5);
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;
	console.log(6);

	if (!isSecure) {
		return;
	}

	const steps = {};

	for (let file of request.body.head_commit.added) {
		console.log(7);
		const [directoryName] = file.split('/');
		console.log(8);
		let step;
		if (steps[directoryName]) {
			console.log(9);
			step = steps[directoryName];
		} else {
			console.log(10);
			[step] = await StepService.get({directoryName});
			console.log(11);

			if (!step) {
				continue;
			}

			steps[directoryName] = step;
		}

		let success;

		console.log(12);
		notify(token, step.id, 'commit');
		console.log(13);
		if (testMapping[directoryName](request.body)) {
			console.log(14);
			notify(token, step.id, 'success');
			console.log(15);
			success = true;
		} else {
			console.log(16);
			notify(token, step.id, 'failure');
			console.log(17);
			success = false;
		}

		console.log(18);
		StepService.commit(userId, step.id, success);
	}
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
