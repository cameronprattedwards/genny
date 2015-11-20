import React from 'react';

export const Home = React.createClass({
	render() {
		return (
			<div>
				<p>Click <a href="http://localhost:5000" onClick={this.openLoginWindow}>here</a> to login.</p>
			</div>
		);
	},

	openLoginWindow(event) {
		event.preventDefault();
		window.open("http://localhost:5000", "", "width=500,height=500");
	}
});
