import {AssertionError} from './AssertionError';

export class CodeCompareError extends AssertionError {
	constructor(message = '', actual, expected) {
		super(message);
		this.component = 'CodeCompare';
		this.message = message || `Expected ${expected} to equal ${actual}`;
		this.actual = actual;
		this.expected = expected;
	}
}
