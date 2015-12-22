import {assertHasFile} from '../../../utils/test/hasFile';

const FILENAME = 'test-file.txt';

const test = async function test(hook) {
	assertHasFile(hook, FILENAME);
};

export default test;
