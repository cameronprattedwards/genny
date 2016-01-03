import React from 'react';
import {Bash} from '../../../utils/components/Bash';
import {Paths, BASE_PATH} from '../../../api/paths';

const Content = React.createClass({
	render() {
		const {token, SERVER_DOMAIN} = this.props;

		return (
			<div>
				<p>Congratulations on embarking on the journey of learning HTML! You're going to love it.</p>

				<p>
					We're going to start writing some HTML in the next step, but first we're going to need 
					to set up your computer so you can work like a real coder. 
					This should take just a couple of minutes.
				</p>

				<p>
					First, open up your terminal. You can do that by pressing Command+Spacebar and typing in 
					"Terminal", then pressing enter. The terminal is a program that allows you to type in 
					commands to your computer. It's pretty handy.
				</p>

				<p>
					Next, we'll run one script to install a text editor called Sublime Text and create a special 
					folder where you'll store your code. Just copy and paste the following into your terminal and 
					press "enter."
				</p>

				<Bash>curl {SERVER_DOMAIN}{BASE_PATH}{Paths.SETUP[1](token)} | sh</Bash>

				<p>
					That will open up your repository in Sublime Text. When you're done, we'll be ready to start 
					writing some HTML!
				</p>

				<p>We'll wait until you're done running the script. :)</p>
			</div>
		);
	},
});

export default Content;
