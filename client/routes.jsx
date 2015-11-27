import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import {Router, Route} from 'react-router';

import {HomeContainer} from './components/Home';
import {StepContainer} from './components/Step';

export default (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={HomeContainer} />
		<Route path="/step/:stepName" component={StepContainer} />
	</Router>
);
