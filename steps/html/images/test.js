import {assert} from '../../../utils/assert/assert';

import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {gennyDom, hasTag} from '../../../utils/test/gennyDom';
import {assertValid} from '../../../utils/test/validateHtml';

import fromScratchConfig from '../html-from-scratch';
import config from './index';

const {fileName} = fromScratchConfig;
const {branchName} = config;
const imgUrl = `${process.env.SERVER_DOMAIN}/public/images/penguin.jpg`;

const testDom = async function testDom(markup) {
	let {document} = await gennyDom(markup);
	let img = hasTag(document, 'img');
	assert.isEqual(img.src, imgUrl, `Set your image's src attribute to '${imgUrl}'`);
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	await assertValid(markup, 2);
	await testDom(markup);
};

export default test;
