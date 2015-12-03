import React from 'react';
import {connect} from 'react-redux';
import stepsMapping from '../../steps/content';

export const Step = React.createClass({
	render() {
		if (!this.props.token) {
			return null;
		}

		const {
			db,
			params: {stepName},
		} = this.props;

		const step = db.getIn(['steps', db.getIn(['branchNameToStep', stepName]).toString()]);

		if (!step) {
			let err = new Error(`No step with branch name ${stepName}`);
			err.status = 404;
			throw err;
		}

		const StepContent = stepsMapping[stepName];

		return <div>
			<p>Step {step.get('name')}!</p>
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
