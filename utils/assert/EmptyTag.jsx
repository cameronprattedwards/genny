import React from 'react';
import {Code} from '../components/Code';

export const EmptyTag = React.createClass({
	render() {
		let {tagName, expectedContent} = this.props;

		return (
			<div>
				<p>Looks like you're missing content for your <code>{tagName}</code> tag.</p>
				<p>The content should be:</p>
				<Code>{expectedContent}</Code>
				<p>Some possible solutions:</p>
				<ul>
					<li>
						Maybe you forgot to close your <code>{tagName}</code> tag. 
					</li>
					<li>
						Maybe you mistyped the closing tag.
						The closing tag should look like this: <code>{`</${tagName}>`}</code>.
					</li>
					<li>
						Maybe you forgot to add the content. 
						Just type <code>{expectedContent}</code> between your 
						<code>{`<${tagName}>`}</code> and 
						<code>{`</${tagName}>`}</code> tags.
					</li>
				</ul>
			</div>
		);
	},
});
