import {expect} from 'chai';

import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {gennyDom, hasTag} from '../../../utils/test/gennyDom';
import {assertValid} from '../../../utils/test/validateHtml';

import {fileName} from '../html-from-scratch';
import {branchName, imgUrl} from './index';

const testDom = async function testDom(markup) {
	let {document} = await gennyDom(markup);
	let img = hasTag(document, 'img');
	expect(img.src).to.equal(imgUrl, `Set your image's src attribute to '${imgUrl}'`);
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await assertValid(markup);
	await testDom(markup);
};

export default test;
