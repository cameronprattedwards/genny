import {expect} from 'chai';

import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {gennyDom, hasTag} from '../../../utils/test/gennyDom';
import {assertValid} from '../../../utils/test/validateHtml';

import {fileName} from '../html-from-scratch';
import {branchName, youTubeLink, youTubeText} from './index';

const testDom = async function testDom(markup) {
	let {document} = await gennyDom(markup);
	let a = hasTag(document, 'a', youTubeText, `Set your anchor tag's content to '${youTubeText}'`);
	expect(a.href).to.equal(youTubeLink, `Set your anchor tag's href attribute to '${youTubeLink}'`);
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await assertValid(markup);
	await testDom(markup);
};

export default test;
