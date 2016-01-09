import React from 'react';
import {Html} from '../../../utils/components/Html';
import {Bash} from '../../../utils/components/Bash';
import {IMG_URL} from '../images/content';
import {Sidebar} from '../../../utils/components/Sidebar';

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');
	const command = `git checkout -b ${branchName} && git add . && git commit -m "Make img tag self-closing" && git push -u origin ${branchName}`; // eslint-disable-line max-len

	return (
		<div>
			<p>
				Here's a handy trick. If a tag cannot contain any content, then it should be self-closing. 
				A self-closing tag looks like this:
			</p>
			<Html>{`<tagName attribute="attribute value" />`}</Html>
			<p>
				The only tag we've talked about so far that can be self-closing is the <code>img</code> tag. 
				It wouldn't make any sense for an image to have content, right? 
				To finish this step, let's make the <code>img</code> tag for our penguin image self closing. 
			</p>

			<p>Change the <code>img</code> tag to look like this:</p>
			<Html noSelect={true}>{`<img src="${IMG_URL}" />`}</Html>
			<p>Easy peasy. Now just push the code to our shared repository:</p>
			<Bash copy={true}>{command}</Bash>
			<Sidebar>
				There are a handful of tags that are self-closing, 
				but the one you'll use most often is <code>img</code>. 
				Here's a complete list of self-closing tags: 
				<code>
					{' '}area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track,
				</code> and <code>wbr</code>.
			</Sidebar>
			{this.props.statusLink}
		</div>
	);
},
});

export default Content;
