import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Carousel, Pane} from '../../utils/components/Carousel';
import {Continue} from '../../utils/components/Continue';
import {Button} from '../../utils/components/Button';
import {Key} from '../../utils/components/Keyboard';
import {Bash} from '../../utils/components/Bash';
import {Spinner} from '../../utils/components/Spinner';
import styles from './Setup.css';

import {Paths, BASE_PATH} from '../../api/paths';

export const SIGN_UP_FOR_GITHUB = 'sign-up-for-github';
export const FIRST_PANE = SIGN_UP_FOR_GITHUB;
const VERIFY_YOUR_EMAIL = 'verify-your-email';
const AUTHORIZE_SCHOOL_OF_HAXX = 'authorize-school-of-haxx';
const OPEN_YOUR_TERMINAL = 'open-your-terminal';
const DOWNLOAD_SUBLIME_TEXT = 'download-sublime-text';

const titles = {
	[SIGN_UP_FOR_GITHUB]: 'Sign Up for GitHub',
	[VERIFY_YOUR_EMAIL]: 'Verify Your Email',
	[AUTHORIZE_SCHOOL_OF_HAXX]: 'Authorize School of Haxx',
	[OPEN_YOUR_TERMINAL]: 'Open Your Terminal',
	[DOWNLOAD_SUBLIME_TEXT]: 'Download Sublime Text',
};

const SignUpForGithub = React.createClass({
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
					<Link to={setupUrl(VERIFY_YOUR_EMAIL)}>I'm Signed Up for GitHub</Link>
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

const VerifyYourEmail = React.createClass({
	render() {
		return (
			<div>
				<h2>Setup Step Two: {titles[VERIFY_YOUR_EMAIL]}</h2>
				<h3>tl;dr</h3>
				<p>Verify your email address.</p>
				<p>
					Visit the inbox for the email you provided to GitHub. 
					Click on the email titled "[GitHub] Please verify your email address." 
					Then click on "Verify Email Address."
				</p>
				<p>Then come right back here.</p>
				<Continue>
					<Link to={setupUrl(AUTHORIZE_SCHOOL_OF_HAXX)}>My Email is Verified</Link>
				</Continue>
				<h3>Why?</h3>
				<p>To use GitHub (and this app), GitHub needs to make sure that your email address is valid.</p>
			</div>
		);
	},
});

const Authorize = React.createClass({
	render() {
		let callToAction = null;

		if (this.props.token) {
			callToAction = (<Continue>
				<Link to={setupUrl(OPEN_YOUR_TERMINAL)}>I Have Authorized School of Haxx</Link>
			</Continue>);
		} else if (this.props.loading) {
			callToAction = (<div>
				<Spinner /> We're customizing the tutorial for you.
			</div>);
		}

		return (
			<div>
				<h2>Setup Step Three: {titles[AUTHORIZE_SCHOOL_OF_HAXX]}</h2>
				<h3>tl;dr</h3>
				<p>
					<Button onClick={this.authorize}>
						Authorize School of Haxx
					</Button>
					{' '}to access your GitHub account.
				</p>

				{callToAction}

				<h3>Why?</h3>
				<p>
					We're going to be sharing a GitHub repository with you. 
					You just need to tell GitHub that you want to share your code with us. 
					We'll also need your email to help you set up your programming environment.
				</p>

				<p>But we won't send you any spam. We promise.</p>
			</div>
		);
	},
});

const OpenTerminal = React.createClass({
	render() {
		return (
			<div>
				<h2>Setup Step Four: {titles[OPEN_YOUR_TERMINAL]}</h2>
				<h3>tl;dr</h3>
				<p>Open your terminal.</p>

				<p>
					Just press <Key>Command</Key> <Key>Spacebar</Key>, 
					then type "Terminal" and press enter.
				</p>

				<p>Then come on back here.</p>

				<Continue>
					<Link to={setupUrl(DOWNLOAD_SUBLIME_TEXT)}>My terminal is open.</Link>
				</Continue>
				<h3>Why?</h3>
				<p>
					The terminal is a helpful tool that you will use to tell your computer 
					what you want it to do. You do that by typing in "commands." We'll show you how.
				</p>

				<p>
					You'll be using the terminal quite a bit. 
					You'll probably want to maximize the window by clicking the little green button 
					in the upper left hand corner. 
					If you maximize it, you can switch between the terminal and your computer by swiping 
					left or right with three fingers or by pressing <Key>Command</Key> <Key>Tab</Key>.
				</p>
			</div>
		);
	},
});

const DownloadSublime = React.createClass({
	render() {
		let next = null;

		if (this.props.complete) {
			next = (
				<Continue>
					You did it! <Link to="/step/empty-html-page">Click here</Link> to start writing some HTML.
				</Continue>
			);
		}

		return (
			<div>
				<h2>Last Setup Step: {titles[DOWNLOAD_SUBLIME_TEXT]}</h2>
				<h3>tl;dr</h3>
				<p>Copy and paste this into your terminal:</p>

				<Bash copy={true}>{getShellCommand(this.props)}</Bash>

				<p>You can paste by pressing <Key>Command</Key> <Key>V</Key>.</p>

				<p>You might get a popup that looks like this:</p>

				<p className={styles.imgWrapper}><img src="/public/images/xcrun.png" className={styles.img}/></p>

				<p>Just press "Install."</p>

				<p>
					You'll probably need to enter your Mac password a couple of times. 
					You'll also need to enter your GitHub username and password twice.
				</p>

				{next}

				<h3>Why?</h3>
				<p>
					Sublime Text is a simple text editor where you'll be writing your HTML. 
					You'll want to use text editor instead of a word processor (like Microsoft Word) 
					because word processors add a bunch of extra formatting 
					that will actually mess up your code.
				</p>

				<p>Sublime Text is easy to use. You'll see.</p>

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

export const Setup = React.createClass({
	render() {
		return (
			<div className={styles.setup}>
				<Carousel>
					<Pane name={SIGN_UP_FOR_GITHUB}>
						<SignUpForGithub {...this.props} />
					</Pane>
					<Pane name={VERIFY_YOUR_EMAIL}>
						<VerifyYourEmail {...this.props} />
					</Pane>
					<Pane name={AUTHORIZE_SCHOOL_OF_HAXX}>
						<Authorize {...this.props} />
					</Pane>
					<Pane name={OPEN_YOUR_TERMINAL}>
						<OpenTerminal {...this.props} />
					</Pane>
					<Pane name={DOWNLOAD_SUBLIME_TEXT}>
						<DownloadSublime {...this.props} />
					</Pane>
				</Carousel>
			</div>
		);		
	},

	authorize() {

	},
});

export function setupUrl(slug) {
	return `/setup/${slug}`;
}

function mapStateToProps(state) {
	return {
		token: state.user.get('token'),
		SERVER_DOMAIN: state.env.get('SERVER_DOMAIN'),
		loading: state.ui.get('loading'),
		complete: state.db.getIn(['steps', 'environment-setup', 'success']),
	};
}

export const SetupContainer = connect(mapStateToProps)(Setup);

function getShellCommand({SERVER_DOMAIN, token}) {
	return `curl ${SERVER_DOMAIN}${BASE_PATH}${Paths.SETUP[1](token)} | sh`;
}

