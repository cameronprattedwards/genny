import React from 'react';
import {Link} from 'react-router';

import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {Sidebar} from '../../../utils/components/Sidebar';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';
import {Key} from '../../../utils/components/Keyboard';

import config from './index';

export const DOCTYPE = '<!DOCTYPE html>';
export const FILENAME = config.fileName;

const Content = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');

		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create a new, empty HTML file" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		return (
			<Carousel>
				<Pane name=''>
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
						<Link to="/step/html-from-scratch/doctypes-and-html-tags">
							Click Here to Put It Into Action ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="doctypes-and-html-tags">
					<p>
						First, open a new HTML document called "{FILENAME}" 
						in Sublime Text:
					</p>

					<Bash noSelect={true}>subl {FILENAME}</Bash>

					<p>
						Add a DOCTYPE to the top of your document on line 1. 
						Then add opening and closing <code>html</code> tags on line 2. 
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
				</Pane>
				<Pane name="submit-your-code">
					<p>To move on to the next step, send your code to our shared repository.</p>

					<Bash copy={true}>{command}</Bash>

					<p>Then you can move on to the next step, where we'll add some content to our new HTML page.</p>

					{this.props.statusLink}
				</Pane>
			</Carousel>
		);
	},
});

export const Mac = Content;

export const Win = Content;

export default Content;
