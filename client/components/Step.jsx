import React from 'react';
import {connect} from 'react-redux';
import stepsMapping from '../../steps/content';
import styles from './Step.css';
import {Link} from 'react-router';

function next(currentStepId, step, db, moduleOrder) {
	const currentModuleId = step.get('module');
	const module = db.getIn(['modules', currentModuleId.toString()]);
	const currentStepIndex = module.get('steps').indexOf(currentStepId);
	const finalStepInModule = currentStepIndex === module.get('steps').size - 1;
	let nextStepId;
	if (finalStepInModule) {
		const currentModuleIndex = moduleOrder.indexOf(module.get('id'));
		const isFinalModule = currentModuleIndex === moduleOrder.size - 1;
		if (isFinalModule) {
			return '/the-end';
		}
		const nextModuleId = moduleOrder.get(currentModuleIndex + 1);
		const nextModule = db.get('modules').get(nextModuleId);
		nextStepId = nextModule.getIn(['steps', 0]);
	} else {
		nextStepId = module.getIn(['steps', currentStepIndex + 1]);
	}
	return `/step/${nextStepId}`;
}


export const Step = React.createClass({
	render() {
		if (!this.props.token) {
			return null;
		}

		const {
			db,
			params: {stepName},
			moduleOrder,
		} = this.props;

		const step = db.getIn(['steps', stepName]);

		if (!step) {
			let err = new Error(`No step with branch name ${stepName}`);
			err.status = 404;
			throw err;
		}

		const StepContent = stepsMapping[stepName];

		let statusLink = null;

		if (step.get('commit')) {
			if (step.get('success')) {
				let nextUrl = next(stepName, step, db, moduleOrder);
				statusLink = (
					<div className={styles.success}>
						You did it! 
						{' '}<Link className={styles.link} href={nextUrl} to={nextUrl}>
							Move on to the next step.
						</Link>
					</div>
				);
			} else if (step.get('failure')) {
				statusLink = <div className={styles.failure}>Oops. Looks like something went wrong.</div>;
			} else {
				statusLink = <div className={styles.loading}>We got your code and we're running some tests.</div>;
			}
		}

		return <div className={styles.step}>
			<h2 className={styles.stepName}>{step.get('name')}!</h2>
			<StepContent {...this.props} stepName={stepName} step={step} />
			{statusLink}
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
