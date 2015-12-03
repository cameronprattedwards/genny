import express from 'express';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { fromJS } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';

import {routes} from '../client/dist/server';
import {BASE_PATH} from '../api/paths';
import api from '../api/server';
import {getUserState} from '../api/state';
import { match, RoutingContext } from 'react-router';

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
		} else if (request.path !== '/') {
			return response.redirect('/');
		}

		state = fromJS(state);
		const store = createStore(() => state);

		match({routes, location: request.path}, (error, redirectLocation, renderProps) => {
			if (error) {
				console.log(error);
				response.status(error.status ? error.status : 500).send(error.message);
			} else if (redirectLocation) {
				response.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				const html = renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);
				const string = indexTemplate({env: {FIREBASE_NAME}, CLIENT_DOMAIN, state, html});
				response.send(string);
			}
		});
	} catch (e) {
		console.log(e);
		response.status(500).send(JSON.stringify(e));
	}
};

app.get('/*', handleDefaultRequest);


app.listen(PORT, () => {
	console.log(`API listening on ${PORT}`);
});
