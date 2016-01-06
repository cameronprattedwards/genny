import React from 'react';

import {Bash} from '../../../utils/components/Bash';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import {Paths, BASE_PATH} from '../../../api/paths';

export const Content = React.createClass({
	render() {
		const shellCommand = getShellCommand(this.props);
		const execShell = `${shellCommand}\n`;

		const inlineButton = <CopyButtonContainer text={execShell} />;

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

				<Bash copy={true}>{shellCommand}</Bash>

				<p>
					That will open up your code directory in Sublime Text. When you're done, we'll be ready to start 
					writing some HTML!
				</p>

				<p>We'll wait until you're done running the script. :)</p>
			</div>
		);
	},
});

function getShellCommand({SERVER_DOMAIN, token}) {
	return `curl ${SERVER_DOMAIN}${BASE_PATH}${Paths.SETUP[1](token)} | sh`;
}

export default Content;
