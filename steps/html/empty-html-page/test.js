import {assert} from '../../../utils/assert/assert';

import config from './index';
import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';

const {fileName, branchName, firstWebpage} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let text = await getRawFile(hook, branchName, fileName);
	assert.codeIsEqual(text.trim(), firstWebpage.trim());
};

export default test;
