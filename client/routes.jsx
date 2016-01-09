import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {HomeContainer} from './components/Home';
import {StepContainer} from './components/Step';
import {End} from './components/End';
import {App} from './components/App';

export const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomeContainer} />
		<Route path="/step/:stepName(/:pane)" component={StepContainer} />
		<Route path="/the-end" component={End} />
	</Route>
);
