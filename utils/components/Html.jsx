import React from 'react';
import Highlight from 'react-highlight';

export const Html = React.createClass({
	render() {
		return <Highlight className="html">{this.props.children}</Highlight>;
	},
});
