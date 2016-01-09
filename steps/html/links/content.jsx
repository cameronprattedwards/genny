import React from 'react';
import {Link} from 'react-router';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {Sidebar} from '../../../utils/components/Sidebar';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';
import config from './index';

const GOOGLE_LINK_TEXT = 'Go to Google';
const GOOGLE_URL = 'http://google.com';
export const YOUTUBE_LINK = config.youTubeLink;
export const YOUTUBE_TEXT = config.youTubeText;
const COMMIT_MESSAGE = 'Add a link to hear penguin sounds';

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "${COMMIT_MESSAGE}" && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<Carousel>
			<Pane name="">
				<p>
					Now that we have a webpage with a fun fact and an image, 
					let's add a link to it so that anyone who wants to learn more about penguins 
					can get more information.
				</p>

				<p>
					Links are made with an <code>a</code> tag. <code>a</code> stands for "anchor." 
					It's kind of a weird name - 
					{' '}<a target="_blank" href="https://www.quora.com/Why-are-they-called-anchor-tags">
						here's some more info
					</a>
					{' '}on why they're called that.
				</p>

				<p>
					To specify the URL that you want the link to point to, just provide an <code>href</code> attribute. 
				</p>

				<p>
					An <strong>attribute</strong> is an additional piece of information that you provide to a tag. 
					Here's what the general pattern looks like:
				</p>

				<Html>{`<tagName attribute="attribute value">content</tagName>`}</Html>

				<p>
					For example, if you wanted to link to {GOOGLE_URL}, and you wanted the clickable text to be 
					"{GOOGLE_LINK_TEXT}," your link would look like this:
				</p>

				<Html>{`<a href="${GOOGLE_URL}">${GOOGLE_LINK_TEXT}</a>`}</Html>

				<p>If your link looked like this:</p>

				<Html>
					{`<a href="http://memebase.cheezburger.com/pictureisunrelated">This Picture is Unrelated</a>`}
				</Html>

				<p>
					The browser would render it like this: 
					{' '}<a target="_blank" href="http://memebase.cheezburger.com/pictureisunrelated">
						This Picture is Unrelated
					</a>
				</p>

				<Sidebar>
					<code>href</code> stands for "Hypertext Reference." 
					Hypertext is text that is linked to other text on the web. 
					You can read more about that idea <a target="_blank" href="http://www.w3.org/WhatIs.html">here</a>.
				</Sidebar>

				<Continue>
					<Link to="/step/links/take-action">Add Your Own Links -></Link>
				</Continue>
			</Pane>

			<Pane name="take-action">
				<p>Ready to add a link to your page? Great!</p>

				<p>
					First, put a new paragraph on your page under the paragraph with the fact in it. 
					Inside the new paragraph, add a link to {YOUTUBE_LINK}. 
					It's a demonstration of the sound penguins make. 
					Make the clickable text for the link "{YOUTUBE_TEXT}"
				</p>

				<p>When you're done, {FILENAME} should look like this:</p>

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
		</body>
	</html>`}</Html>

				<p>Cool! Now, open up your webpage in your browser and try clicking on the link:</p>

				<Bash noSelect={true}>open {FILENAME}</Bash>

				<p>When you're done, push your code up to the remote repository to move on to the next step.</p>

				<Bash copy={true}>{command}</Bash>

				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export default Content;
