import express from 'express';
import bodyParser from 'body-parser';
import {Paths} from './paths';
import UserService from '../domain/UserService';
import {getHookSignature} from '../utils/github';

const app = express();

app.use(bodyParser.json());

console.log(Paths.HOOK[0]);

const hookFn = async function hookFn(request, response) {
	response.status(200).send('');
	const {userId} = request.params;
	const {webhookSecret} = await UserService.get(userId);
	const calculatedSignature = getHookSignature(JSON.stringify(request.body), webhookSecret).toString();
	const isSecure = request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;
};

app.post(Paths.HOOK[0], hookFn);

const {WEBHOOK_PORT} = process.env;

app.listen(WEBHOOK_PORT, () => {
	console.log(`Webhook server listening on ${WEBHOOK_PORT}`);
});
