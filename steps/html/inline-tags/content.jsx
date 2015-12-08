import React from 'react';

import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {NoSelect} from '../../../utils/components/NoSelect';
import {FakePage} from '../../../utils/components/FakePage';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER} from '../body-tag/content';
import {YOUTUBE_LINK, YOUTUBE_TEXT} from '../links/content';
import {IMG_URL} from '../images/content';

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

	return (
		<div>
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
				To give one or more words a special emphasis, use an <strong>em</strong> tag. em tags looks like this:
			</p>

			<Html>{`I'm kind of serious about these words. <em>But I'm super emphatic about these words.</em>`}</Html>

			<p>
				Your browser will render em tags with italics, like this: 
			</p>

			<blockquote>
				I'm kind of serious about these words. <em>But I'm super emphatic about these words.</em>
			</blockquote>

			<p>To indicate text that has been deleted, you can use a <strong>del</strong> tag.</p>

			<Html>{`This text is <del>stupid</del> awesome.`}</Html>

			<p>Your browser will render del tags with the text struck through, like this: </p>

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

			<p>
				Feel free to experiment with all of these different tags. 
				Try creating some new HTML pages and adding some sweet new formatting to them.
			</p>

			<p>
				To move on to the next step, let's just add a little extra formatting to our penguins page. 
				First, checkout a new branch:
			</p>

			<Bash>git checkout -b {branchName}</Bash>

			<p>Then add some strong tags around the word "male", like this:</p>

			<Html>{STRONGIFY}</Html>

			<p>And add some em tags around the words "most desirable":</p>

			<Html>{EMIFY}</Html>

			<p>Now your whole document should look like this:</p>
			<NoSelect><Html>{`${DOCTYPE}
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
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html></NoSelect>

			<p>
				Now, open up {FILENAME} in your browser 
				(if you already have it open, you can just refresh the page):
			</p>

			<Bash>open {FILENAME}</Bash>

			<p>Your browser should render it like this:</p>

			<FakePage>
				<h1>{HEADER}</h1>
				<p>
					{PARAGRAPH_HTML}
				</p>
				<p>
					<a href={YOUTUBE_LINK}>{YOUTUBE_TEXT}</a>
				</p>
				<img src={IMG_URL}></img>
			</FakePage>

			<p>To wrap up, just push your HTML code up to our shared GitHub repository:</p>

			<Bash>git add . && git commit -m "{COMMIT_MESSAGE}" && git push -u origin {branchName}</Bash>
		</div>
	);
},
});

export default Content;
