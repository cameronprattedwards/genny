import React from 'react';
import {Paths, reversePath} from '../../api/paths';
const loginPath = reversePath(Paths.LOGIN, false);

export const Home = React.createClass({
	render() {
		return (
			<div>
				<p>Click <a href={loginPath} onClick={this.openLoginWindow}>here</a> to login.</p>
			</div>
		);
	},

	openLoginWindow(event) {
		event.preventDefault();
		window.open(loginPath, "", "width=500,height=500");
	}
});
