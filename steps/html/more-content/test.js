import {assertHasFile} from 'utils/test/hasFile';
import {assertValid} from 'utils/test/validateHtml';
import {gennyDom, hasTag} from 'utils/test/gennyDom';
import {getRawFile} from 'utils/github';

import {branchName} from './index';
import {fileName} from 'steps/html/html-from-scratch';

const test = async function test(hook) {
	assertHasFile(hook, fileName);
	let markup = await getRawFile(hook, branchName, fileName);
	await assertValid(markup);
	let {document} = await gennyDom(markup);
	hasTag(document, 'pre');
};

export default test;
