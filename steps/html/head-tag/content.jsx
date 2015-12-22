import React from 'react';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {Bash} from '../../../utils/components/Bash';
import {NoSelect} from '../../../utils/components/NoSelect';
import {Html} from '../../../utils/components/Html';

const TITLE = 'Awesome Penguin Facts';

const Content = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');

		return (
			<div>
				<p>
					Let's add just one more adjustment to make our HTML page even better. 
					Right now, if you looks up in the tab above the browser window, it just says the filename - 
					<code> {FILENAME}</code>. 
					If you add a <code>title</code> tag inside your <code>head</code> tag, a nice, pretty 
					title will appear in the tabs sitting on top of your browser.
				</p>
				<p>First, checkout a new branch.</p>
				<Bash>git checkout -b {branchName}</Bash>
				<p>
					You might have noticed by now: 
					we checkout a new branch every time we're about to make changes to the code. 
					This helps you to keep your changes separate, and it's a super useful pattern 
					for when you start writing code with other people.
				</p>
				<p>
					Let's add a <code>title</code> tag to our Penguins page. 
					Put the <code>title</code> tag between your two <code>head</code> tags, 
					and give your title some content - "{TITLE}", for instance.
				</p>
				<p>
					{FILENAME} should now look like this:
				</p>
				<NoSelect><Html>{`${DOCTYPE}
<html>
	<head>
		<title>${TITLE}</title>
	</head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
	</body>
</html>`}</Html></NoSelect>
				<p>
					Refresh your HTML page in your browser or type <code>open {FILENAME}</code> again. 
					You should be able to see your awesome penguin title in the tab on top of the browser.
				</p>
				<p>
					As always, to move on to the next step, just push your new code to the shared respository:
				</p>
				<Bash>
					git add . && 
					git commit -m "Give our Penguins page a title" && 
					git push -u origin {branchName}
				</Bash>
			</div>
		);
	},
});

export default Content;
