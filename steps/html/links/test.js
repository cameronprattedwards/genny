import {expect} from 'chai';

import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {gennyDom, hasTag} from '../../../utils/test/gennyDom';
import {assertValid} from '../../../utils/test/validateHtml';

import fromScratchConfig from '../html-from-scratch';
import config from './index';

const {fileName} = fromScratchConfig;
const {branchName, youTubeLink, youTubeText} = config;

const testDom = async function testDom(markup) {
	let {document} = await gennyDom(markup);
	let a = hasTag(document, 'a', youTubeText, `Set your anchor tag's content to '${youTubeText}'`);
	expect(a.href).to.equal(youTubeLink, `Set your anchor tag's href attribute to '${youTubeLink}'`);
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await assertValid(markup, 2);
	await testDom(markup);
};

export default test;
