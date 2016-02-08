import React from 'react';
import {connect} from 'react-redux';

import {Carousel, Pane} from '../../../utils/components/Carousel';
import styles from './index.css';

import {SUCCESS} from '../../../domain/constants';

import {SignUpForGithub} from './SignUpForGithub';
import {VerifyYourEmail} from './VerifyYourEmail';
import {Authorize} from './Authorize';
import {DownloadSublime} from './DownloadSublime';
import {OpenTerminal} from './OpenTerminal';
import {InstallGit} from './InstallGit';
import {InstallSublimeWindows} from './InstallSublimeWindows';
import {CloneRepo} from './CloneRepo';

import {
	SIGN_UP_FOR_GITHUB,
	VERIFY_YOUR_EMAIL,
	AUTHORIZE_SCHOOL_OF_HAXX,
	OPEN_YOUR_TERMINAL,
	DOWNLOAD_SUBLIME_TEXT,
	INSTALL_GIT,
	CLONE_REPO,
} from './metadata';

export const Setup = React.createClass({
	render() {
		let Mac = (
			<Carousel>
				<Pane name={SIGN_UP_FOR_GITHUB}>
					<SignUpForGithub {...this.props} />
				</Pane>
				<Pane name={VERIFY_YOUR_EMAIL}>
					<VerifyYourEmail {...this.props} />
				</Pane>
				<Pane name={AUTHORIZE_SCHOOL_OF_HAXX}>
					<Authorize {...this.props} />
				</Pane>
				<Pane name={OPEN_YOUR_TERMINAL}>
					<OpenTerminal {...this.props} />
				</Pane>
				<Pane name={DOWNLOAD_SUBLIME_TEXT}>
					<DownloadSublime {...this.props} />
				</Pane>
			</Carousel>
		);

		let Win = (
			<Carousel>
				<Pane name={SIGN_UP_FOR_GITHUB}>
					<SignUpForGithub {...this.props} />
				</Pane>
				<Pane name={VERIFY_YOUR_EMAIL}>
					<VerifyYourEmail {...this.props} />
				</Pane>
				<Pane name={AUTHORIZE_SCHOOL_OF_HAXX}>
					<Authorize {...this.props} />
				</Pane>
				<Pane name={INSTALL_GIT}>
					<InstallGit {...this.props} />
				</Pane>
				<Pane name={DOWNLOAD_SUBLIME_TEXT}>
					<InstallSublimeWindows {...this.props} />
				</Pane>
				<Pane name={CLONE_REPO}>
					<CloneRepo {...this.props} />
				</Pane>
			</Carousel>
		);

		return (
			<div className={styles.setup}>
				{this.props.os === 'Mac' ? Mac : Win}
			</div>
		);
	},
});

function mapStateToProps(state) {
	let step = state.db.getIn(['steps', 'environment-setup']);

	return {
		token: state.user.get('token'),
		SERVER_DOMAIN: state.env.get('SERVER_DOMAIN'),
		loading: state.ui.get('loading'),
		complete: step.get('status') === SUCCESS,
		os: state.ui.get('os'),
		step,
	};
}

export const SetupContainer = connect(mapStateToProps)(Setup);
