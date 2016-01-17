import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import cx from 'classnames';

import {toggleTroubleshooting} from '../../../flux/actionCreators';

import {Html} from '../../../utils/components/Html';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import {Continue} from '../../../utils/components/Continue';
import {Key} from '../../../utils/components/Keyboard';
import {Sidebar} from '../../../utils/components/Sidebar';
import styles from './Troubleshooting.css';

function instruction(fileContents) {
	return (
		<div>
			<p>Awesome! Now that your environment is all set up, let's write some HTML.</p>

			<p>
				HTML is just a way of formatting text so that a web browser 
				can know how to display it to people.
			</p>

			<p>To tell a browser to render a file as HTML, just give it a <strong>.html</strong> extension.</p>

			<p>
				For example, if you write the following HTML 
				into a file with a <strong>.html</strong> extension:
			</p>

			<Html copy={true}>{fileContents}</Html>

			<p>Your web browser will display it like this:</p>

			<FakePage>
				<div>
				    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
				</div>
				<p>This is a new paragraph.</p>	
			</FakePage>
		</div>
	);
}

let Troubleshooting = React.createClass({
	render() {
		let classNames = cx({
			[styles.closed]: !this.props.isOpen,
		});

		return (
			<div>
				<h4 className={styles.help} onClick={() => this.onClick()}>Help! I got an error!</h4>
				<div className={classNames}>
					{this.props.children}
				</div>
			</div>
		);
	},

	onClick() {
		this.props.toggle(this.props.keyName, !this.props.isOpen);
	},
});

let Tip = React.createClass({
	render() {
		return <div className={styles.tip}>{this.props.children}</div>;
	},
});

function mapDispatchToProps(dispatch) {
	return {
		toggle: (key, isOpen) => dispatch(toggleTroubleshooting(key, isOpen)),
	};
}

function mapStateToProps(state) {
	return {
		troubleshootingKey: state.ui.get('troubleshootingKey'),
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...dispatchProps,
		...ownProps,
		isOpen: stateProps.troubleshootingKey === ownProps.keyName,
	};
}

Troubleshooting = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Troubleshooting);

const ErrorMessage = React.createClass({
	render() {
		return (
			<div className={styles.errorMessage}>{this.props.children}</div>
		);
	},
});

function troubleshooting(branchName, shortCommand) {
	return (
		<Troubleshooting keyName={branchName}>
			<ErrorMessage>A branch named '{branchName}' already exists.</ErrorMessage>
			<Tip>
				Don't fret. Just run this instead:
				<Bash copy={true}>{shortCommand}</Bash>
			</Tip>
		</Troubleshooting>
	);
}

export const Mac = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const fileName = step.get('fileName');
		const fileContents = step.get('fileContents');
		const branchName = step.get('branchName');
		const commands = [
			`git checkout -b ${branchName}`,
			'git add .',
			'git commit -m "Create my first HTML page"',
			`git push -u origin ${branchName}`,
		];
		const command = commands.join(' && ');
		const shortCommand = commands.slice(1).join(' && ');

		return (
			<Carousel>
				<Pane name="">
					{instruction(fileContents)}
					<Continue>
						<Link to="/step/empty-html-page/create-your-first-webpage">
							Click Here to Put It Into Action ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="create-your-first-webpage">
					<p>
						Let's create your first HTML page right now! 
						We'll start with creating the file, then copy and paste some HTML 
						to create your first webpage! Easy peasy.
					</p>

					<h3>Create the File</h3>

					<p>
						<strong>Type the following commands into your terminal</strong>. 
						You won't be able to copy and paste the commands - 
						that's so you get some practice with typing in the terminal on your own.
					</p>

					<p>
						This first command just navigates to your repository. 
						(<code>cd</code> stands for "change directories.")
					</p>

					<Bash noSelect={true}>cd ~/{repoName}</Bash>

					<p>This last command opens up a new file called {fileName} in Sublime Text.</p>

					<Bash noSelect={true}>subl {fileName}</Bash>

					<Continue>
						<Link to="/step/empty-html-page/paste-your-first-html">
							Click Here to Add Some HTML ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="paste-your-first-html">
					<h3>Paste Your First HTML</h3>

					<p>Now the easy part. :)</p>

					<p>
						<strong>
							Copy and paste the following HTML 
						</strong>
						{' '}into Sublime Text.
					</p>

					<Html copy={true}>{`<!DOCTYPE html>
<html>
	<head>
		<title>Your First Webpage!</title>
	</head>
	<body>
		<h1>This Is Your First Webpage!</h1>
		<p>
			This your very first webpage ever. Congratulations!
		</p>
		<p>
			You deserve to celebrate. Go eat some ice cream or something.
			Then go back to School of Haxx to learn some more about HTML.
		</p>
	</body>
</html>	`}</Html>
					<p>
 						Press <Key>Command</Key> <Key>S</Key> to save. 
 					</p>

					<p>
						Then, to look at your handiwork in a browser, type this in your terminal and press "enter":
					</p>

					<Bash noSelect={true}>open {fileName}</Bash>

					<p>
						Check that out. You just created your first webpage! Nicely done. 
					</p>
					<p>
						To move on to the next step, just send your code back to us 
						by copy-pasting the following into the terminal:
					</p>

					<Bash copy={true}>{command}</Bash>

					{this.props.statusLink}
					{troubleshooting(branchName, shortCommand)}
				</Pane>
			</Carousel>
		);
	},
});

