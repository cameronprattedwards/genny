import React from 'react';
import {Bash} from '../../../utils/components/Bash';

const Content = React.createClass({
	render() {
		const {repoName, login, step} = this.props;

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
					Now we're going to set you up with a text editor so you can write code easily. 
					We'll do that with Sublime Text. First, we'll install a package manager called "Brew". 
					Brew will come in handy for installing Sublime Text, and for a lot of other packages later. 
					To install Brew, type the following. (But don't type the "> " at the beginning. 
					That just means this is something you should run in the terminal.)
				</p>

				<Bash>ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</Bash>

				<p>And press enter.</p>

				<p>Then, to install Sublime Text, type:</p>

				<Bash>
					brew install caskroom/cask/brew-cask && 
					brew tap caskroom/versions && 
					brew cask install sublime-text3
				</Bash>

				<p>You might need to type in the administrator password for your computer.</p>

				<p>
					Cool! Next: we've created a repository for you in GitHub. A repository is a bucket 
					where you can keep your code. Repositories also allow you to share code with other people. 
					You're going to copy the repository that we've made, and whenever you're done with a step 
					in the tutorial, you'll send that code back to the main bucket. 
					We'll take a look at your code and let you know how you're doing, and give you pointers 
					about how to make it better.
				</p>

				<p>First, let's go to your "home" directory so we can put the repository there:</p>

				<Bash>cd ~</Bash>

				<p>"cd" stands for "change directories". And ~ is a shortcut for your home directory.</p>

				<p>To copy the repository onto your own computer, type:</p>

				<Bash>git clone https://github.com/{login}/{repoName}.git</Bash>

				<p>
					This will create a directory in your home directory called {repoName}. 
					Next, change directories to go into your repository:
				</p>

				<Bash>cd {repoName}</Bash>

				<p>To open up your repository in Sublime Text, type:</p>

				<Bash>subl .</Bash>

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
