import React from 'react';
import {Link} from 'react-router';

import {HEADER, PARAGRAPH} from '../body-tag/content';
import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {Bash} from '../../../utils/components/Bash';
import {Html} from '../../../utils/components/Html';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {Continue} from '../../../utils/components/Continue';

const TITLE = 'Awesome Penguin Facts';

const Content = React.createClass({
	render() {
		const {step} = this.props;
		const branchName = step.get('branchName');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Give our Penguins page a title" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		return (
			<Carousel>
				<Pane name="">
					<p>
						Right now, if you look up in the tab above the browser window, it just says the filename - 
						<code> {FILENAME}</code>. We can make it better. 
						If you add a <code>title</code> tag inside your <code>head</code> tag, a nice, pretty 
						title will appear in the tabs sitting on top of your browser.
					</p>

					<p>
						<strong>Add a <code>title</code> tag </strong> 
						to your Penguins page between your opening 
						and closing <code>head</code> tags. 
					</p>
					<p>
						<strong>Give your title the content "{TITLE}".</strong>
					</p>
					<p>
						{FILENAME} should now look like this:
					</p>
					<Html noSelect={true}>{`${DOCTYPE}
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
	</html>`}</Html>
					<p>
						Refresh your HTML page in your browser or type <code>open {FILENAME}</code> again. 
						You should be able to see your awesome penguin title in the tab on top of the browser.
					</p>
					<Continue>
						<Link to="/step/head-tag/submit-your-code">
							Click Here to Submit Your Code ->
						</Link>
					</Continue>
				</Pane>
				<Pane name="submit-your-code">
					<p>
						As always, to move on to the next step, just push your new code to the shared respository:
					</p>
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
