import _ from 'lodash';

export class AssertionError extends Error {
	constructor(...args) {
		super(...args);
		this.isAssertionError = true;
	}
}
