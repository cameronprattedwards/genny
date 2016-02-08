import React from 'react';
import {Link} from 'react-router';

export const SIGN_UP_FOR_GITHUB = 'sign-up-for-github';
export const FIRST_PANE = SIGN_UP_FOR_GITHUB;
export const VERIFY_YOUR_EMAIL = 'verify-your-email';
export const AUTHORIZE_SCHOOL_OF_HAXX = 'authorize-school-of-haxx';
export const OPEN_YOUR_TERMINAL = 'open-your-terminal';
export const DOWNLOAD_SUBLIME_TEXT = 'download-sublime-text';
export const CLONE_REPO = 'clone-your-repo';
export const INSTALL_GIT = 'install-git';

export const titles = {
	[SIGN_UP_FOR_GITHUB]: 'Sign Up for GitHub',
	[VERIFY_YOUR_EMAIL]: 'Verify Your Email',
	[AUTHORIZE_SCHOOL_OF_HAXX]: 'Authorize School of Haxx',
	[OPEN_YOUR_TERMINAL]: 'Open Your Terminal',
	[DOWNLOAD_SUBLIME_TEXT]: 'Download Sublime Text',
	[CLONE_REPO]: 'Clone Your Repository',
	[INSTALL_GIT]: 'Install Git',
};

export function setupUrl(slug) {
	return `/setup/${slug}`;
}

export const SetupLink = React.createClass({
	render() {
		return <Link to={setupUrl(this.props.to)}>{this.props.children}</Link>;
	},
});
