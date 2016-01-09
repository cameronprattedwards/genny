import React from 'react';
import {Link} from 'react-router';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import config from './index';

import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';

export const IMG_URL = config.imgUrl;

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
					Let's put the <code>img</code> tag below the fact paragraph:
				</p>

				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
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
					We're going to point our penguin picture at <a href={IMG_URL}>{IMG_URL}</a>, 
					which is a super cute picture of a papa penguin incubating an egg.
				</p>
				<p>Add the <code>src</code> attribute to your <code>img</code> tag so your page looks like this:</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/images/submit-your-html">Next: Submit Your Code -></Link>
				</Continue>
			</Pane>
			<Pane name="submit-your-html">
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
				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export default Content;
