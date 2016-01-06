import React from 'react';
import {connect} from 'react-redux';

import {Html} from '../../../utils/components/Html';
import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';
import {CopyButtonContainer} from '../../../utils/components/CopyButton';
import styles from './content.css';

const Carousel = React.createClass({
	render() {
		return React.Children.toArray(this.props.children).find(child => child.props.name === this.props.pane);
	},
});

function mapStateToProps() {
	return {
		pane: '',
	};
}

const CarouselContainer = connect(mapStateToProps)(Carousel);

const Pane = React.createClass({
	render() {
		return <div>{this.props.children}</div>;
	},
});

const Content = React.createClass({
	render() {
		const {repoName, step} = this.props;
		const branchName = step.get('branchName');
		const fileName = step.get('fileName');
		const fileContents = step.get('fileContents');
		const command = `git checkout -b ${branchName} && git add . && git commit -m "Create my first HTML page" && git push -u origin ${branchName}`; // eslint-disable-line max-len

		return (
			<CarouselContainer>
				<Pane name="">
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

					<div className={styles.continue}>Click Here to Put It Into Action -></div>
				</Pane>

				<Pane name="create-your-first-webpage">
					<p>
						In fact, let's create your first HTML page right now! It'll be a simple copy-paste job. 
						Type the following commands into your terminal. 
						It will create a new file with a .html extension and open it up in Sublime:
					</p>

					<Bash noSelect={true}>cd ~/{repoName} && touch {fileName} && subl {fileName}</Bash>

					<p>
						<strong><CopyButtonContainer text={fileContents} /> and paste the HTML above</strong> into 
						your file. Press Command+S to save. Then, to look at your handiwork in a browser, type:
					</p>

					<Bash noSelect={true}>open {fileName}</Bash>

					<p>
						Check that out. You just created your first webpage! Nicely done. 
						To move on to the next step (and write some HTML from scratch), just send your code back to us 
						by copy-pasting the following into the terminal:
					</p>

					<Bash copy={true}>{command}</Bash>
				</Pane>
			</CarouselContainer>
		);
	},
});

export default Content;
