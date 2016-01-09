import {expect} from 'chai';
import config from './index';
import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';

const {fileName, branchName, fileContents} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let text = await getRawFile(hook, branchName, fileName);
	let errorMessage = `Your file looks like "${text.trim()}". It should look like "${fileContents.trim()}".`;
	expect(text.trim()).to.equal(fileContents.trim(), errorMessage);
};

export default test;
