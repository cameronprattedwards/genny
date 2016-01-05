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

export function stepCommit(stepId) {
	return {
		type: 'STEP_COMMIT',
		stepId,
	};
}

export function stepSuccess(stepId) {
	return {
		type: 'STEP_SUCCESS',
		stepId,
	};
}

export function stepFailure(stepId) {
	return {
		type: 'STEP_FAILURE',
		stepId,
	};
}

export function stepUpdate(type, stepId, value) {
	return {
		type: `STEP_${type.toUpperCase()}`,
		stepId,
		value,
	};
}

export function markCopied(text) {
	return {
		type: 'MARK_COPIED',
		text,
	};
}
