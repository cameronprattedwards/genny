import {errorSerializer} from '../utils/errorSerializer';
import testMapping from '../steps/tests';
import {SUCCESS, FAILURE} from '../domain/constants';

export const runTest = async function runTest(branchName, hook) {
	let status = SUCCESS;
	let error = false;

	try {
		await testMapping[branchName](hook);
	} catch (e) {
		if (e.isAssertionError) {
			error = errorSerializer(e);
			status = FAILURE;
		} else {
			throw e;
		}
	}

	return [status, error];
};
