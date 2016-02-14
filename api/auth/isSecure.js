import {STATE_KEY} from './constants';

export function isSecure(request) {
	const {code} = request.query;
	const storedState = request.cookies[STATE_KEY];
	const receivedState = request.query[STATE_KEY];
	return storedState === receivedState;
}
