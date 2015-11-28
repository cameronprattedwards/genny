import React from 'react';
import {connect} from 'react-redux';
import {history} from '../routes';
import stepsMapping from '../../steps/content';

export const Step = React.createClass({
	componentWillMount() {
		if (!this.props.token) {
			history.replaceState(null, '/');
		}
	},

	render() {
		const {
			params: {stepName},
		} = this.props;

		const StepContent = stepsMapping[stepName];

		return <div>
			<p>Step {stepName}!</p>
			<StepContent {...this.props} stepName={stepName} />
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
