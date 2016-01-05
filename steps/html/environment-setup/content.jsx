import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';
import {connect} from 'react-redux';

import {Bash} from '../../../utils/components/Bash';
import {Paths, BASE_PATH} from '../../../api/paths';
import styles from './content.css';
import {markCopied} from '../../../client/actionCreators';

export const Content = React.createClass({
	render() {
		const shellCommand = getShellCommand(this.props);
		const execShell = `${shellCommand}\n`;
		let copyVerb = this.props.copiedText === shellCommand ? 'Copied' : 'Copy';

		const inlineButton = (
			<ReactZeroClipboard text={execShell} onAfterCopy={this.onAfterCopy}>
				<button className={styles.inlineButton}>{copyVerb}</button>
			</ReactZeroClipboard>
		);

		return (
			<div>
				<p>Congratulations on embarking on the journey of learning HTML! You're going to love it.</p>

				<p>
					We're going to start writing some HTML in the next step, but first we're going to need 
					to set up your computer so you can work like a real coder. 
					This should take just a couple of minutes.
				</p>

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

				<div className={styles.bash}>
					<Bash>{shellCommand}</Bash>
					<ReactZeroClipboard text={execShell} onAfterCopy={this.onAfterCopy}>
						<button className={styles.button}>{copyVerb}</button>
					</ReactZeroClipboard>
				</div>

				<p>
					That will open up your repository in Sublime Text. When you're done, we'll be ready to start 
					writing some HTML!
				</p>

				<p>We'll wait until you're done running the script. :)</p>
			</div>
		);
	},

	onAfterCopy() {
		this.props.markCopied(getShellCommand(this.props));
	},
});

function getShellCommand({SERVER_DOMAIN, token}) {
	return `curl ${SERVER_DOMAIN}${BASE_PATH}${Paths.SETUP[1](token)} | sh`;
}

function mapStateToProps(state) {
	return {
		copiedText: state.get('copiedText'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		markCopied: text => dispatch(markCopied(text)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
