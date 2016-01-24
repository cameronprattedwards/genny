import {AssertionError} from './AssertionError';
import {CodeCompare} from './CodeCompare';

class CodeCompareError extends AssertionError {
	constructor(message = '', expected, actual) {
		super(message);
		this.component = CodeCompare.displayName;
		message = message || `Expected ${expected} to equal ${actual}`;
		this.message = message;
	}
}
