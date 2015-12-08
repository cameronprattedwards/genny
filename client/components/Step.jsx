import React from 'react';
import {connect} from 'react-redux';
import stepsMapping from '../../steps/content';
import styles from './Step.css';

export const Step = React.createClass({
	render() {
		if (!this.props.token) {
			return null;
		}

		const {
			db,
			params: {stepName},
		} = this.props;

		const step = db.getIn(['steps', stepName]);

		if (!step) {
			let err = new Error(`No step with branch name ${stepName}`);
			err.status = 404;
			throw err;
		}

		const StepContent = stepsMapping[stepName];

		return <div className={styles.step}>
			<h2 className={styles.stepName}>{step.get('name')}!</h2>
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
		moduleOrder: state.getIn('moduleOrder'),
	};
}

export const StepContainer = connect(mapStateToProps)(Step);
