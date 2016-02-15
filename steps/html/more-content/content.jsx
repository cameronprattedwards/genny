import React from 'react';
import {Link} from 'react-router';

import styles from './content.css';

import {
	Html, 
	FakePage, 
	Bash, 
	Carousel, 
	Pane, 
	Key,
	Continue, 
	CopyButtonContainer,
	Sidebar,
} from '../../../utils/components';

import {FILENAME} from '../html-from-scratch/content';

const POEM = `
Roses are red,
The ocean is blue.
I love penguins
	And so should you.`;

const tabbedPoem = POEM.split('\n').map(str => `\t\t\t${str}`).join('\n');

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "Add a beautiful penguin poem" && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<Carousel>
			<Pane name="">
				<p>
					Our penguin page is getting pretty awesome. So far, it's kind of scientific, though. 
					Can we make it a little more soulful and artistic? I think we can! 
					By adding a poem about penguins!
				</p>
				<p>
					(Okay. I know that this is kind of a weird idea. But just bear with me.)
				</p>
				<p className={styles.noMarginBottom}>
					Here's the poem we want to add:
				</p>

				<pre className={styles.pre}>{POEM}</pre>
				<Continue>
					<Link to="/step/more-content/div-tags">Next: Put Your Poem in a Div -></Link>
				</Continue>
			</Pane>
			<Pane name="div-tags">
				<p>
					This poem doesn't really belong in a conventional paragraph, 
					so let's try out another useful tag - <strong>div</strong>. 
					Divs are for creating arbitrary <strong>div</strong>isions, or 
					separate sections, on a page.
				</p>

				<p>Open {FILENAME} in Sublime Text.</p>

				<p>
					<strong>
						Add a <code>div</code> tag 
					</strong>
					{' '}right above your closing <code>body</code> tag.
				</p>
				<p>
					<strong>
						<CopyButtonContainer text={`${tabbedPoem}\n`}/> and paste the poem
					</strong> 
					{' '}between the opening and closing <code>div</code> tags, like this:
				</p>

				<Html noSelect={true}>{`(...the rest of your content is up here...)
		<div>${tabbedPoem}
		</div>
	</body>
</html>
				`}</Html>
				<p>
					That should work great, right? Well, <strong>open your webpage in a browser </strong>
					and scroll to the bottom. 
					You'll see it looks like this:
				</p>
				<FakePage>{POEM}</FakePage>
				<h3>Where are the line breaks? What went wrong?</h3>
				<p>
					Well, most of the time, the browser will ignore any multi-spaces you have in your 
					code. That includes new lines, tabs, and really any time you have more than one space 
					between words. It might seem a little annoying at first, but actually it helps a lot: 
					it allows you to put line breaks in your HTML, to make it more readable, while
					still maintaining a nice, smooth, line-breakless image in the rendered content.
				</p>
				<Continue>
					<Link to="/step/more-content/pre-tags">Next: Pre Tags to the Rescue -></Link>
				</Continue>
			</Pane>
			<Pane name="pre-tags">
				<p>
					Sometimes, like when publishing a poem, you want all of the line breaks to show, right? 
					Well, fear not - here comes the <strong>pre</strong> tag to the rescue. The <code>pre</code> tag 
					(short for "pre-formatted") displays your code exactly as your wrote it, with all the line breaks 
					intact.
				</p>
				<p>
					<strong>Exchange your <code>div</code> tag 
					for a <code>pre</code> tag</strong>, so your document looks like this:
				</p>
				<Html noSelect={true}>{`(...the rest of your content is up here...)
		<pre>${tabbedPoem}
		</pre>
	</body>
</html>
				`}</Html>
				<Continue>
					<Link to="/step/more-content/pre-tags-and-tabs">Next: It Doesn't Look Quite Right -></Link>
				</Continue>
			</Pane>
			<Pane name="pre-tags-and-tabs">
				<p>Cool! So your poem will now look like this:</p>
				<FakePage><pre>{tabbedPoem}</pre></FakePage>
				<p>
					That's almost what we want, except now it's way over in the middle of the page. 
					We want it aligned with the left side of the page. 
					That's kind of the catch with <code>pre</code> tags: 
					Sometimes it preserves the whitespace in a way you don't want, like picking up the indentation 
					you use to make your HTML more readable. 
					So we'll need to make the HTML document a little 
					uglier and <strong>move all the text for the poem to the left side of the page</strong>, like this:
				</p>
				<Html noSelect={true}>{`(...the rest of your content is up here...)
		<pre>${POEM}
		</pre>
	</body>
</html>
				`}</Html>
				<p>Awesome! Now the poem looks like this in the browser:</p>
				<FakePage><pre>{POEM}</pre></FakePage>
				<p>
					The font looks a little weird, right? You can fix that when you learn about CSS. 
					But for now, we have what we really want, which is a poem with all the line breaks in place.
				</p>
				<Continue>
					<Link to="/step/more-content/submit-your-code">Next: Submit Your Code -></Link>
				</Continue>
				<Sidebar>
					<p>
						With Sublime Text, you can indent or de-dent 
						(move one tab to the left) multiple lines at the same time.
					</p>
					<p>
						Just highlight all the lines you want to move, 
						then press <Key>Tab</Key> to indent, or <Key>Shift</Key> <Key>Tab</Key> to de-dent.
					</p>
				</Sidebar>
			</Pane>
			<Pane name="submit-your-code">

				<p>To move on to the next step, just push your code to the remote repository.</p>

				<p>Just copy the following command into your {this.props.terminal}.</p>

				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export const Mac = React.createClass({
	render() {
		return <Content {...this.props} terminal="terminal" />;
	},
});

export const Win = React.createClass({
	render() {
		return <Content {...this.props} terminal="command prompt" />;
	},
});

export default Content;
