import React from 'react';
import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {Html} from '../../../utils/components/Html';
import {NoSelect} from '../../../utils/components/NoSelect';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';

export const HEADER = 'Interesting Penguin Facts';

export const PARAGRAPH = `In some species, it is the male penguin which incubates the eggs
			while females leave to hunt for weeks at a time.
			Because of this, pudgy males - with enough fat storage to survive weeks without eating -
			are most desirable.`;

const Content = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');

		return (
			<div>
				<p>
					Now that you've created an empty HTML page, let's fill it in a bit. 
					Our HTML page is going to teach people a little bit about penguins.
					Before we start coding more, let's create a new branch.
				</p>

				<Bash>git checkout -b {branchName}</Bash>

				<p>
					First, add a <code>head</code> tag and a <code>body</code> tag inside your <code>html</code> tags
					in {FILENAME}.
					Your HTML document will look like this:
				</p>

				<NoSelect><Html>{`${DOCTYPE}
<html>
	<head></head>
	<body></body>
</html>`}</Html></NoSelect>
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
					Let's start by adding a header to the page.
					Put an <code>h1</code> tag inside your body tag, with the content "{HEADER}".
					Your HTML document will look like this:
				</p>
				<NoSelect><Html>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
	</body>
</html>`}</Html></NoSelect>
				<p>
					Nicely done. Now, add some paragraph content. 
					<strong> After</strong> the <code>h1</code> tag, <strong>inside</strong> the <code>body</code> tag, 
					add a <code>p</code> tag 
					with the content "{PARAGRAPH}"
				</p>
				<p>Your HTML document will look like this:</p>
				<NoSelect><Html>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
	</body>
</html>`}</Html></NoSelect>
				<p>Alright, let's take a look at your page in a browser!</p>
				<Bash>open {FILENAME}</Bash>
				<p>It should look like this:</p>
				<FakePage>
					<h1>{HEADER}</h1>
					<p>
						{PARAGRAPH}
					</p>
				</FakePage>
				<p>Cool! To move on to the next step, just push this code up to our shared repository:</p>
				<Bash>
					git add . && 
					git commit -m "Add a head, body, h1, and p to our penguin page" && 
					git push -u origin {branchName}
				</Bash>
			</div>
		);
	},
});

export default Content;
