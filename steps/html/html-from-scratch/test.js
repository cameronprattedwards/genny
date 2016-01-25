import {assert} from '../../../utils/assert/assert';

import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';
import {assertValid} from '../../../utils/test/validateHtml';
import config from './index';

let {fileName, branchName} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let markup = await getRawFile(hook, branchName, fileName);
	let [error] = await assertValid(markup, 1);
	assert.isEqual(error.message, 'Element “head” is missing a required instance of child element “title”.');
};

export default test;
