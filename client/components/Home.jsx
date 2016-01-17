import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Paths, reversePath} from '../../api/paths';
import {setChildWindow} from '../../flux/actionCreators';
import styles from './Home.css';
import {FIRST_PANE, setupUrl} from './Setup';

import {Spinner} from '../../utils/components/Spinner';
import {Button} from '../../utils/components/Button';

const loginPath = reversePath(Paths.LOGIN, false);

export const Home = React.createClass({
	render() {
		let callToAction = null;

		if (this.props.loading) {
			callToAction = <div className={styles.spinner}><Spinner /></div>;
		} else if (this.props.token) {
			callToAction = (
				<p>
					<Button component={Link} to={`/step/${this.props.currentStep}`}>Click here</Button>
					{' '}to pick up where you left off.
				</p>
			);
		} else {
			callToAction = (
				<p>
					<Button component={Link} to={setupUrl(FIRST_PANE)}>Click here</Button> to get started.
				</p>
			);
		}

		return (
			<div className={styles.home}>
				<h1>School of Haxx is a free HTML tutorial.</h1>
				<p>We'll teach you the basics of HTML, and you'll be building your own webpages in no time. </p>
				<p>
					Plus, we'll do it using tools that real programmers use - like <strong>Sublime Text</strong>, 
					<strong> the terminal</strong> and <strong>git</strong>.
				</p>
				<p>
					It's simple as pie. In a couple minutes you'll be writing webpages like a pro.
				</p>
				{callToAction}
			</div>
		);
	},

	openLoginWindow(event) {
		event.preventDefault();
		if (!this.props.token) {
			const child = window.open(loginPath, '', 'width=500,height=500');
			this.props.setChildWindow(child);
		} else {
			this.props.history.pushState(null, `/step/${this.props.currentStep}`);
		}
	},
});

function mapStateToProps(state) {
	return {
		loading: state.ui.get('loading'),
		token: state.user.get('token'),
		currentStep: state.user.get('currentStep'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setChildWindow: (childWindow) => dispatch(setChildWindow(childWindow)),
	};
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
