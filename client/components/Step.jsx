import fetch from 'isomorphic-fetch';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import cx from 'classnames';
import DocumentTitle from 'react-document-title';

import stepsMapping from '../../steps/content';
import styles from './Step.css';
import {Paths, BASE_PATH} from '../../api/paths';

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

function getStep(db, stepName) {
	console.log(db, stepName);
	const step = db.getIn(['steps', stepName]);

	if (!step) {
		let err = new Error(`No step with branch name ${stepName}`);
		err.status = 404;
		throw err;
	}

	return step;
}

const Breadcrumb = React.createClass({
	render() {
		const {step, active, isLink} = this.props;
		const success = step.get('success');
		const successClasses = cx(styles.breadcrumbSuccess, 'fa', 'fa-check');
		const classNames = cx({
			[styles.breadcrumbActive]: active,
		});
		let content = step.get('name');

		if (isLink) {
			content = <Link to={`/step/${step.get('branchName')}`} className={styles.breadcrumbLink}>
				{success && <i className={successClasses}></i>}
				{content}
			</Link>;
		}

		return (
			<li className={classNames}>
				{content}
			</li>
		);
	},
});

const Breadcrumbs = React.createClass({
	render() {
		let {steps, active} = this.props;
		let isLink = true;

		return (
			<ul className={styles.breadcrumbs}>
				{steps.map(step => {
					let makeActive = step.get('branchName') === active;
					let el = <Breadcrumb 
						key={step.get('branchName')} 
						step={step} 
						active={makeActive} 
						isLink={isLink} 
					/>;
					return el;
				})}
			</ul>
		);
	},
});

export const Step = React.createClass({
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
		} = this.props;

		const moduleOrder = db.get('moduleOrder');

		const step = getStep(db, stepName);

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
				statusLink = <div className={styles.failure}>
					<p>Oops. Looks like something went wrong.</p>
					<p>{step.get('failure')}</p>
				</div>;
			} else {
				statusLink = <div className={styles.loading}>We got your code and we're running some tests.</div>;
			}
		}

		let steps = db.getIn(['modules', 'html', 'steps']).map(step => db.getIn(['steps', step]));

		return (
			<DocumentTitle title={`HTML Tutorial - ${step.get('name')}`}>
				<div className={styles.step}>
					<h2 className={styles.stepName}>{step.get('name')}!</h2>
					<StepContent {...this.props} stepName={stepName} step={step} />
					{statusLink}
					<Breadcrumbs steps={steps} active={stepName} />
				</div>
			</DocumentTitle>
		);
	},
});

function mapStateToProps(state) {
	return {
		repoName: state.get('repoName'),
		token: state.get('token'),
		login: state.get('login'),
		db: state.get('db'),
		moduleOrder: state.get('moduleOrder'),
		SERVER_DOMAIN: state.get('SERVER_DOMAIN'),
	};
}

export const StepContainer = connect(mapStateToProps)(Step);
