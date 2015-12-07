import React from 'react';
import Highlight from 'react-highlight';
import {renderToString} from 'react-dom/server';

import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';

const Content = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const branchName = step.get('branchName');

		return (
			<div>
				<p>Awesome! Now that your environment is all set up, let's write some HTML.</p>

				<p>HTML is just a way of formatting text so that a web browser can know how to display it to people.</p>

				<p>For example, if you write the following HTML:</p>

				<Highlight className="html">
				{`<!DOCTYPE html>
<html>
<head>
	<title>My HTML Page</title>
</head>
<body>
	<div>
	    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
	</div>
	<p>This is a new paragraph.</p>	
</body>
</html>`}
				</Highlight>

				<p>Your web browser will display it like this:</p>

				<FakePage>
					<div>
					    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
					</div>
					<p>This is a new paragraph.</p>	
				</FakePage>

				<p>
					In fact, let's create your first HTML page right now! It'll be a simple copy-paste job.
					Create a new branch for your file:
				</p>

				<Bash>cd ~/{repoName} && git checkout -b {branchName}</Bash>

				<p>Then, create a new file with a .html extension and open it up in Sublime:</p>

				<Bash>touch my-first-html.html && subl my-first-html.html</Bash>

				<p>Copy and paste the code above into your file, press Command+S to save, and to take a look at your handiwork in a browser, type:</p>

				<Bash>open my-first-html.html</Bash>

				<p>Check that out. You just created your first webpage! Nicely done. To move on to the next step, just push your code to your remote repository!</p>

				<Bash>git push -u origin {branchName}</Bash>
			</div>
		);
	}
});

export default Content;
