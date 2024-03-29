import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {assertValid} from '../../../utils/test/validateHtml';

import fromScratchConfig from '../html-from-scratch';
import config from './index';

const {fileName} = fromScratchConfig;
const {branchName} = config;

const validate = async function validate(markup) {
	return assertValid(markup, 0, `Looks like your HTML isn't validating. 
		Did you add a title tag? Are you closing all your tags?`);
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);
	await validate(markup);
};

export default test;
