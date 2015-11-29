import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import {Router, Route} from 'react-router';

import {HomeContainer} from './components/Home';
import {StepContainer} from './components/Step';
import {End} from './components/End';

export const history = createBrowserHistory();

export const routes = (
	<Router history={history}>
		<Route path="/" component={HomeContainer} />
		<Route path="/step/:stepName" component={StepContainer} />
		<Route path="/the-end" component={End} />
	</Router>
);
