import React from 'react';
import {Bash} from '../../../utils/components/Bash';
import {Paths} from '../../../api/paths';

const Content = React.createClass({
	render() {
		const {step, token, SERVER_DOMAIN} = this.props;

		const branchName = step.get('branchName');

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

				<Bash>curl {SERVER_DOMAIN}{Paths.SETUP[1](token)} | sh</Bash>

				<p>
					There's not a lot happening in there for right now, 
					but we're going to make some stuff happen right away. Create a new branch to do your coding in. 
					We'll explain later what this step is all about.
				</p>

				<Bash>git checkout -b {branchName}</Bash>

				<p>Let's create a test file to make sure that you're set up correctly:</p>

				<Bash>touch test-file.txt</Bash>

				<p>
					Then, go into Sublime Text and click on "test-file.txt" in the left hand side. 
					This will open up the file for editing in the main window. 
					Type "This is just a test" in the file and type Command+S to save.
				</p>

				<p>Last but not least, send the code to our shared repository by typing</p>

				<Bash>git add . && git commit -m "Create my first text file" && git push -u origin {branchName}</Bash>
			</div>
		);
	},
});

export default Content;
