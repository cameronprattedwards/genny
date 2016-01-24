import {fromJS} from 'immutable';
import {combineReducers} from 'redux';
import {
	STEP_COMMIT,
	STEP_SUCCESS,
	STEP_FAILURE,
	SET_CHILD_WINDOW,
	REQUEST_USER_STATE,
	RECEIVE_USER_STATE,
	MARK_COPIED,
	STEP_VISIT,
	SET_OS,
	TOGGLE_TROUBLESHOOTING,
} from './actionCreators';
import {SUCCESS, FAILURE, COMMIT} from '../domain/constants';

export function rootReducerFactory(initialState) {
	const immutableInitialState = {
		db: fromJS(initialState.db),
		ui: fromJS(initialState.ui || {}),
		user: fromJS(initialState.user || {}),
		env: fromJS(initialState.env || {}),
	};

	function dbReducer(state = immutableInitialState.db, event) {
		switch (event.type) {
			case STEP_COMMIT:
				return state.setIn(['steps', event.stepId.toString(), 'status'], COMMIT);
			case STEP_SUCCESS:
				return state.setIn(['steps', event.stepId.toString(), 'status'], SUCCESS);
			case STEP_FAILURE:
				let path = ['steps', event.stepId];
				let step = state.getIn(path);
				step = step.set('status', FAILURE);
				step = step.set('error', event.error);
				return state.setIn(path, step);
			case RECEIVE_USER_STATE:
				return state.merge(event.state.get('db'));
			default:
				return state;
		}
	}

	function uiReducer(state = immutableInitialState.ui, event) {
		switch (event.type) {
			case SET_CHILD_WINDOW:
				return state.set('childWindow', event.childWindow);
			case REQUEST_USER_STATE:
				return state.set('loading', true);
			case RECEIVE_USER_STATE:
				return state.set('loading', false);
			case MARK_COPIED:
				return state.set('copiedText', event.text);
			case SET_OS:
				return state.set('os', event.os);
			case TOGGLE_TROUBLESHOOTING:
				if (event.isOpen) {
					return state.set('troubleshootingKey', event.key);
				} else {
					return state.remove('troubleshootingKey');
				}
			default:
				return state;
		}
	}

	function userReducer(state = immutableInitialState.user, event) {
		switch (event.type) {
			case STEP_VISIT:
				let {step} = event;
				return state.set('currentStep', step);
			case RECEIVE_USER_STATE:
				return state.merge(event.state.get('user'));
			default:
				return state;
		}
	}

	function envReducer(state = immutableInitialState.env) {
		return state;
	}

	return combineReducers({
		ui: uiReducer,
		db: dbReducer,
		user: userReducer,
		env: envReducer,
	});
}
