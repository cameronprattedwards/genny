import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import {matchRoutes} from '../../utils/matchRoutes';
import {routes} from '../../client/public/dist/server';
import {BASE_PATH} from '../../api/paths';
import api from '../../api/server';

import {getState} from './getState';
import {userIsLost} from './userIsLost';
import {getHtml} from './getHtml';
import {handleError} from './handleError';

const app = express();
app.use(cookieParser());

const {PORT} = process.env;

app.use(BASE_PATH, api);

app.use('/public/themes', express.static(path.join(__dirname, '../../node_modules/highlight.js/styles')));
app.use('/public', express.static(path.join(__dirname, '../public')));

const handleDefaultRequest = async function handleDefaultRequest(request, response) {
	try {
		const {token} = request.cookies;
		if (userIsLost(request, token)) {
			return response.redirect('/');
		}
		let store = await getState(request, token);

		let [redirectLocation, renderProps] = await matchRoutes({routes, location: request.path});
		if (redirectLocation) {
			response.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const string = getHtml(renderProps, store);
			response.send(string);
		}
	} catch (e) {
		handleError(response, e);
	}
};

app.get('/*', handleDefaultRequest);

app.listen(PORT, () => {
	console.log(`API listening on ${PORT}`);
});
