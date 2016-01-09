import React from 'react';

export const Carousel = React.createClass({
	contextTypes: {
		params: React.PropTypes.object,
	},

	render() {
		let pane = this.context.params.pane || '';
		return React.Children.toArray(this.props.children).find(child => child.props.name === pane);
	},
});

export const Pane = React.createClass({
	render() {
		return <div>{this.props.children}</div>;
	},
});
