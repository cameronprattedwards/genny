import {expect} from 'chai';
import config from './index';
import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';

const {fileName, branchName, firstWebpage} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let text = await getRawFile(hook, branchName, fileName);
	let errorMessage = `Your file looks like "${text.trim()}".

It should look like "${firstWebpage.trim()}".

`;
	expect(text.trim()).to.equal(firstWebpage.trim(), errorMessage);
};

export default test;
