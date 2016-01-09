import React from 'react';
import {Link} from 'react-router';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';

export const HEADER = 'Interesting Penguin Facts';

export const PARAGRAPH = `In some species, it is the male penguin which incubates the eggs
			while females leave to hunt for weeks at a time.
			Because of this, pudgy males - with enough fat storage to survive weeks without eating -
			are most desirable.`;

const Content = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Add a head, body, h1, and p to our penguin page" && git push -u origin ${branchName}`;  // eslint-disable-line max-len

		return (
			<Carousel>
				<Pane name="">
					<p>
						Now that you've created an empty HTML page, let's fill it in a bit. 
						Our HTML page is going to teach people a little bit about penguins.
						Before we start coding more, let's create a new branch.
					</p>

					<p>
						First, add a <code>head</code> tag and 
						a <code>body</code> tag inside your <code>html</code> tags in {FILENAME}. 
						Your HTML document will look like this:
					</p>

					<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body></body>
</html>`}</Html>
					<p>
						You'll notice that every time we put a tag inside another tag, we indent it. 
						That's a good practice to follow, because it makes it easier to read.
					</p>
					<p>
						The <code>head</code> tag is where all of the data about the page lives. 
						We're going to mess around with that a little more later.
					</p>
					<p>
						The <code>body</code> tag is more exciting. 
						This is where you put the stuff you want the user to see. 
						We'll add some content to the <code>body</code> tag on the next page.
					</p>
					<Continue>
						<Link to="/step/body-tag/header-tags">Add Some Body Content -></Link>
					</Continue>
				</Pane>
				<Pane name="header-tags">
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
				</Pane>
				<Pane name="paragraph-tags">
					<h4>Paragraph Tags</h4>
					<p>
						Nicely done. Now, add some paragraph content. 
						<strong> After</strong> the <code>h1</code> tag, 
						<strong> inside</strong> the <code>body</code> tag, 
						add a <code>p</code> tag with the content "{PARAGRAPH}"
					</p>
					<p>Your HTML document will look like this:</p>
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
						<Link to="/step/body-tag/submit-your-html">Submit Your Code -></Link>
					</Continue>
				</Pane>
				<Pane name="submit-your-html">
					<h4>Submit Your Code!</h4>
					<p>First, take a look at your handiwork in a browser!</p>
					<Bash noSelect={true}>open {FILENAME}</Bash>
					<p>It should look like this:</p>
					<FakePage>
						<h1>{HEADER}</h1>
						<p>
							{PARAGRAPH}
						</p>
					</FakePage>
					<p>Cool! To move on to the next step, just push this code up to our shared repository:</p>
					<Bash copy={true}>{command}</Bash>
					{this.props.statusLink}
				</Pane>
			</Carousel>
		);
	},
});

export default Content;
