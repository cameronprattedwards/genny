import React from 'react';
import {Bash, Continue, Key} from '../../../utils/components';
import {Link} from 'react-router';

export const CloneRepo = React.createClass({
	render() {
		let cloneCommand = getCloneCommand(this.props);
		let next = getNext(this.props);

		return (
			<div>
				<h2>Last Setup Step: Clone Your Repository</h2>
				<p>
					Now we'll set up a special folder on your computer where you'll store your code.
				</p>

				<p>
					First, <strong>open your command prompt</strong> by typing 
					{' '}<Key><i className="fa fa-windows"></i></Key> <Key>R</Key>, 
					then the letters 
					{' '}<code>cmd</code>, then <code>enter</code>.
				</p>

				<p>
					Next is a simple copy-and-paste job: Just 
					<strong> copy and paste the following code into your command prompt.</strong>
					{' '}(To paste, just right-click anywhere in the command prompt.)
				</p>

				<Bash copy={true}>{cloneCommand}</Bash>

				<p>You'll need to enter the username and password you created for GitHub.</p>

				{next}
			</div>
		);
	},
});

function getCloneCommand({login, repoName, step, email}) {
		let branchName = step.get('branchName');

		let cloneCommands = [
			'cd %HOMEPATH%',
			`git clone https://github.com/${login}/${repoName}.git`,
			`cd ${repoName}`,
			`git config user.name ${login}`,
			`git config user.email ${email}`,
			`git checkout -b ${branchName}`,
			'copy NUL > test-file.txt',
			'git add .',
			'git commit -m "Create my first text file"',
			`git push origin ${branchName}`,
		];

		return cloneCommands.join(' && ');
}

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
