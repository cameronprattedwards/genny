import React from 'react';
import {Button, Continue} from '../../../utils/components';
import {
	titles,
	SetupLink,
	SIGN_UP_FOR_GITHUB,
	VERIFY_YOUR_EMAIL,
	AUTHORIZE_SCHOOL_OF_HAXX,
	OPEN_YOUR_TERMINAL,
	DOWNLOAD_SUBLIME_TEXT,
} from './metadata';

export const SignUpForGithub = React.createClass({
	render() {
		return (
			<div>
				<h1>Let's get set up</h1>

				<p>
					We're so excited to help you learn some HTML! 
					Before we start building webpages, you'll need to set up a few things. 
					They're easy, and you only need to do them once:
				</p>

				<ol>
					<li>{titles[SIGN_UP_FOR_GITHUB]}</li>
					<li>{titles[VERIFY_YOUR_EMAIL]}</li>
					<li>{titles[AUTHORIZE_SCHOOL_OF_HAXX]}</li>
					<li>{titles[OPEN_YOUR_TERMINAL]}</li>
					<li>{titles[DOWNLOAD_SUBLIME_TEXT]}</li>
				</ol>
				
				<h2>Setup Step One: {titles[SIGN_UP_FOR_GITHUB]}</h2>
				<h3>tl;dr</h3>
				<p>
					<Button href="https://github.com" target="_blank" component="a">
						Sign up for GitHub.
					</Button>
				</p>
				<p>
					Come right back here after creating a username and password. 
					Don't worry about choosing a plan or visiting your dashboard.
				</p>
				<Continue>
					<SetupLink to={VERIFY_YOUR_EMAIL}>I'm Signed Up for GitHub</SetupLink>
				</Continue>
				<h3>Why?</h3>
				<p>School of Haxx is different from other HTML tutorials.</p>

				<p>It's interactive, and it teaches you how to write HTML the way that real coders do.</p>

				<p>
					Real coders often need to share their code with other coders - 
					they do that using <strong>Git</strong>.
				</p>

				<p>
					Git is a tool that sends code back and forth between your computer 
					and a shared <strong>repository</strong> - a bucket full of code, 
					shared by one or more coders.
				</p>

				<p><strong>GitHub</strong> is a <strong>free</strong> place to store Git repositories.</p>

				<p>
					Each time you create a new webpage in the tutorial, 
					you'll send your code to us using Git. 
					That will let us know how you're doing, so we can give you some 
					extra pointers if you need them.
				</p>

				<p>
					You won't have to learn too much about Git to start out. 
					We'll give you some commands to copy and paste. 
					You'll learn about Git more in-depth after you've become a webpage-making whiz.
				</p>
			</div>
		);
	},
});
