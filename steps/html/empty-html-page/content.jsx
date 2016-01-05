import React from 'react';

import {Html} from '../../../utils/components/Html';
import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';

const Content = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const branchName = step.get('branchName');
		const fileName = step.get('fileName');
		const fileContents = step.get('fileContents');

		return (
			<div>
				<p>Awesome! Now that your environment is all set up, let's write some HTML.</p>

				<p>HTML is just a way of formatting text so that a web browser can know how to display it to people.</p>

				<p>For example, if you write the following HTML:</p>

				<Html>{fileContents}</Html>

				<p>Your web browser will display it like this:</p>

				<FakePage>
					<div>
					    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
					</div>
					<p>This is a new paragraph.</p>	
				</FakePage>

				<p>
					In fact, let's create your first HTML page right now! It'll be a simple copy-paste job. 
					Create a new file with a .html extension and open it up in Sublime:
				</p>

				<Bash>cd ~/{repoName} && touch {fileName} && subl {fileName}</Bash>

				<p>
					<strong>Copy and paste the code above</strong> into your file. Press Command+S to save.
					Then, to look at your handiwork in a browser, type:
				</p>

				<Bash>open {fileName}</Bash>

				<p>
					Check that out. You just created your first webpage! Nicely done. 
					To move on to the next step (and write some HTML from scratch), just send your code back to us 
					by copy-pasting the following into the terminal:
				</p>

				<Bash>git checkout -b {branchName} && git add . && git commit -m "Create my first HTML page" && git push -u origin {branchName}</Bash>
			</div>
		);
	},
});

export default Content;
