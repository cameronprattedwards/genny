import React from 'react';

export const Step = React.createClass({
	render() {
		console.log('whatever');
		return <p>I am step {this.props.params.stepName}!</p>;
	},
});
