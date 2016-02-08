import React from 'react';

export const AssertComponent = React.createClass({
	render() {
		return (
			<div>
				<p>{this.props.message}</p>
			</div>
		);
	},
});
