import {fromJS} from 'immutable';

const __INITIAL_STATE__ = fromJS({});

export function reducer(state = __INITIAL_STATE__, event) {
	switch (event.type) {
		case 'SET_CHILD_WINDOW':
			return state.set('childWindow', event.childWindow);
		case 'REQUEST_USER_STATE':
			return state.set('loading', true);
		case 'RECEIVE_USER_STATE':
			return state.set('loading', false).merge(event.state);
		case 'STEP_COMMIT':
			return state.setIn(['db', 'steps', event.stepId.toString(), 'commit'], true);
		case 'STEP_SUCCESS':
			return state.setIn(['db', 'steps', event.stepId.toString(), 'success'], true);
		case 'STEP_FAILURE':
			return state.setIn(['db', 'steps', event.stepId.toString(), 'failure'], true);
		default:
			return state;
	}
}
