import React from 'react';
import {Link} from 'react-router';

import {Html} from '../../../utils/components/Html';
import {Carousel, Pane} from '../../../utils/components/Carousel';
import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import {Continue} from '../../../utils/components/Continue';
import {Key} from '../../../utils/components/Keyboard';

function instruction(fileContents) {
	return (
		<div>
			<p>Awesome! Now that your environment is all set up, let's write some HTML.</p>

			<p>
				HTML is just a way of formatting text so that a web browser 
				can know how to display it to people.
			</p>

			<p>To tell a browser to render a file as HTML, just give it a <strong>.html</strong> extension.</p>

			<p>
				For example, if you write the following HTML 
				into a file with a <strong>.html</strong> extension:
			</p>

			<Html copy={true}>{fileContents}</Html>

			<p>Your web browser will display it like this:</p>

			<FakePage>
				<div>
				    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
				</div>
				<p>This is a new paragraph.</p>	
			</FakePage>
		</div>
	);
}

export const Mac = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const fileName = step.get('fileName');
		const fileContents = step.get('fileContents');
		const branchName = step.get('branchName');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create my first HTML page" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		const create = (
			<div>
				<p>
					Let's create your first HTML page right now! It'll be a simple copy-paste job. 
					Type the following commands into your terminal. 
					It will create a new file with a .html extension and open it up in Sublime:
				</p>

				<Bash noSelect={true}>cd ~/{repoName} && touch {fileName} && subl {fileName}</Bash>

				<p>
					<strong>
						<CopyButtonContainer text={fileContents} /> and paste the HTML on 
						{' '}<Link to="/step/empty-html-page">the previous page</Link>
					</strong>
					{' '}into your file. Press <Key>Command</Key> <Key>S</Key> to save. 
					Then, to look at your handiwork in a browser, type:
				</p>

				<Bash noSelect={true}>open {fileName}</Bash>

				<p>
					Check that out. You just created your first webpage! Nicely done. 
					To move on to the next step (and write some HTML from scratch), just send your code back to us 
					by copy-pasting the following into the terminal:
				</p>

				<Bash copy={true}>{command}</Bash>

				{this.props.statusLink}
			</div>
		);

		return (
			<Carousel>
				<Pane name="">
					{instruction(fileContents)}
					<Continue>
						<Link to="/step/empty-html-page/create-your-first-webpage">
							Click Here to Put It Into Action ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="create-your-first-webpage">
					{create}
				</Pane>
			</Carousel>
		);
	}
});

export const Win = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const fileContents = step.get('fileContents');
		const fileName = step.get('fileName');
		const branchName = step.get('branchName');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create my first HTML page" && git push -u origin ${branchName}`; // eslint-disable-line max-len
	
		return (
			<Carousel>
				<Pane name="">
					{instruction(fileContents)}
					<Continue>
						<Link to="/step/empty-html-page/open-folder-in-sublime">
							Click Here to Put It Into Action ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="open-folder-in-sublime">
					<p>
						Let's create your first HTML page right now! It'll be a simple copy-paste job. 
					</p>
					<p>
						First, <strong>open your code folder in Sublime</strong> by selecting File > Open Folder, 
						then selecting the folder. The folder will be called <code>C:\Users\&lt;your user name&gt;\{repoName}</code>.
					</p>

					<Continue>
						<Link to="/step/empty-html-page/create-an-html-file">
							Click Here to Create Your HTML File ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="create-an-html-file">
					<p>
						Once you have your folder open, create a new file (<Key>Ctrl</Key> <Key>N</Key>), then 					
						<strong>
							<CopyButtonContainer text={fileContents} /> and paste the HTML on 
							{' '}<Link to="/step/empty-html-page">the previous page</Link>
						</strong>
						{' '}into your file. You can paste into Sublime Text with <Key>Ctrl</Key> <Key>V</Key>.
					</p>

					<p>
						Save your file (<Key>Ctrl</Key> <Key>S</Key>). To see your handiwork in the browser, 
						open up your File Explorer (<Key><i className="fa fa-windows" /></Key> <Key>E</Key>), then navigate to 
						{' '}{fileName} and double-click it.
					</p>

					<Continue>
						<Link to="/step/empty-html-page/submit-your-code">
							Click Here to Submit Your Code ->
						</Link>
					</Continue>
				</Pane>

				<Pane name="submit-your-code">
					<p>
						Check that out. You just created your first webpage! Nicely done. 
						To move on to the next step (and write some HTML from scratch), just 
						<CopyButtonContainer text={`${command}\n`} /> and paste the following into your command prompt:
					</p>

					<Bash copy={true}>{command}</Bash>

					<p>
						Remember: You can open your command prompt by typing <Key><i className="fa fa-windows"/></Key> <Key>R</Key>, 
						then "CMD". You can paste into your command prompt by right-clicking.
					</p>

					{this.props.statusLink}
				</Pane>
			</Carousel>
		);
	}
});
