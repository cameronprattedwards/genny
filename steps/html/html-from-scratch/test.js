import {expect} from 'chai';

import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';
import {assertValid} from '../../../utils/test/validateHtml';
import {fileName, branchName} from './index';

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let markup = await getRawFile(hook, branchName, fileName);
	let [error] = await assertValid(markup, 1);
	expect(error.message).to.equal('Element “head” is missing a required instance of child element “title”.');
};

export default test;
