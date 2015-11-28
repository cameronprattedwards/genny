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
	const {userId} = request.params;
	const {webhookSecret, token} = await UserService.get(userId);
	const calculatedSignature = getHookSignature(JSON.stringify(request.body), webhookSecret).toString();
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;

	if (!isSecure) {
		return;
	}

	const steps = {};

	for (let file of request.body.head_commit.added) {
		const [directoryName, fileName] = file.split('/');
		let step;
		if (steps[directoryName]) {
			step = steps[directoryName];
		} else {
			[step] = await StepService.get({directoryName});
			steps[directoryName] = step;
		}

		notify(token, step.id, 'commit');
		if (testMapping[directoryName](request.body)) {
			notify(token, step.id, 'success');
		} else {
			notify(token, step.id, 'failure');
		}
	}
};

function notify(token, stepId, event) {
	let child = firebaseApp.child(token).child(stepId).child(event);
	child.set(true, () => child.remove());
}

app.post(Paths.HOOK[0], hookFn);

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
