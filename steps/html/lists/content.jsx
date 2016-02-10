import React from 'react';
import {Link} from 'react-router';

import {
	Html,
	Bash,
	Carousel,
	Pane,
	Continue,
	CopyButtonContainer,
	FakePage,
} from '../../../utils/components';

import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {YOUTUBE_LINK, YOUTUBE_TEXT} from '../links/content';
import {IMG_URL} from '../images/content';
import {HEADER} from '../body-tag/content';
import {PARAGRAPH, PARAGRAPH_HTML} from '../inline-tags/content';

const facts = [
`				In the 16th century, the word penguin actually referred to Great Auks, 
				a now-extinct species that inhabited the seas around eastern Canada.
`,
`				Penguins survive because their feathers trap a layer of warm air 
				next to the skin that serves as insulation.
`,
`				Because they aren't used to danger from animals on solid ground, 
				wild penguins exhibit no particular fear of human tourists.
`,
`				Penguins evolved to stay in the Southern Hemisphere 
				because there are no land predators, like wolves or polar bears.
`,
];

const factsHtml = facts.map(fact => `			<li>
${fact}			</li>
`).join('');

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "Add more penguin facts." && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<Carousel>
			<Pane name="">
				<p>
					Our penguin webpage is pretty awesome, but it only has one fact on it so far. 
					Wouldn't it be nice to add some more?
				</p>
				<p>
					This sounds like a good job for a <strong>list</strong>! 
					HTML contains three different kinds of lists. Let's explore them now.
				</p>
				<h4>Ordered Lists</h4>
				<p>
					Ordered lists are lists that have a particular order. 
					Like my top five favorite ice creams. 
					Those definitely go in a particular order. 
					Cookie dough is #1. Mint chocolate chip is pretty great, 
					but I don't want there to be any doubt in anyone's minds that cookie dough is the all-time fave. 
					No contest. Let's be clear. Cookie dough's the best.
				</p>
				<p>
					So, because I want my favorite ice creams clearly ordered, I'll use an ordered list.
					To create an ordered list, you create an <strong>ol</strong> tag. Then, for each item in the list, 
					add an <strong>li</strong> tag (stands for "list item") with the item as content.
				</p>
				<p>This list of (very clearly ordered) list items should give you some idea:</p>
				<Html>{`<ol>
	<li>Chocolate Chip Cookie Dough</li>
	<li>Mint Chocolate Chip</li>
	<li>Ben and Jerry's Milk and Cookies</li>
	<li>Rocky Road</li>
	<li>Cherry Cordial</li>
</ol>`}</Html>
				<p>A browser will render our ice cream flavors list like this:</p>
				<ol>
					<li>Chocolate Chip Cookie Dough</li>
					<li>Mint Chocolate Chip</li>
					<li>Ben and Jerry's Milk and Cookies</li>
					<li>Rocky Road</li>
					<li>Cherry Cordial</li>
				</ol>
				<h4>Unordered Lists</h4>
				<p>
					Some lists don't need to go in any particular order. 
					Like a list of famous libraries. One isn't necessarily more famous than the other.
					So it's okay if we just use bullet points instead of numbers in our list.
				</p>
				<p>
					An unordered list has a <strong>ul</strong> tag on the outside, 
					and one or more <strong>li</strong> tags on the inside.
					It's basically the same as an ordered list, except it uses a <code>ul</code> tag 
					instead of an <code>ol</code> tag.
				</p>
				<Html>{`<ul>
	<li>Bibliotheca Alexandrina</li>
	<li>The Library of Congress</li>
	<li>National Library of Spain</li>
	<li>Stadtbibliothek Stuttgart</li>
	<li>New York Public Library for the Performing Arts</li>
</ul>`}</Html>
				<p>A browser will render our unordered list of libraries like this:</p>
				<ul>
					<li>Bibliotheca Alexandrina</li>
					<li>The Library of Congress</li>
					<li>National Library of Spain</li>
					<li>Stadtbibliothek Stuttgart</li>
					<li>New York Public Library for the Performing Arts</li>
				</ul>
				<h4>Dictionary Lists</h4>
				<p>
					Dictionary lists are really good for pairing up terms and definitions, or 
					labels and values. Basically, it's good for things that come in pairs. 
				</p>
				<p>
					To create a dictionary list, create a <strong>dl</strong> tag. 
					In between your opening and closing <code>dl</code> tag, you can add one or more 
					<strong>dt</strong> (dictionary term) tags, along with one or more 
					<strong>dd</strong> (dictionary definition) tags. Here's an example of a 
					"Glossary of Weird Words":
				</p>
				<Html>{`<dl>
	<dt>absquatulate</dt>
	<dd>flee, make off; abscond.</dd>
	<dt>bezonian</dt>
	<dd>a scoundrel.</dd>
	<dt>callipygian</dt>
	<dd>having shapely buttocks.</dd>
	<dt>dandle</dt>
	<dd>to dance (a child) on one's knees.</dd>
	<dt>edacious</dt>
	<dd>devouring, consuming, voracious.</dd>
</dl>`}</Html>
				<p>The browser would render our glossary like this:</p>
				<dl>
					<dt>absquatulate</dt>
					<dd>flee, make off; abscond.</dd>
					<dt>bezonian</dt>
					<dd>a scoundrel.</dd>
					<dt>callipygian</dt>
					<dd>having shapely buttocks.</dd>
					<dt>dandle</dt>
					<dd>to dance (a child) on one's knees.</dd>
					<dt>edacious</dt>
					<dd>devouring, consuming, voracious.</dd>
				</dl>
				<Continue>
					<Link to="/step/lists/ul-tag">Next: Try It Out -></Link>
				</Continue>
			</Pane>
			<Pane name="ul-tag">
				<p>
					Let's add some more facts to our penguins page. 
					Open {FILENAME} in Sublime Text.
				</p>
				<p>
					Beneath your fact paragraph, 
					<strong> add an unordered list tag, with a single <code>li</code> tag </strong>
					inside, so that your page looks like this:
				</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<p>
			${PARAGRAPH}
		</p>
		<ul><li></li></ul>
		<p>
			<a href="${YOUTUBE_LINK}">${YOUTUBE_TEXT}</a>
		</p>
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/lists/li-tag">Next: Make Your Paragraph a List Item -></Link>
				</Continue>
			</Pane>
			<Pane name="li-tag">
				<p>
					Now, <strong>move the contents of your paragraph into the <code>li</code> tag</strong>. 
					You'll probably want to add a line break between 
					your <code>li</code> tag and your <code>ul</code> tag. 
				</p>
				<p>
					Then, <strong>delete the <code>p</code> tag where the fact used to be.</strong>
				</p>

				<p>Your document should look like this:</p>

				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<ul>
			<li>
				${PARAGRAPH}
			</li>
		</ul>
		<p>
			<a href="${YOUTUBE_LINK}">${YOUTUBE_TEXT}</a>
		</p>
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/lists/multiple-list-items">Next: Add Multiple List Items -></Link>
				</Continue>
			</Pane>
			<Pane name="multiple-list-items">
				<p>
					Now that we have a list with some content, let's <strong>add some more list items</strong>. 
					Here are some penguins facts for you to add:
				</p>
				<ul>
					{facts.map(fact => <li key={fact}>{fact} <CopyButtonContainer text={fact} /></li>)}
				</ul>
				<p>When you're done adding facts, {FILENAME} should look something like this:</p>
				<Html noSelect={true}>{`${DOCTYPE}
<html>
	<head></head>
	<body>
		<h1>${HEADER}</h1>
		<ul>
			<li>
				${PARAGRAPH}
			</li>
${factsHtml}		</ul>
		<p>
			<a href="${YOUTUBE_LINK}">${YOUTUBE_TEXT}</a>
		</p>
		<img src="${IMG_URL}"></img>
	</body>
</html>`}</Html>
				<Continue>
					<Link to="/step/lists/view-your-page">Next: View Your Page -></Link>
				</Continue>
			</Pane>
			<Pane name="view-your-page">
				<p>
					Now that you've added some list items, see what they look like in a browser!
				</p>

				{this.props.open}

				<p>Your page should look like this:</p>

				<FakePage>
					<h1>{HEADER}</h1>
					<ul>
						<li>
							{PARAGRAPH_HTML}
						</li>
						{facts.map(fact => <li key={fact}>{fact}</li>)}
					</ul>
					<p>
						<a href={YOUTUBE_LINK}>{YOUTUBE_TEXT}</a>
					</p>
					<img src={IMG_URL}></img>
				</FakePage>

				<Continue>
					<Link to="/step/lists/push-your-code">Next: Push Your Code -></Link>
				</Continue>
			</Pane>
			<Pane name="push-your-code">
				<p>
					Check that stuff out in a browser to make sure everything looks good, 
					then push your code to your remote repository.
				</p>
				<p>
					Just <strong>copy this into your {this.props.terminal}</strong>:
				</p>
				<Bash copy={true}>{command}</Bash>
				{this.props.statusLink}
			</Pane>
		</Carousel>
	);
},
});

export const Mac = React.createClass({
	render() {
		const open = (
			<div>
				<p>
					If you have {FILENAME} open in your browser, just refresh the page. 
					Otherwise, just type this into your terminal and press "enter":
				</p>
				<Bash noSelect={true}>open {FILENAME}</Bash>
			</div>
		);

		return <Content {...this.props} open={open} terminal="terminal" />;
	}
});

export const Win = React.createClass({
	render() {
		const open = (
				<p>
					If you have {FILENAME} open in your browser, just refresh the page. 
					Otherwise, navigate to {FILENAME} in your File Explorer and double click it.
				</p>
		);

		return <Content {...this.props} open={open} terminal="command prompt" />;
	}
});

export default Content;
