import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {RoutingContext} from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import DocumentTitle from 'react-document-title';

const {FIREBASE_NAME, CLIENT_DOMAIN, SERVER_DOMAIN} = process.env;
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf8'});
const indexTemplate = _.template(indexHtml);

export function getHtml(renderProps, store) {
	const html = renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);
	const title = DocumentTitle.rewind();
	return indexTemplate({env: {FIREBASE_NAME, SERVER_DOMAIN}, CLIENT_DOMAIN, state: store.getState(), html, title});
}
