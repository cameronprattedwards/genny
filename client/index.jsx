import React from 'react';
import ReactDOM from 'react-dom';
import {routes, history} from './routes';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import {Provider} from 'react-redux';
import {fetchUserState, stepUpdate} from './actionCreators';
import thunkMiddleware from 'redux-thunk';
import Firebase from 'firebase';
import _ from 'lodash';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);
const firebaseApp = new Firebase(`https://${env.FIREBASE_NAME}.firebaseio.com/`);

window.addEventListener('message', (event) => {
	store.getState().get('childWindow').close();

	store.dispatch(fetchUserState(event.data))
		.then(() => {
			const state = store.getState();
			console.log(state.toJS());
			const currentStep = state.get('currentStep');
			let route;
			switch (currentStep) {
				default:
					let step = state.getIn(['db', 'steps', currentStep.toString()]);
					route = `/step/${step.get('directoryName')}`;
					break;
			}
			history.pushState(null, route);

			firebaseApp.child(state.get('token')).on('child_added', snapshot => {
				console.log(snapshot.val());
				const stepId = snapshot.key();
				_.each(snapshot.val(), (value, event) => {
					store.dispatch(stepUpdate(event, stepId));
				});
			});
		});
});


ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));
