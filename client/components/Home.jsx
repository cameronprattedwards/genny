import React from 'react';
import {Paths, reversePath} from '../../api/paths';
import {setChildWindow} from '../actionCreators';
import {connect} from 'react-redux';

const loginPath = reversePath(Paths.LOGIN, false);

export const Home = React.createClass({
	render() {
		console.log(this.props.loading);
		return (
			<div>
				<p>Click <a href={loginPath} onClick={this.openLoginWindow}>here</a> to login.</p>
				<p>{this.props.loading && 'Loading...'}</p>
			</div>
		);
	},

	openLoginWindow(event) {
		event.preventDefault();
		const child = window.open(loginPath, '', 'width=500,height=500');
		this.props.setChildWindow(child);
	},
});

function mapStateToProps(state) {
	return {
		loading: state.get('loading'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setChildWindow: (childWindow) => dispatch(setChildWindow(childWindow)),
	};
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
