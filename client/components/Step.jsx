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
		if (!this.props.token) {
			return null;
		}

		const {
			db,
			params: {stepName},
		} = this.props;

		const step = db.getIn(['steps', db.getIn(['directoryNameToStep', stepName]).toString()]);

		const StepContent = stepsMapping[stepName];

		return <div>
			<p>Step {stepName}!</p>
			<StepContent {...this.props} stepName={stepName} step={step} />
		</div>;
	},
});

function mapStateToProps(state) {
	return {
		repoName: state.get('repoName'),
		token: state.get('token'),
		login: state.get('login'),
		db: state.get('db'),
		modules: state.get('modules'),
	};
}

export const StepContainer = connect(mapStateToProps)(Step);
