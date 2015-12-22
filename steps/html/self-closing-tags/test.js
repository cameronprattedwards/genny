import {expect} from 'chai';

import {assertHasFile} from 'utils/test/hasFile';
import {assertValid} from 'utils/test/validateHtml';
import {getRawFile} from 'utils/github';

import {branchName} from './index';
import {fileName} from 'steps/html/html-from-scratch';

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);
	await assertValid(markup);
	expect(markup).to.match(/<img\s+src=[^\/>]+\s*\/>/);
};

export default test;
