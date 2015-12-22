import {expect} from 'chai';

import {assertValid} from '../../../utils/test/validateHtml';
import {getRawFile} from '../../../utils/github';
import {hasFile} from '../../../utils/test/hasFile';
import {TagAsserter} from '../../../utils/test/gennyDom';

import {branchName} from './index';
import {fileName} from '../html-from-scratch';

const testDom = async function testDom(markup) {
	let asserter = await TagAsserter.instance(markup);
	asserter.hasTag('h1', 'Interesting Penguin Facts');
	asserter.hasTag('p');
};

const validate = async function validate(markup) {
	let [error] = await assertValid(markup, 1);
	expect(error.message).to.equal('Element “head” is missing a required instance of child element “title”.');
};

const test = async function test(hook) {
	hasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await validate(markup);
	await testDom(markup);
};

export default test;
