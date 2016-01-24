import React from 'react';
import Code from '../components/Code';

export const CodeCompare = React.createClass({
	render() {
		return (
			<div>
				<p>This is what you submitted:</p>
				<Code>{this.props.actual}</Code>
				<p>This is what your code should look like:</p>
				<Code>{this.props.expected}</Code>
			</div>
		);
	}
});
