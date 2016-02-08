import {assert} from '../../../utils/assert/assert';

import {assertValid} from '../../../utils/test/validateHtml';
import {getRawFile} from '../../../utils/github';
import {hasFile} from '../../../utils/test/hasFile';
import {TagAsserter} from '../../../utils/test/gennyDom';

import config from './index';
import fromScratchConfig from '../html-from-scratch';

const {branchName, paragraph} = config;
const {fileName} = fromScratchConfig;

const testDom = async function testDom(markup) {
	let asserter = await TagAsserter.instance(markup);
	let h1 = asserter.hasTag('h1');
	assert.tagIsNotEmpty(h1, 'Interesting Penguin Facts');
	let p = asserter.hasTag('p', paragraph);
	assert.tagIsNotEmpty(p, paragraph);
};

const validate = async function validate(markup) {
	let [error] = await assertValid(markup, 1);
	if (error) {
		assert.isEqual(error.message, 'Element “head” is missing a required instance of child element “title”.');
	}
};

const test = async function test(hook) {
	hasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await validate(markup);
	await testDom(markup);
};

export default test;
