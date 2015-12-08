import React from 'react';
import ReactDOM from 'react-dom';
import {routes} from './routes';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import {Provider} from 'react-redux';
import {fetchUserState, stepUpdate} from './actionCreators';
import thunkMiddleware from 'redux-thunk';
import Firebase from 'firebase';
import _ from 'lodash';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router} from 'react-router';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);
const firebaseApp = new Firebase(`https://${env.FIREBASE_NAME}.firebaseio.com/`);

let history = createBrowserHistory();

function getInitialLocation(callback) {
	let unlisten = history.listen(location => {
		callback(location);
	});
	unlisten();
}			

function goToCurrentStep(state) {
	getInitialLocation(location => {
		if (typeof state.get('currentStep') !== 'undefined' && location.pathname === '/') {
			console.log(state.toJS());
			const currentStep = state.get('currentStep');
			let route;
			let step = state.getIn(['db', 'steps', currentStep.toString()]);
			route = `/step/${step.get('branchName')}`;
			history.replaceState(null, route);
		}
	});
}

window.addEventListener('message', (event) => {
	let childWindow = store.getState().get('childWindow');
	if (event.source === childWindow) {
		store.getState().get('childWindow').close();

		store.dispatch(fetchUserState(event.data))
			.then(() => {
				const state = store.getState();
				goToCurrentStep(state);

				firebaseApp.child(state.get('token')).on('child_added', snapshot => {
					console.log(snapshot.val());
					const stepId = snapshot.key();
					_.each(snapshot.val(), (value, event) => {
						store.dispatch(stepUpdate(event, stepId));
					});
				});
			});
	}
});

let app = (<Provider store={store}><Router history={history}>{routes}</Router></Provider>);

ReactDOM.render(app, document.getElementById('app'));
