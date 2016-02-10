import React from 'react';
import {Link} from 'react-router';

import {Html, Bash, Sidebar, Carousel, Pane, Continue, Key} from '../../../utils/components';

import config from './index';

export const DOCTYPE = '<!DOCTYPE html>';
export const FILENAME = config.fileName;

const Instruction = React.createClass({
	render() {
		return (
			<div>
				<p>
					Cool! Now that you've copy-pasted your first HTML page, 
					let's try building an HTML page from scratch.
				</p>

				<p>HTML is made up of a bunch of <strong>tags</strong>. A tag looks like this:</p>
				
				<Html>{`<tagName>content</tagName>`}</Html>
				
				<p>Here are a couple of examples:</p>
				
				<Html>{`<h1>My Title</h1>`}</Html>
				
				<p><code>h1</code> tags create <strong>headers</strong>.</p>
				
				<Html>{`<html></html>`}</Html>

				<p><code>html</code> tags mark the beginning and end of an <strong>HTML page</strong>.</p>

				<Html>{`<p>My paragraph content.</p>`}</Html>

				<p><code>p</code> tags create new <strong>paragraphs</strong>.</p>

				<p>At the beginning of any HTML Document, you'll see a DOCTYPE Declaration. It looks like this:</p>

				<Html>{DOCTYPE}</Html>

				<p>
					This DOCTYPE declaration is just a way of telling the browser: 
					"Hey! I'm about to send you an HTML document, 
					so I want you to render what I'm about to send you as HTML."
				</p>

				<Sidebar>
					<code>{DOCTYPE}</code> actually means "This is an HTML<strong>5</strong> document." 
					There are lots of versions of the HTML language. HTML5 is the latest one. 
					There's also HTML 1.1, HTML 2.0, HTML 3.0, and XHTML (also known as HTML 4.01).
					All of those different versions have different, sometimes counterintuitive, doctypes. 
					But we're only going to use the latest and greatest. 
					So for now, just know that the DOCTYPE for HTML5 is <code>{DOCTYPE}</code>
				</Sidebar>

				<Continue>
					<Link to="/step/html-from-scratch/create-an-html-doc">
						Click Here to Put It Into Action ->
					</Link>
				</Continue>
			</div>
		);
	}
});

const Create = React.createClass({
	render() {
		return (
			<div>
				<p>
					First, open a new HTML document called "{FILENAME}" 
					in Sublime Text by typing the following into your terminal:
				</p>

				<Bash noSelect={true}>subl {FILENAME}</Bash>

				<Continue>
					<Link to="/step/html-from-scratch/doctypes">
						Click Here to Add a DOCTYPE ->
					</Link>
				</Continue>
			</div>
		);
	}
});

const CreateWin = React.createClass({
	render() {
		return (
			<div>
				<p>
					First, <strong>create a new file</strong> in Sublime Text by typing <Key>Ctrl</Key> <Key>N</Key>.
				</p>
				<p>
					Then, <strong>save it</strong> as "{FILENAME}" by pressing <Key>Ctrl</Key> <Key>S</Key>.
				</p>

				<Continue>
					<Link to="/step/html-from-scratch/doctypes">
						Click Here to Add a DOCTYPE ->
					</Link>
				</Continue>
			</div>
		);
	}
});

const Doctypes = React.createClass({
	render() {
		return (
			<div>
				<p>
					Now that you have an HTML document open in Sublime Text,{' '}
					<strong>add a DOCTYPE</strong> on line 1 of your document. 
				</p>

				<p>
					Your HTML file should now look like this:
				</p>

				<Html noSelect={true}>{DOCTYPE}</Html>

				<Continue>
					<Link to="/step/html-from-scratch/html-tags">
						Click Here to Add Some HTML Tags ->
					</Link>
				</Continue>
			</div>
		);
	}
});

const HtmlTags = React.createClass({
	render() {
		return (
			<div>
				<p>
					Now, <strong>add opening and closing <code>html</code> tags</strong> on line 2 
					of your HTML file in Sublime Text.
				</p>
				<p>
					Your HTML document should look like this:
				</p>

				<Html noSelect={true}>{`${DOCTYPE}
<html></html>`}</Html>

				<p>
					When you're done, save your HTML page by pressing <Key>Command</Key> <Key>S</Key>.
				</p>

				<Continue>
					<Link to="/step/html-from-scratch/submit-your-code">
						Click Here to Submit Your Code ->
					</Link>
				</Continue>

				<Sidebar>
					<p>
						Sublime Text has a feature called <strong>autocomplete</strong>, which automatically closes 
						your tags for you. If you write an opening tag, like "<code>{'<html>'}</code>", and then 
						later you just write "<code>{'</'}</code>", it will 
						fill in the rest of the "<code>{'</html>'}</code>" for you. 
					</p>
					<p>
						This is one of many little tricks that coders use to save time typing.
					</p>
				</Sidebar>
			</div>
		);
	}
});

const Submit = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');

		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create a new, empty HTML file" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		return (
			<div>
				<p>To move on to the next step, <strong>send your code to our shared repository</strong>.</p>

				<p>Just copy the following into your {this.props.terminal}.</p>

				<Bash copy={true}>{command}</Bash>

				<p>Then you can move on to the next step, where we'll add some content to our new HTML page.</p>

				{this.props.statusLink}
			</div>
		);
	}
});

export const Mac = React.createClass({
	render() {
		return (
			<Carousel>
				<Pane name=''>
					<Instruction />
				</Pane>

				<Pane name="create-an-html-doc">
					<Create />
				</Pane>

				<Pane name="doctypes">
					<Doctypes />
				</Pane>

				<Pane name="html-tags">
					<HtmlTags />
				</Pane>

				<Pane name="submit-your-code">
					<Submit {...this.props} terminal="terminal" />
				</Pane>
			</Carousel>
		);
	},
});

export const Win = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');

		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create a new, empty HTML file" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		return (
			<Carousel>
				<Pane name=''>
					<Instruction />
				</Pane>

				<Pane name="create-an-html-doc">
					<CreateWin />
				</Pane>

				<Pane name="doctypes">
					<Doctypes />
				</Pane>

				<Pane name="html-tags">
					<HtmlTags />
				</Pane>

				<Pane name="submit-your-code">
					<Submit {...this.props} terminal="command prompt" />
				</Pane>
			</Carousel>
		);
	}
});

export default Mac;
