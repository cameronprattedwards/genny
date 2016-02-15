import React from 'react';
import {Link} from 'react-router';

import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER} from '../body-tag/content';
import {YOUTUBE_LINK, YOUTUBE_TEXT} from '../links/content';
import {IMG_URL} from '../images/content';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';

const STRONGIFY = `In some species, it is the <strong>male</strong> penguin which incubates the eggs`;

const STRONGIFY_HTML = <span>In some species, it is the <strong>male</strong> penguin which incubates the eggs</span>;

const EMIFY = `pudgy males — with enough fat storage to survive weeks without eating — are <em>most desirable</em>.`;

const EMIFY_HTML = (<span>
	pudgy males — with enough fat storage to survive weeks without eating — 
	are <em>most desirable</em>.
</span>);

export const PARAGRAPH = `${STRONGIFY}
			while females leave to hunt for weeks at a time.
			Because of this, ${EMIFY}`;

export const PARAGRAPH_HTML = (<span>
	{STRONGIFY_HTML} while females leave to hunt for weeks at a time. Because of this, {EMIFY_HTML}
</span>);

const COMMIT_MESSAGE = 'Add some formatting for extra meaning';

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "${COMMIT_MESSAGE}" && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<Carousel>
			<Pane name=''>
				<p>
					Cool. Now that our page has a link on it, 
					let's try adding some more tags that give extra meaning to our content.
				</p>

				<p>
					There are a few ways to tell the browser that one word is more important than the others. 
					The first way is by using <strong>strong</strong> tags. 
					A strong tag looks like this:
				</p>

				<Html>{`<strong>This is important.</strong>`}</Html>

				<p>
					And your browser will render it with a bold font, like this: 
				</p>

				<blockquote><strong>This is important.</strong></blockquote>

				<p>
					To give one or more words special emphasis, use an <strong>em</strong> tag. 
					em tags looks like this:
				</p>

				<Html>
					{`I'm kind of serious about these words. <em>But I'm super emphatic about these words.</em>`}
				</Html>

				<p>
					Your browser will render em tags with italics, like this: 
				</p>

				<blockquote>
					I'm kind of serious about these words. <em>But I'm super emphatic about these words.</em>
				</blockquote>

				<p>To indicate text that has been deleted, you can use a <strong>del</strong> tag.</p>

				<Html>{`This text is <del>stupid</del> awesome.`}</Html>

				<p>Your browser will render del tags with the text crossed out, like this: </p>

				<blockquote>
					This text is <del>stupid</del> awesome.
				</blockquote>

				<p>To show text that should be highlighted, use a <strong>mark</strong> tag.</p>

				<Html>{`Let me highlight a new product of ours: <mark>The Gerbonkulator!</mark>`}</Html>

				<blockquote>
					Let me highlight a new product of ours: <mark>The Gerbonkulator!</mark>
				</blockquote>

				<p>If you want to use subscripted text, just use a <strong>sub</strong> tag:</p>

				<Html>{`H<sub>2</sub>O`}</Html>

				<blockquote>
					H<sub>2</sub>O
				</blockquote>

				<p>For superscripted text, use a <strong>sup</strong> tag:</p>

				<Html>{`E = MC<sup>2</sup>`}</Html>

				<blockquote>E = MC<sup>2</sup></blockquote>
				<Continue>
					<Link to="/step/inline-tags/strong-tags">Next: Try It Out -></Link>
				</Continue>
			</Pane>
			<Pane name="strong-tags">
				<p>
					To move on to the next step, let's just add a little extra formatting to our penguins page.
				</p>
				<p>
					Open {FILENAME} in Sublime Text. 
					Then, <strong>add strong tags around the word "male"</strong>, like this:
				</p>

				<Html noSelect={true}>{STRONGIFY}</Html>
				<Continue>
					<Link to="/step/inline-tags/em-tags">Next: Add Some Emphasis -></Link>
				</Continue>
			</Pane>
			<Pane name="em-tags">
				<p>Now, <strong>add some em tags</strong> around the words "most desirable":</p>

				<Html noSelect={true}>{EMIFY}</Html>

				<p>Now your whole document should look like this:</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
		<p>
			<a href="${YOUTUBE_LINK}">${YOUTUBE_TEXT}</a>
		</p>
		<img src="${IMG_URL}" />
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/inline-tags/view-your-page">Next: View Your Page -></Link>
				</Continue>
			</Pane>
			<Pane name="view-your-page">
				<p>
					Now, <strong>open up {FILENAME} in your browser</strong>
					{' '}(if you already have it open, you can just refresh the page):
				</p>

				{this.props.open}

				<p>Your browser should render it like this:</p>

				<FakePage>
					<h1>{HEADER}</h1>
					<p>
						{PARAGRAPH_HTML}
					</p>
					<p>
						<a href={YOUTUBE_LINK}>{YOUTUBE_TEXT}</a>
					</p>
					<img src={IMG_URL} />
				</FakePage>
				<Continue>
					<Link to="/step/inline-tags/push-your-code">Next: Push Your Code -></Link>
				</Continue>
			</Pane>
			<Pane name="push-your-code">
				<p>To move on to the next step, just push your HTML code up to our shared GitHub repository.</p>

				<p>Just copy and paste the following into your {this.props.terminal}.</p>

				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export const Mac = React.createClass({
	render() {
		const open = (
			<div>
				<p>You can open {FILENAME} in the browser by typing this:</p>
				<Bash noSelect={true}>open {FILENAME}</Bash>
			</div>
		);

		return <Content {...this.props} open={open} terminal="terminal" />;
	},
});

export const Win = React.createClass({
	render() {
		const open = (
			<div>
				<p>
					You can open {FILENAME} by navigating to it 
					in the File Explorer and double-clicking it.
				</p>
			</div>
		);

		return <Content {...this.props} open={open} terminal="command prompt" />;
	},
});

export default Content;
