import fetch from 'isomorphic-fetch';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';
import Modal from 'react-modal';

import stepsMapping from '../../steps/content';
import styles from './Step.css';
import {Paths, BASE_PATH} from '../../api/paths';
import {Breadcrumbs} from './Breadcrumbs';
import {Continue} from '../../utils/components/Continue';
import {Spinner} from '../../utils/components/Spinner';
import {Button} from '../../utils/components/Button';
import {Bash} from '../../utils/components/Bash';
import {CopyButtonContainer} from '../../utils/components/CopyButton';
import assertComponentMapping from '../../utils/assert';

import {SUCCESS, FAILURE, COMMIT} from '../../domain/constants';

function next(currentStepId, step, db, moduleOrder) {
	const currentModuleId = step.get('module');
	const module = db.getIn(['modules', currentModuleId.toString()]);
	const currentStepIndex = module.get('steps').indexOf(currentStepId);
	const finalStepInModule = currentStepIndex === module.get('steps').size - 1;
	let nextStepId;
	if (finalStepInModule) {
		const currentModuleIndex = moduleOrder.indexOf(currentModuleId);
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

const modalStyles = {
	overlay: {
		zIndex: 1,
	},
};

export const Step = React.createClass({
	getInitialState() {
		return {
			modalOpen: true,
		};
	},

	openModal() {
		this.setState({
			modalOpen: true,
		});
	},

	closeModal() {
		this.setState({
			modalOpen: false,
		});
	},

	postVisit(stepName) {
		const {token} = this.props;
		const path = BASE_PATH + Paths.ADD_VISIT[1](stepName, token);
		fetch(path, {method: 'POST'});
	},

	componentDidMount() {
		this.postVisit(this.props.params.stepName);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.stepName !== this.props.stepName) {
			this.postVisit(nextProps.params.stepName);
		}
	},

	render() {
		if (!this.props.token) {
			return null;
		}

		const {
			db,
			params: {stepName},
			step,
			StepContent,
		} = this.props;

		const moduleOrder = db.get('moduleOrder');

		let statusLink = getStatusLink(step, stepName, db, moduleOrder, this.state.modalOpen);

		let steps = db.getIn(['modules', 'html', 'steps']).map(step => db.getIn(['steps', step]));

		return (
			<DocumentTitle title={`HTML Tutorial - ${step.get('name')}`}>
				<div className={styles.step}>
					<h2 className={styles.stepName}>{step.get('name')}!</h2>
					<div className={styles.stepWrapper}>
						<StepContent {...this.props} stepName={stepName} step={step} statusLink={statusLink} />
					</div>
					<Breadcrumbs steps={steps} active={stepName} />
				</div>
			</DocumentTitle>
		);
	},
});

function getStatusLink(step, stepName, db, moduleOrder, modalOpen) {
	switch (step.get('status')) {
		case SUCCESS:
			let nextUrl = next(stepName, step, db, moduleOrder);
			return (
				<Continue>
					You did it!{' '}
					<Link className={styles.link} href={nextUrl} to={nextUrl}>
						Move on to the next step.
					</Link>
				</Continue>
			);
		case FAILURE:
			let componentName = step.getIn(['error', 'component']);
			let Component;
			if (componentName) {
				Component = assertComponentMapping[componentName];
			} else {
				Component = assertComponentMapping.AssertComponent;
			}
			let error = step.get('error');
			if (error.toJS) {
				error = error.toJS();
			}
			let command = [
				'git add .',
				`git commit -m "Fix my code"`,
				`git push origin ${step.get('branchName')}`,
			].join(' && ');

			return (
				<div>
					<p>
						Something went wrong. 
						<Button onClick={() => this.openModal()}>Click here</Button> for more info.
					</p>
					<Modal isOpen={modalOpen} onRequestClose={() => this.closeModal()} style={modalStyles}>
						<div>
							<h3 className={styles.failureHeader}>Oops!</h3>
							<h4 className={styles.failureHeader}>Looks like something went wrong.</h4>
							<Component {...error} />
							<p>
								When you're done making these changes, 
								just copy and paste the following into your terminal to resubmit.
							</p>
							<div className={styles.bashContainer}>
								<Bash className={styles.bash}>{command}</Bash>
								<CopyButtonContainer text={`${command}\n`} className={styles.copy} />
							</div>
						</div>
					</Modal>
				</div>
			);
		case COMMIT:
			return (
				<div className={styles.loading}>
					<Spinner />{' '}
					We got your code and we're running some tests.
				</div>
			);
	}

	return null;
}

function mapStateToProps(state) {
	let {user, db, env, ui} = state;

	return {
		repoName: user.get('repoName'),
		token: user.get('token'),
		login: user.get('login'),
		email: user.get('email'),
		db,
		moduleOrder: db.get('moduleOrder'),
		SERVER_DOMAIN: env.get('SERVER_DOMAIN'),
		os: ui.get('os'),
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const {params: {stepName}} = ownProps;
	const {db, os} = stateProps;
	
	const step = db.getIn(['steps', stepName]);

	const StepContent = stepsMapping[stepName][os];

	if (!step) {
		let err = new Error(`No step with branch name ${stepName}`);
		err.status = 404;
		throw err;
	}


	return {
		...stateProps,
		...ownProps,
		step,
		StepContent,
	};
}

export const StepContainer = connect(mapStateToProps, null, mergeProps)(Step);
