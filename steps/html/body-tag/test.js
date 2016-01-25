import {assert} from '../../../utils/assert/assert';

import {assertValid} from '../../../utils/test/validateHtml';
import {getRawFile} from '../../../utils/github';
import {hasFile} from '../../../utils/test/hasFile';
import {TagAsserter} from '../../../utils/test/gennyDom';

import config from './index';
import fromScratchConfig from '../html-from-scratch';

const {branchName} = config;
const {fileName} = fromScratchConfig;

const testDom = async function testDom(markup) {
	let asserter = await TagAsserter.instance(markup);
	asserter.hasTag('h1', 'Interesting Penguin Facts');
	asserter.hasTag('p');
};

const validate = async function validate(markup) {
	let [error] = await assertValid(markup, 1);
	assert.isEqual(error.message, 'Element “head” is missing a required instance of child element “title”.');
};

const test = async function test(hook) {
	hasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await validate(markup);
	await testDom(markup);
};

export default test;
