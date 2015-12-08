import React from 'react';
import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import {Html} from '../../../utils/components/Html';
import {NoSelect} from '../../../utils/components/NoSelect';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';

export const IMG_URL = 'http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/92893070.jpg';  // eslint-disable-line max-len

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');

	return (
		<div>
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
			<p>As always, before we start coding, we'll checkout a new branch.</p>
			<Bash>git checkout -b {branchName}</Bash>
			<p>
				The <code>img</code> tag allows you to display images to your webpage's visitors. 
				Let's put the <code>img</code> tag below the fact paragraph:
			</p>

			<NoSelect><Html>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
		<img></img>
	</body>
</html>`}</Html></NoSelect>

			<p>
				That's not going to display an image quite yet, though. 
				We need to give our <code>img</code> tag a <code>src</code> attribute 
				so the browser knows which image to show.
			</p>
			<p>
				An <strong>attribute</strong> is an additional piece of information that you provide to a tag. 
				Here's what the general pattern looks like:
			</p>
			<Html>{`<tagName attribute="attribute value">content</tagName>`}</Html>
			<p>
				We're going to point our penguin picture at <a href={IMG_URL}>{IMG_URL}</a>, 
				which is a super cute picture of a papa penguin incubating an egg.
			</p>
			<p>Add the <code>src</code> attribute to your <code>img</code> tag so your page looks like this:</p>
			<NoSelect><Html>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html></NoSelect>
			<p>Now, open up your page in your browser to see your cute new image!</p>
			<Bash>open {FILENAME}</Bash>
			<p>Your page should look like this now:</p>
			<FakePage>
				<h1>{HEADER}</h1>
				<p>
					{PARAGRAPH}
				</p>
				<img src={IMG_URL}></img>
			</FakePage>
			<p>As always, to move on to the next step, just push your code to the remote repository.</p>
			<Bash>git add . && git commit -m "Add a picture of a papa penguin" && git push -u origin {branchName}</Bash>
		</div>
	);
},
});

export default Content;