export const Win = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const fileContents = step.get('fileContents');
		const fileName = step.get('fileName');
		const branchName = step.get('branchName');
		const repoPath = `C:\\Users\\<your user name>\\${repoName}`;
		const commands = [
			`git checkout -b ${branchName}`,
			'git add .',
			'git commit -m "Create my first HTML page"',
			`git push -u origin ${branchName}`,
		];
		const command = commands.join(' && ');
		const shortCommand = commands.slice(1).join(' && ');

		return (
			<Carousel>
				<Pane name="">
					{instruction(fileContents)}
					<Continue>
						<Link to="/step/empty-html-page/create-an-html-file">
							Click Here to Put It Into Action ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="create-an-html-file">
					<p>
						Let's create your first HTML page right now! It'll be a simple copy-paste job. 
					</p>

					<p>
						First, <strong>open your code folder in Sublime</strong> by selecting File > Open Folder, 
						then selecting <code>{repoPath}</code>.
					</p>

					<p>
						Once you have your folder open, create a new file, then 					
						<strong>
							{' '}<CopyButtonContainer text={fileContents} /> and paste the HTML on 
							{' '}<Link to="/step/empty-html-page">the previous page</Link>
						</strong>
						{' '}into your file.
					</p>

					<p>
						Save your file as <code>{`${repoPath}\\${fileName}`}</code>. 
						To see your handiwork in the browser, 
						open up your File Explorer, then navigate to 
						{' '}{fileName} and double-click it.
					</p>

					<Continue>
						<Link to="/step/empty-html-page/submit-your-code">
							Click Here to Submit Your Code ->
						</Link>
					</Continue>

					<Sidebar>
						<ul>
							<li>
								You can create a new file in Sublime Text by pressing <Key>Ctrl</Key> <Key>N</Key>.
							</li>
							<li>You can paste into Sublime Text with <Key>Ctrl</Key> <Key>V</Key>.</li>
							<li>You can save a file in Sublime with <Key>Ctrl</Key> <Key>S</Key>.</li>
							<li>
								You can open File Explorer with{' '}
								<Key><i className="fa fa-windows" /></Key> <Key>E</Key>.
							</li>
						</ul>
					</Sidebar>
				</Pane>

				<Pane name="submit-your-code">
					<p>
						Check that out. You just created your first webpage! Nicely done. 
						To move on to the next step (and write some HTML from scratch), just{' '}
						<CopyButtonContainer text={`${command}\n`} /> and paste the following into your command prompt:
					</p>

					<Bash copy={true}>{command}</Bash>

					<Sidebar>
						<ul>
							<li>
								You can open your command prompt by typing 
								{' '}<Key><i className="fa fa-windows"/></Key> <Key>R</Key>, then "CMD".
							</li>
							<li>You can paste into your command prompt by right-clicking.</li>
						</ul>
					</Sidebar>

					{this.props.statusLink}
					{troubleshooting(branchName, shortCommand)}
				</Pane>
			</Carousel>
		);
	},
});
