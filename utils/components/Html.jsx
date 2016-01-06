import React from 'react';
import {Code} from './Code';

export const Html = React.createClass({
	render() {
		return <Code className="html" {...this.props}>{this.props.children}</Code>;
	},
});
