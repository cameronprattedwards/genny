import {AssertionError} from './AssertionError';

export class MissingTagError extends AssertionError {
	constructor(tagName, expectedContent, expectedAttributes) {
		super(`You are missing a ${tagName} tag`);

		this.tagName = tagName;
		this.expectedContent = expectedContent;
		this.expectedAttributes = expectedAttributes;
		this.component = 'MissingTag';
	}
}
