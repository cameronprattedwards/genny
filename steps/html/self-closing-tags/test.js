import {assertHasFile} from 'utils/test/hasFile';
import {assertValid} from 'utils/test/validateHtml';
import {getRawFile} from 'utils/github';

import config from './index';
import fromScratchConfig from 'steps/html/html-from-scratch';

const {fileName} = fromScratchConfig;
const {branchName} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);
	await assertValid(markup, 1);
	// expect(markup).to.match(/<img\s+src=("|')[^"']+("|')\s*\/>/);
};

export default test;
