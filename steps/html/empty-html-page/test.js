import {expect} from 'chai';
import config from './index';
import {assertHasFile} from '../../../utils/test/hasFile';
import {getRawFile} from '../../../utils/github';

const {fileName, branchName, fileContents} = config;

const test = async function test(hook) {
	assertHasFile(hook, fileName);

	let text = await getRawFile(hook, branchName, fileName);
	expect(text.trim()).to.equal(fileContents.trim());
};

export default test;
