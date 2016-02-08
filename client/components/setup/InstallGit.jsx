import React from 'react';
import {DOWNLOAD_SUBLIME_TEXT, SetupLink, titles, INSTALL_GIT} from './metadata';
import {Continue} from '../../../utils/components/Continue';

const GIT_URL = 'https://github.com/git-for-windows/git/releases/download/v2.7.0.windows.1/Git-2.7.0-32-bit.exe';

export const InstallGit = React.createClass({
	render() {
		return (
			<div>
				<h2>Fourth Setup Step: {titles[INSTALL_GIT]}</h2>
				<p>Just <strong>click <a href={GIT_URL}>here</a></strong> to download Git.</p>

				<p>
					Git is a cool tool that programmers use to store and share code with each other. 
					You'll use it to submit and test your code.
				</p>

				<p>
					In the setup, make sure to 
					<strong> select "Use Git from the Windows Command Prompt". </strong>
					Otherwise, just accept all the default options.
				</p>

				<Continue>
					When Git is done installing, click 
					{' '}<SetupLink to={DOWNLOAD_SUBLIME_TEXT}>here</SetupLink>.
				</Continue>
			</div>
		);
	},
});
