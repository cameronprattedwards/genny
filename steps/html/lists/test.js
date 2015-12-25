import {expect} from 'chai';

import {assertHasFile} from 'utils/test/hasFile';
import {assertValid} from 'utils/test/validateHtml';
import {gennyDom, hasTag} from 'utils/test/gennyDom';
import {getRawFile} from 'utils/github';

import config from './index';
import fromScratchConfig from 'steps/html/html-from-scratch';

const {branchName} = config;
const {fileName} = fromScratchConfig;

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await assertValid(markup, 2);

	let {document} = await gennyDom(markup);
	hasTag(document, 'ul');
	let lis = document.getElementsByTagName('li');
	expect(lis.length).to.be.above(4, 'Please include at least five list items');
};

export default test;
