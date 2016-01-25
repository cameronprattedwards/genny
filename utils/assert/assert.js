import {AssertionError} from './AssertionError';
import {CodeCompareError} from './CodeCompareError';

export const assert = {
	isEqual(actual, expected, message) {
		if (expected !== actual) {
			message = message || `Expected "${actual}" to equal "${expected}"`;
			throw new AssertionError(message);
		}
	},

	isNotEqual(actual, nonexpected, message) {
		if (nonexpected === actual) {
			message = message || `Expected "${actual}" to not equal "${nonexpected}"`;
			throw new AssertionError(message);
		}
	},

	codeIsEqual(actual, expected) {
		if (expected !== actual) {
			throw new CodeCompareError(null, actual, expected);
		}
	},

	isAbove(actual, expected, message) {
		if (actual <= expected) {
			message = message || `Expected ${actual} to be greater than ${expected}`;
			throw new AssertionError(message);
		}
	}
};
