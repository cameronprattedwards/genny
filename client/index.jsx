import React from 'react';
import ReactDOM from 'react-dom';
import {routes, history} from './routes';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducers';
import {Provider} from 'react-redux';
import {fetchUserState} from './actionCreators';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

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
					route = '/step/monkey';
					break;
			}
			history.pushState(null, route);
		});
});

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));
