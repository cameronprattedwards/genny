import fetch from 'isomorphic-fetch';
import {expect} from 'chai';

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
	let messages = await validateHtml(markup);

	expect(messages.length).to.equal(2);
	let errors = messages.filter(message => message.type === 'error');
	expect(errors.length).to.equal(errorsLength, errorMessage);
	return errors;
};
