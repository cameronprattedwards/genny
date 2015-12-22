import {getRawFile} from '../../../utils/github';
import {assertHasFile} from '../../../utils/test/hasFile';
import {assertValid} from '../../../utils/test/validateHtml';
import {gennyDom, hasTag} from '../../../utils/test/gennyDom';

import fromScratchConfig from '../html-from-scratch';
import config from './index';

const {branchName} = config;
const {fileName} = fromScratchConfig;

const testDom = async function testDom(markup) {
	let {document} = await gennyDom(markup);
	hasTag(document, 'strong', 'male');
	hasTag(document, 'em', 'most desirable');
};

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);

	assertValid(markup);
	testDom(markup);
};

export default test;
