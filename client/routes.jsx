import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {HomeContainer} from './components/Home';
import {StepContainer} from './components/Step';
import {End} from './components/End';

const App = React.createClass({
	render() {
		return <div>{this.props.children}</div>;
	}
});

export const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomeContainer} />
		<Route path="/step/:stepName" component={StepContainer} />
		<Route path="/the-end" component={End} />
	</Route>
);
