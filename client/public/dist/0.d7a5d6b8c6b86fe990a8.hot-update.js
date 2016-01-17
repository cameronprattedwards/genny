exports.id = 0;
exports.modules = {

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TOGGLE_TROUBLESHOOTING = exports.SET_OS = exports.MARK_COPIED = exports.RECEIVE_USER_STATE = exports.REQUEST_USER_STATE = exports.SET_CHILD_WINDOW = exports.STEP_VISIT = exports.STEP_FAILURE = exports.STEP_SUCCESS = exports.STEP_COMMIT = undefined;
	exports.setChildWindow = setChildWindow;
	exports.fetchUserState = fetchUserState;
	exports.stepCommit = stepCommit;
	exports.stepSuccess = stepSuccess;
	exports.stepFailure = stepFailure;
	exports.stepUpdate = stepUpdate;
	exports.markCopied = markCopied;
	exports.setOs = setOs;
	exports.toggleTroubleshooting = toggleTroubleshooting;

	var _immutable = __webpack_require__(7);

	__webpack_require__(8);

	var STEP_COMMIT = exports.STEP_COMMIT = 'STEP_COMMIT';
	var STEP_SUCCESS = exports.STEP_SUCCESS = 'STEP_SUCCESS';
	var STEP_FAILURE = exports.STEP_FAILURE = 'STEP_FAILURE';
	var STEP_VISIT = exports.STEP_VISIT = 'STEP_VISIT';
	var SET_CHILD_WINDOW = exports.SET_CHILD_WINDOW = 'SET_CHILD_WINDOW';
	var REQUEST_USER_STATE = exports.REQUEST_USER_STATE = 'REQUEST_USER_STATE';
	var RECEIVE_USER_STATE = exports.RECEIVE_USER_STATE = 'RECEIVE_USER_STATE';
	var MARK_COPIED = exports.MARK_COPIED = 'MARK_COPIED';
	var SET_OS = exports.SET_OS = 'SET_OS';
	var TOGGLE_TROUBLESHOOTING = exports.TOGGLE_TROUBLESHOOTING = 'TOGGLE_TROUBLESHOOTING';

	function setChildWindow(childWindow) {
		return {
			type: SET_CHILD_WINDOW,
			childWindow: childWindow
		};
	}

	function requestUserState() {
		return {
			type: REQUEST_USER_STATE
		};
	}

	function receiveUserState(state) {
		return {
			type: RECEIVE_USER_STATE,
			state: (0, _immutable.fromJS)(state)
		};
	}

	function fetchUserState(authToken) {
		return function (dispatch) {
			dispatch(requestUserState());

			return fetch('/api/state?token=' + authToken).then(function (response) {
				return response.json();
			}).then(function (json) {
				return dispatch(receiveUserState(json));
			});
		};
	}

	function stepCommit(stepId) {
		return {
			type: STEP_COMMIT,
			stepId: stepId
		};
	}

	function stepSuccess(stepId) {
		return {
			type: STEP_SUCCESS,
			stepId: stepId
		};
	}

	function stepFailure(stepId) {
		return {
			type: STEP_FAILURE,
			stepId: stepId
		};
	}

	function stepUpdate(type, stepId, value) {
		return {
			type: 'STEP_' + type.toUpperCase(),
			stepId: stepId,
			value: value
		};
	}

	function markCopied(text) {
		return {
			type: MARK_COPIED,
			text: text
		};
	}

	function setOs(os) {
		return {
			type: SET_OS,
			os: os
		};
	}

	function toggleTroubleshooting(key, isOpen) {
		return {
			type: TOGGLE_TROUBLESHOOTING,
			key: key,
			isOpen: isOpen
		};
	}

/***/ }

};