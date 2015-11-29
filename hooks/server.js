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
	console.log(40);
	response.status(200).send('');
	console.log(41);
	const {userId} = request.params;
	console.log(42);
	const {webhookSecret, token} = await UserService.get(userId);
	console.log(43);
	const calculatedSignature = getHookSignature(JSON.stringify(request.body), webhookSecret).toString();
	console.log(44);
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;
	console.log(45);

	if (!isSecure) {
		return;
	}

	console.log(46);

	const steps = {};

	console.log(47);

	for (let file of request.body.head_commit.added) {
		console.log(48);
		const [directoryName] = file.split('/');
		console.log(49);
		let step;
		if (steps[directoryName]) {
			console.log(50);
			step = steps[directoryName];
		} else {
			console.log(51);
			[step] = await StepService.get({directoryName});

			if (!step) {
				continue;
			}

			console.log(52);
			steps[directoryName] = step;
		}

		console.log(53);
		notify(token, step.id, 'commit');
		console.log(54);
		if (testMapping[directoryName](request.body)) {
			console.log(55);
			notify(token, step.id, 'success');
		} else {
			console.log(56);
			notify(token, step.id, 'failure');
			console.log(57);
		}
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
