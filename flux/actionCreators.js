import {fromJS} from 'immutable';
import 'isomorphic-fetch';

export const STEP_COMMIT = 'STEP_COMMIT';
export const STEP_SUCCESS = 'STEP_SUCCESS';
export const STEP_FAILURE = 'STEP_FAILURE';
export const STEP_VISIT = 'STEP_VISIT';
export const SET_CHILD_WINDOW = 'SET_CHILD_WINDOW';
export const REQUEST_USER_STATE = 'REQUEST_USER_STATE';
export const RECEIVE_USER_STATE = 'RECEIVE_USER_STATE';
export const MARK_COPIED = 'MARK_COPIED';
export const SET_OS = 'SET_OS';
export const TOGGLE_TROUBLESHOOTING = 'TOGGLE_TROUBLESHOOTING';

export function setChildWindow(childWindow) {
	return {
		type: SET_CHILD_WINDOW,
		childWindow,
	};
}

function requestUserState() {
	return {
		type: REQUEST_USER_STATE,
	};
}

function receiveUserState(state) {
	return {
		type: RECEIVE_USER_STATE,
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
		type: STEP_COMMIT,
		stepId,
	};
}

export function stepSuccess(stepId) {
	return {
		type: STEP_SUCCESS,
		stepId,
	};
}

export function stepFailure(stepId) {
	return {
		type: STEP_FAILURE,
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
		type: MARK_COPIED,
		text,
	};
}

export function setOs(os) {
	return {
		type: SET_OS,
		os,
	};
}

export function toggleTroubleshooting(key, isOpen) {
	return {
		type: TOGGLE_TROUBLESHOOTING,
		key,
		isOpen,
	};
}
