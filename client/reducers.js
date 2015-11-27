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
		default:
			return state;
	}
}
