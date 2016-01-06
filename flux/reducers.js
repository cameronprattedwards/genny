import {fromJS} from 'immutable';
import {routeReducer} from 'redux-simple-router';
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
} from './actionCreators';

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
				return state.setIn(['steps', event.stepId.toString(), 'commit'], true);
			case STEP_SUCCESS:
				return state.setIn(['steps', event.stepId.toString(), 'success'], true);
			case STEP_FAILURE:
				return state.setIn(['steps', event.stepId.toString(), 'failure'], event.value);
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
				return state.merge(event.state);
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
		routing: routeReducer,
		user: userReducer,
		env: envReducer,
	});
}
