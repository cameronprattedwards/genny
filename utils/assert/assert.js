import {AssertionError} from './AssertionError';

export const assert = {
	isEqual(actual, expected) {
		if (expected !== actual) {
			throw new AssertionError(`Expected "${actual}" to equal "${expected}"`);
		}
	},

	isNotEqual(actual, nonexpected, message) {
		if (nonexpected === actual) {
			message = message || `Expected "${actual}" to not equal "${nonexpected}"`;
			throw new AssertionError(message);
		}
	}
};
