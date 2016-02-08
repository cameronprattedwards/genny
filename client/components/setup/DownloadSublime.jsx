import React from 'react';
import {Link} from 'react-router';

import {titles, DOWNLOAD_SUBLIME_TEXT} from './metadata';
import styles from './DownloadSublime.css';
import {Paths, BASE_PATH} from '../../../api/paths';
import {Bash, Key, Continue} from '../../../utils/components';

export const DownloadSublime = React.createClass({
	render() {
		const next = getNext(this.props);

		return (
			<div>
				<h2>Last Setup Step: {titles[DOWNLOAD_SUBLIME_TEXT]}</h2>
				<h3>tl;dr</h3>
				<p>Copy and paste this into your terminal:</p>

				<Bash copy={true}>{getShellCommand(this.props)}</Bash>

				<p>You can paste by pressing <Key>Command</Key> <Key>V</Key>.</p>

				<p>You might get a popup that looks like this:</p>

				<p className={styles.imgWrapper}><img src="/public/images/xcrun.png" className={styles.img}/></p>

				<p>Just press "Install." Agree to the terms.</p>

				<p>
					You'll probably need to enter your Mac password a couple of times. 
					You'll also need to enter your GitHub username and password twice.
				</p>

				{next}

				<h3>Why?</h3>
				<p>
					Sublime Text is a simple text editor where you'll be writing your HTML. 
				</p>

				<p>
					You'll want to use text editor instead of a word processor (like Microsoft Word) 
					because word processors add a bunch of extra formatting 
					that will actually mess up your code.
				</p>

				<p>Sublime Text is easy to use.</p>

				<p>
					The command will download your repository and open it up in Sublime Text. 
					The repository is a folder on your computer where you'll save all your HTML files. 
					You'll be sending code from the repository on your computer to a repository in GitHub. 
					That will allow us to look at your code and give you pointers if you need them.
				</p>
			</div>
		);
	},
});

function getNext({complete}) {
	if (complete) {
		return (
			<Continue>
				You're done setting up your computer!{' '}
				<Link to="/step/empty-html-page">Click here</Link> to start writing some HTML.
			</Continue>
		);
	}

	return null;
}


function getShellCommand({SERVER_DOMAIN, token}) {
	return `curl ${SERVER_DOMAIN}${BASE_PATH}${Paths.SETUP[1](token)} | sh`;
}
