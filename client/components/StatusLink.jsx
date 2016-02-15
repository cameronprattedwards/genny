import React from 'react';
import Modal from 'react-modal';
import {Link} from 'react-router';

import styles from './StatusLink.css';
import {Continue, Spinner, Button, Bash, CopyButtonContainer} from '../../utils/components';
import assertComponentMapping from '../../utils/assert';

import {SUCCESS, FAILURE, COMMIT} from '../../domain/constants';
import {next} from './next';

const modalStyles = {
	overlay: {
		zIndex: 1,
	},
};

const Success = React.createClass({
	render() {
		const {stepName, step, db, moduleOrder} = this.props;
		let nextUrl = next(stepName, step, db, moduleOrder);
		return (
			<Continue>
				You did it!{' '}
				<Link className={styles.link} href={nextUrl} to={nextUrl}>
					Move on to the next step.
				</Link>
			</Continue>
		);
	},
});

const Failure = React.createClass({
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

	render() {
		const {step} = this.props;

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
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.closeModal()} style={modalStyles}>
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
	},
});

const Commit = React.createClass({
	render() {
		return (
			<div className={styles.loading}>
				<Spinner />{' '}
				We got your code and we're running some tests.
			</div>
		);
	},
});

export const StatusLink = React.createClass({
	render() {
		switch (this.props.step.get('status')) {
			case SUCCESS:
				return <Success {...this.props} />;
			case FAILURE:
				return <Failure {...this.props} />;
			case COMMIT:
				return <Commit />;
		}

		return null;
	},
});
