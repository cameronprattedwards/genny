import express from 'express';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';

import {BASE_PATH} from '../api/paths';
import api from '../api/server';
import {getUserState} from '../api/state';

const app = express();
app.use(cookieParser());

const {PORT, FIREBASE_NAME, CLIENT_DOMAIN} = process.env;
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf8'});
const indexTemplate = _.template(indexHtml);

app.use(BASE_PATH, api);

app.use('/public', express.static(path.join(__dirname, 'dist')));

const handleDefaultRequest = async function handleDefaultRequest(request, response) {
	try {
		const {token} = request.cookies;
		let state = {};
		if (token) {
			state = await getUserState(token);
		}
		const string = indexTemplate({env: {FIREBASE_NAME}, CLIENT_DOMAIN, state});
		response.send(string);
	} catch (e) {
		console.log(e);
		response.status(500).send(JSON.stringify(e));
	}
};

app.get('/*', handleDefaultRequest);


app.listen(PORT, () => {
	console.log(`API listening on ${PORT}`);
});
