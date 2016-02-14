import {getStepUrl} from './getStepUrl';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const index = fs.readFileSync(path.join(__dirname, 'oauth.html'), {encoding: 'utf8'});
const template = _.template(index);

export const getHtml = async function getHtml(id, token) {
	let stepUrl = await getStepUrl(id);
	return template({token, stepUrl});
}
