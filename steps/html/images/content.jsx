import React from 'react';
import {Link} from 'react-router';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import {YOUTUBE_LINK, YOUTUBE_TEXT} from '../links/content';
import config from './index';

import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';

let env = typeof window !== 'undefined' ? window.env : process.env;

export const IMG_URL = `${env.SERVER_DOMAIN}/public/images/penguin.jpg`;

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "Add a picture of a papa penguin" && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<Carousel>
			<Pane name="">
				<p>
					Your penguin facts page is pretty awesome. 
					It has a nice title, a header and a paragraph, 
					and it tells visitors to your page a super cool and super weird fact about penguins.
				</p>
				<p>
					But beyond the cool penguin fact, it's not very interesting. 
					It would be more interesting if we could show a picture of a penguin, right? 
					Let's add one right now.
				</p>
				<p>
					The <code>img</code> tag allows you to display images to your webpage's visitors. 
				</p>
				<p>
					<strong>Add an <code>img</code> tag</strong> below the paragraph with the link in it:
				</p>

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
		<img></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/images/img-src-attributes">Next: Tell the Browser Which Image to Show -></Link>
				</Continue>
			</Pane>
			<Pane name="img-src-attributes">
				<p>
					Our webpage going to display an image quite yet. 
					We need to give our <code>img</code> tag a <code>src</code> attribute 
					so the browser knows which image to show.
				</p>

				<p>
					We're going to point our penguin picture at <a href={IMG_URL} target="_blank">{IMG_URL}</a>,
					{' '}<CopyButtonContainer text={IMG_URL} />{' '}
					which is a super cute picture of a papa penguin incubating an egg.
				</p>
				<p>
					<strong>Set the <code>src</code> attribute on your <code>img</code> tag </strong> 
					so your page looks like this:
				</p>
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
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/images/submit-your-html">Next: Submit Your Code -></Link>
				</Continue>
			</Pane>
			<Pane name="submit-your-html">
				<p>Now, <strong>open up your page in your browser</strong> to see your cute new image!</p>
				<p>Just refresh the page, if you have it open, or type this into your terminal:</p>
				<Bash noSelect={true}>open {FILENAME}</Bash>
				<p>Your page should look like this now:</p>
				<FakePage>
					<h1>{HEADER}</h1>
					<p>
						{PARAGRAPH}
					</p>
					<img src={IMG_URL}></img>
				</FakePage>
				<Continue>
					<Link to="/step/images/push-your-code">Next: Push Your Code -></Link>
				</Continue>
			</Pane>
			<Pane name="push-your-code">
				<p>As always, to move on to the next step, just push your code to the remote repository.</p>
				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export const Mac = Content;

export const Win = Content;

export default Content;
