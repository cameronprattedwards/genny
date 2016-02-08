import React from 'react';
import {Continue} from '../../../utils/components/Continue';
import {SetupLink, CLONE_REPO} from './metadata';

const SUBLIME_URL = 'http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%20Build%203083%20Setup.exe';

export const InstallSublimeWindows = React.createClass({
	render() {
		return (
			<div>
				<h2>Fifth Setup Step: Install Sublime Text</h2>
				<h3>tl;dr</h3>
				<p>
					Just <strong>click <a href={SUBLIME_URL}>here</a></strong> to download Sublime Text.
				</p>
				<h3>Why?</h3>
				<p>
					Sublime Text is an awesome text editor that you'll use to write the HTML in this tutorial.
				</p>
				<p>
					<strong>Accept all the default options</strong> during the installation.
				</p>
				<Continue>
					When Sublime is done installing, click 
					{' '}<SetupLink to={CLONE_REPO}>here</SetupLink>.
				</Continue>
			</div>
		);
	},
});
