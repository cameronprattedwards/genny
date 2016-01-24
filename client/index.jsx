import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Firebase from 'firebase';
import _ from 'lodash';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import {rootReducerFactory} from '../flux/reducers';
import {routes} from './routes';
import {fetchUserState, stepUpdate, setOs} from '../flux/actionCreators';
import {getOs} from '../utils/getOs';

const rootReducer = rootReducerFactory(__INITIAL_STATE__);

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);
const firebaseApp = new Firebase(`https://${env.FIREBASE_NAME}.firebaseio.com/`);

if (store.getState().user.get('token')) {
	listenToFirebase(store.getState());
}

const os = getOs(window.navigator.userAgent);
store.dispatch(setOs(os));

let history = createBrowserHistory();

function getInitialLocation() {
	return new Promise((resolve) => {
		let unlisten = history.listen(location => {
			resolve(location);
		});
		unlisten();
	});
}

function goToCurrentStep(state) {
	getInitialLocation().then(location => {
		if (typeof state.user.get('currentStep') !== 'undefined' && location.pathname === '/') {
			const currentStep = state.user.get('currentStep');
			let step = state.db.getIn(['steps', currentStep.toString()]);
			let route = `/step/${step.get('branchName')}`;
			history.replaceState(null, route);
		}
	});
}

function listenToFirebase(state) {
	firebaseApp.child(state.user.get('token')).on('child_added', snapshot => {
		const stepId = snapshot.key();
		_.each(snapshot.val(), (error, status) => {
			store.dispatch(stepUpdate(status, stepId, error));
		});
		window.scrollTo(0, document.body.offsetHeight);
	});
}

window.addEventListener('message', (event) => {
	let originalState = store.getState();
	let childWindow = originalState.ui.get('childWindow');
	if (event.source === childWindow) {
		childWindow.close();

		store.dispatch(fetchUserState(event.data))
			.then(() => {
				const state = store.getState();
				goToCurrentStep(state);
				listenToFirebase(state);
			});
	}
});

let app = (<Provider store={store}><Router history={history}>{routes}</Router></Provider>);

ReactDOM.render(app, document.getElementById('app'));
