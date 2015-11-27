import React from 'react';
import {connect} from 'react-redux';
import {history} from '../routes';

export const Step = React.createClass({
	componentWillMount() {
		if (!this.props.token) {
			history.replaceState(null, '/');
		}
	},

	render() {
		const {
			params: {stepName},
			repoName,
			login,
		} = this.props;

		const cloneUrl = `https://github.com/${login}/${repoName}.git`;

		return <div>
			<p>Step {stepName}!</p>
			<p>To get started, run <code>git clone {cloneUrl} && cd {repoName}</code></p>
		</div>;
	},
});

function mapStateToProps(state) {
	return {
		repoName: state.get('repoName'),
		token: state.get('token'),
		login: state.get('login'),
	};
}

export const StepContainer = connect(mapStateToProps)(Step);
