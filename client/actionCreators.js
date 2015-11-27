import {fromJS} from 'immutable';
import 'isomorphic-fetch';

export function setChildWindow(childWindow) {
	return {
		type: 'SET_CHILD_WINDOW',
		childWindow,
	};
}

function requestUserState() {
	return {
		type: 'REQUEST_USER_STATE',
	};
}

function receiveUserState(state) {
	return {
		type: 'RECEIVE_USER_STATE',
		state: fromJS(state),
	};
}

export function fetchUserState(authToken) {
	return dispatch => {
		dispatch(requestUserState());

		return fetch(`/api/state?token=${authToken}`)
			.then(response => response.json())
			.then(json => dispatch(receiveUserState(json)));
	};
}
