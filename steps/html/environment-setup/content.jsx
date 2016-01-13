import React from 'react';
import {Link} from 'react-router';

import {Bash} from '../../../utils/components/Bash';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import {Paths, BASE_PATH} from '../../../api/paths';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';

export const Content = React.createClass({
	render() {
		return (
			<div>
				<p>Congratulations on embarking on the journey of learning HTML! You're going to love it.</p>

				<p>
					We're going to start writing some HTML in the next step, but first we're going to need 
					to set up your computer so you can work like a real coder. 
					This should take just a couple of minutes.
				</p>

				{this.props.middle}
			</div>
		);
	},
});

export const Win = React.createClass({
	render() {
		let {login, repoName, step, email} = this.props;
		let branchName = step.get('branchName');

		let gitUrl = 'https://github.com/git-for-windows/git/releases/download/v2.7.0.windows.1/Git-2.7.0-32-bit.exe';
		let sublimeUrl = 'http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%20Build%203083%20Setup.exe';
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

		let clone = cloneCommands.join(' && ');

		const middle = (
			<Carousel>
				<Pane name="">
					<h4>Install Git</h4>
					<p>Just <strong>click <a href={gitUrl}>here</a></strong> to download Git.</p>
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
						{' '}<Link to="/step/environment-setup/install-sublime-text">here</Link>.
					</Continue>
				</Pane>
				<Pane name="install-sublime-text">
					<h4>Install Sublime Text</h4>
					<p>
						Just <strong>click <a href={sublimeUrl}>here</a></strong> to download Sublime Text.
					</p>
					<p>
						Sublime Text is an awesome text editor that you'll use to write the HTML in this tutorial.
					</p>
					<p>
						<strong>Accept all the default options</strong> during the installation.
					</p>
					<Continue>
						When Sublime is done installing, click 
						{' '}<Link to="/step/environment-setup/clone-your-repo">here</Link>.
					</Continue>
				</Pane>
				<Pane name="clone-your-repo">
					<h4>Clone Your Repository</h4>
					<p>
						Now we'll set up a special folder on your computer where you'll store your code.
					</p>

					<p>
						First, <strong>open your command prompt</strong> by typing 
						{' '}<i className="fa fa-windows"></i> + r, then the letters 
						{' '}<code>cmd</code>, then <code>enter</code>.
					</p>

					<p>
						Next is a simple copy-and-paste job: Just 
						<strong> copy and paste the following code into your command prompt.</strong>
						{' '}(To paste, just right-click anywhere in the command prompt.)
					</p>

					<Bash copy={true}>{clone}</Bash>

					<p>You'll need to enter the username and password you created for GitHub.</p>
	
					{this.props.statusLink}
				</Pane>
			</Carousel>
		);

		return <Content middle={middle} {...this.props} />;
	},
});

export const Mac = React.createClass({
	render() {
		const shellCommand = getShellCommand(this.props);
		const execShell = `${shellCommand}\n`;
		const inlineButton = <CopyButtonContainer text={execShell} />;

		const middle = (
			<div>
				<h4>Open up your terminal</h4>

				<p>
					You can open your terminal by pressing Command+Spacebar and typing in 
					"Terminal", then pressing enter. The terminal is a program that allows you to type in 
					commands to your computer. It's pretty handy.
				</p>

				<h4>Copy-paste the script</h4>

				<p>
					Next, we'll run one script to install a text editor called Sublime Text and create a special 
					folder where you'll store your code. Just {inlineButton} and paste (Command + V) the following 
					into your terminal.
				</p>

				<Bash copy={true}>{shellCommand}</Bash>

				<p>You'll need to enter the username and password you created for GitHub.</p>

				<p>
					When you're done, your code directory should be open in Sublime Text, 
					and you'll be ready to start writing some HTML!
				</p>
				{this.props.statusLink}
			</div>
		);

		return <Content middle={middle} {...this.props} />;
	},
});

function getShellCommand({SERVER_DOMAIN, token}) {
	return `curl ${SERVER_DOMAIN}${BASE_PATH}${Paths.SETUP[1](token)} | sh`;
}

export default Content;
