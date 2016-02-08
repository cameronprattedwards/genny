import {AssertionError} from './AssertionError';

export class EmptyTagError extends AssertionError {
	constructor(message = '', tagName, expectedContent) {
		super(message);
		this.component = 'EmptyTag';
		this.tagName = tagName;
		this.expectedContent = expectedContent;
	}
}
