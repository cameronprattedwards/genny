import express from 'express';
import api from '../api/server';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {reversePath, BASE_PATH} from '../api/paths';

const app = express();
const {PORT} = process.env;
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf8'});
const index = _.template(indexHtml)(process.env);

app.use(BASE_PATH, api);

app.get('/', (request, response) => { 
	response.send(index);
});

app.use('/public', express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
	console.log(`API listening on ${PORT}`);
});
