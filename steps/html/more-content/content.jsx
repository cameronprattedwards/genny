import React from 'react';
import styles from './content.css';
import {Html} from '../../../utils/components/Html';
import {NoSelect} from '../../../utils/components/NoSelect';
import {FakePage} from '../../../utils/components/FakePage';
import {Bash} from '../../../utils/components/Bash';

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

	return (
		<div>
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

			<p>
				This poem doesn't really belong in a conventional paragraph, 
				so let's try out another useful tag - <strong>div</strong>. 
				Divs are for creating arbitrary <strong>div</strong>isions, or 
				separate sections, on a page.
			</p>

			<p>First, checkout your new branch:</p>

			<Bash>git checkout -b {branchName}</Bash>

			<p>
				Add a <code>div</code> tag at the bottom of the body and copy-paste the poem in there, 
				like this:
			</p>

			<NoSelect><Html>{`(...the rest of your content is up here...)
		<div>${tabbedPoem}
		</div>
	</body>
</html>
				`}</Html></NoSelect>
			<p>
				That should work great, right? Well, open up your webpage in a browser, 
				and you'll see it looks like this:
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
			<p>
				But sometimes, like when publishing a poem, you want all of the line breaks to show, right? 
				Well, fear not - here comes the <strong>pre</strong> tag to the rescue. The <code>pre</code> tag 
				(short for "pre-formatted") displays your code exactly as your wrote it, with all the line breaks 
				intact.
			</p>
			<p>
				So, all you have to do is exchange your <code>div</code> tag 
				for a <code>pre</code> tag, so your document looks like this:
			</p>
			<NoSelect><Html>{`(...the rest of your content is up here...)
		<pre>${tabbedPoem}
		</pre>
	</body>
</html>
				`}</Html></NoSelect>
			<p>Cool! So your poem will now look like this:</p>
			<FakePage><pre>{tabbedPoem}</pre></FakePage>
			<p>
				That's almost what we want, except now it's way over in the middle of the page. 
				We want it aligned with the left side of the page. That's kind of the catch with <code>pre</code> tags: 
				Sometimes it preserves the whitespace in a way you don't want, like picking up the indentation 
				you use to make your HTML more readable. 
				So we'll need to make the HTML document a little 
				uglier and move all the text for the poem to the left side of the page, like this:
			</p>
			<NoSelect><Html>{`(...the rest of your content is up here...)
		<pre>${POEM}
		</pre>
	</body>
</html>
				`}</Html></NoSelect>
			<p>Awesome! Now the poem looks like this in the browser:</p>
			<FakePage><pre>{POEM}</pre></FakePage>
			<p>
				The font looks a little weird, right? You can fix that when you learn about CSS. 
				But for now, we got what we really need, which is a poem with all the line breaks in place.
			</p>

			<p>To move on to the next step, just push your code to the remote repository:</p>

			<Bash>git add . && git commit -m "Add a beautiful penguin poem" && git push -u origin {branchName}</Bash>
		</div>
	);
},
});

export default Content;
