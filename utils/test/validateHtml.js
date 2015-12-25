import fetch from 'isomorphic-fetch';
import {expect} from 'chai';
import AssertionError from 'assertion-error';

export const validateHtml = async function validateHtml(markup) {
	let headers = {
		'Content-type': 'text/html; charset=UTF-8',
	};

	let options = {
		headers,
		method: 'POST',
		body: markup,
	};

	let response = await fetch('https://validator.w3.org/nu/?out=json', options);
	let json = await response.json();
	return json.messages;
};

const validateMessage = `Looks like your markup isn't validating. Are you closing all your tags?`;

export const assertValid = async function assertValid(markup, errorsLength = 0, errorMessage = validateMessage) {
	try {
		let messages = await validateHtml(markup);

		console.log(messages);

		let errors = messages.filter(message => message.type === 'error');

		if (errors.length > errorsLength) {
			let unexpectedErrors = errors.slice(errorsLength, errors.length).map(error => error.message);
			errorMessage += ` Full message: ${unexpectedErrors.join('\n')}`;
			throw new AssertionError(errorMessage);
		}

		return errors;
	} catch (e) {
		console.log('what?');
		console.log(e);
		throw e;
	}
};
