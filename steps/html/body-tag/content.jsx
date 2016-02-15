import React from 'react';
import {Link} from 'react-router';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import config from './index';

export const HEADER = 'Interesting Penguin Facts';

export const PARAGRAPH = config.paragraph;

const Index = React.createClass({
	render() {
		return (
			<div>
				<p>
					Now that you've created an empty HTML page, let's fill it in a bit. 
					Our HTML page is going to teach people a little bit about penguins.
				</p>

				<p>
					First, open up {FILENAME} in Sublime Text. 
					Then, <strong>add a <code>head</code> tag and 
					a <code>body</code> tag</strong> inside your <code>html</code> tags. 
					Your HTML document will look like this:
				</p>

				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body></body>
</html>`}</Html>
				<p>
					Every time we put a tag inside another tag, we indent it. 
					This makes it easier to read.
				</p>
				<p>
					All of the data about our webpage lives in the <code>head</code> tag. 
					We'll add some content to the <code>head</code> tag later.
				</p>
				<p>
					The <code>body</code> tag is more exciting. 
					This is where you put the stuff you want the user to see. 
					We'll add some content to the <code>body</code> tag on the next page.
				</p>
				<Continue>
					<Link to="/step/body-tag/header-tags">Add Some Body Content -></Link>
				</Continue>
			</div>
		);
	},
});

const HeaderTags = React.createClass({
	render() {
		return (
			<div>
				<h4>Header Tags</h4>
				<p>
					Let's start by adding a header to the page.
					Put an <code>h1</code> tag inside your body tag, with the content "{HEADER}".
					Your HTML document will look like this:
				</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/body-tag/paragraph-tags">Add a Paragraph -></Link>
				</Continue>
			</div>
		);
	},
});

const ParagraphTags = React.createClass({
	render() {
		return (
			<div>
				<h4>Paragraph Tags</h4>
				<p>
					Nicely done. Now, add some paragraph content. 
					<strong> After</strong> the <code>h1</code> tag, 
					<strong> inside</strong> the <code>body</code> tag, 
					<strong> add a <code>p</code> tag</strong> with this content:
				</p>
				<blockquote>
					{PARAGRAPH} <CopyButtonContainer text={PARAGRAPH} />
				</blockquote>
				<p>Your HTML document will look something like this:</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/body-tag/view-your-webpage">View Your Webpage -></Link>
				</Continue>
			</div>
		);
	},
});

const ViewMac = React.createClass({
	render() {
		return (
			<div>
				<h4>View Your Webpage!</h4>
				<p>
					Let's take a look at your handiwork in a browser! 
					Just type the following into your terminal:
				</p>
				<Bash noSelect={true}>open {FILENAME}</Bash>
				<p>It should look like this:</p>
				<FakePage>
					<h1>{HEADER}</h1>
					<p>
						{PARAGRAPH}
					</p>
				</FakePage>
				<Continue>
					<Link to="/step/body-tag/submit-your-html">Submit Your Code -></Link>
				</Continue>
			</div>
		);
	},
});

const ViewWin = React.createClass({
	render() {
		return (
			<div>
				<h4>View Your Webpage!</h4>
				<p>Let's take a look at your handiwork in a browser!</p>
				<p>
					Open up your File Explorer, then navigate to 
					{' '}{FILENAME} and double-click it.
				</p>
				<p>It should look like this:</p>
				<FakePage>
					<h1>{HEADER}</h1>
					<p>
						{PARAGRAPH}
					</p>
				</FakePage>
				<Continue>
					<Link to="/step/body-tag/submit-your-html">Submit Your Code -></Link>
				</Continue>
			</div>
		);
	},
});

const Submit = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Add a head, body, h1, and p to our penguin page" && git push -u origin ${branchName}`;  // eslint-disable-line max-len

		return (
			<div>
				<h4>Submit Your Code!</h4>
				<p>Cool! To move on to the next step, just push this code up to our shared repository.</p>
				<p>Copy the following into your {this.props.terminal}.</p>
				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</div>
		);
	},
});

export const Mac = React.createClass({
	render() {
		return (
			<Carousel>
				<Pane name="">
					<Index />
				</Pane>
				<Pane name="header-tags">
					<HeaderTags />
				</Pane>
				<Pane name="paragraph-tags">
					<ParagraphTags />
				</Pane>
				<Pane name="view-your-webpage">
					<ViewMac />
				</Pane>
				<Pane name="submit-your-html">
					<Submit {...this.props} terminal="terminal" />
				</Pane>
			</Carousel>
		);
	},
});

export const Win = React.createClass({
	render() {
		return (
			<Carousel>
				<Pane name="">
					<Index />
				</Pane>
				<Pane name="header-tags">
					<HeaderTags />
				</Pane>
				<Pane name="paragraph-tags">
					<ParagraphTags />
				</Pane>
				<Pane name="view-your-webpage">
					<ViewWin />
				</Pane>
				<Pane name="submit-your-html">
					<Submit {...this.props} terminal="command prompt" />
				</Pane>
			</Carousel>
		);
	},
});

export default Mac;
