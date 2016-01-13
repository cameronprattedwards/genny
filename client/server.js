import express from 'express';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { match, RoutingContext } from 'react-router';
import DocumentTitle from 'react-document-title';
import {Map, fromJS} from 'immutable';

import {UnauthorizedError} from '../utils/errors';
import {routes} from '../client/dist/server';
import {BASE_PATH} from '../api/paths';
import api from '../api/server';
import {getUserState} from '../api/state';
import {getOs} from '../utils/getOs';
import {setOs} from '../flux/actionCreators';

const app = express();
app.use(cookieParser());

const {PORT, FIREBASE_NAME, CLIENT_DOMAIN, SERVER_DOMAIN} = process.env;
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf8'});
const indexTemplate = _.template(indexHtml);

app.use(BASE_PATH, api);

app.use('/public/themes', express.static(path.join(__dirname, '../node_modules/highlight.js/styles')));
app.use('/public', express.static(path.join(__dirname, 'dist')));

const handleDefaultRequest = async function handleDefaultRequest(request, response) {
	try {
		const os = getOs(request.get('user-agent'));

		const {token} = request.cookies;
		let state = {
			ui: fromJS({os}),
			db: Map(),
			env: {
				SERVER_DOMAIN: process.env.SERVER_DOMAIN,
			},
			user: Map(),
		};

		let store = createStore(() => state);

		if (token) {
			store = await getUserState(token);
			store.dispatch(setOs(os));
			state = store.getState();
		} else if (request.path !== '/') {
			return response.redirect('/');
		}

		match({routes, location: request.path}, (error, redirectLocation, renderProps) => {
			if (error) {
				response.status(error.status ? error.status : 500).send(error.message);
			} else if (redirectLocation) {
				response.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				const html = renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);
				const title = DocumentTitle.rewind();
				const string = indexTemplate({env: {FIREBASE_NAME, SERVER_DOMAIN}, CLIENT_DOMAIN, state, html, title});
				response.send(string);
			}
		});
	} catch (e) {
		console.log(e.stack);
		if (e instanceof UnauthorizedError) {
			response.cookie('token', '', {expires: new Date(0)});
		}
		let text = `Sorry, we encountered a problem processing your request.

${e.stack}`;

		response.set('Content-Type', 'text/plain');

		response.status(e.status ? e.status : 500).send(text);
	}
};

app.get('/*', handleDefaultRequest);


app.listen(PORT, () => {
	console.log(`API listening on ${PORT}`);
});
