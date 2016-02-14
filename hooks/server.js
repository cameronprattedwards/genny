import express from 'express';
import bodyParser from 'body-parser';

import {Paths} from './paths';

import {runTest} from './runTest';
import {isSecure} from './isSecure';
import {notify} from './notify';
import {persist} from './persist';
import {getMetadataFromRequest} from './getMetadataFromRequest';
import {getBranchNameFromHook} from './getBranchNameFromHook';
import {commitExists} from './commitExists';

const hookFn = async function hookFn(request, response) {
	response.status(200).send('');
	const {hook, userId, webhookSecret, token} = await getMetadataFromRequest(request);

	if (!isSecure(hook, webhookSecret, request)) {
		return;
	}

	const branchName = getBranchNameFromHook(hook);

	if (await commitExists(userId, branchName)) {
		return;
	}

	notify(token, branchName, COMMIT);

	let [status, error] = await runTest(branchName, hook);
	persist(userId, token, branchName, status, error);
};

const {WEBHOOK_PORT} = process.env;

const app = express();

app.use(bodyParser.json());

app.post(Paths.HOOK[0], hookFn);

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
