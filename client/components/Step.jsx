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

		let statusLink = null;

		switch (step.get('status')) {
			case SUCCESS:
				let nextUrl = next(stepName, step, db, moduleOrder);
				statusLink = (
					<Continue>
						You did it!{' '}
						<Link className={styles.link} href={nextUrl} to={nextUrl}>
							Move on to the next step.
						</Link>
					</Continue>
				);
				break;
			case FAILURE:
				statusLink = (
					<div>
						<p>
							Something went wrong. 
							<Button onClick={() => this.openModal()}>Click here</Button> for more info.
						</p>
						<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.closeModal()} style={modalStyles}>
							<div className={styles.failure}>
								<p>Oops. Looks like something went wrong.</p>
								<pre>{step.get('failure')}</pre>
							</div>
						</Modal>
					</div>
				);
				break;
			case COMMIT:
				statusLink = (
					<div className={styles.loading}>
						<Spinner />{' '}
						We got your code and we're running some tests.
					</div>
				);
				break;
		}

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
	console.log('garbage');
	console.log(ownProps.params);
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
