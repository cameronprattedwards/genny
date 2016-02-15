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
import {StatusLink} from './StatusLink';

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
			step,
			StepContent,
		} = this.props;

		const moduleOrder = db.get('moduleOrder');

		let statusLink = <StatusLink step={step} stepName={stepName} db={db} moduleOrder={moduleOrder} />;

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
