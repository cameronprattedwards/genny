import React from 'react';
import {Code} from '../components/Code';
import {Html} from '../components/Html';
import _ from 'lodash';
import {VOID_ELEMENTS} from '../../domain/constants';

export const MissingTag = React.createClass({
	render() {
		const {tagName, expectedContent, expectedAttributes} = this.props;
		const attributesEls = _.map(expectedAttributes, (value, attrName) => {
			return (
				<p>
					Give your <code>{tagName}</code> tag 
					a {attrName} attribute with a value 
					of <code>{value}</code>.
				</p>
			);
		});

		let attributeString = _.map(expectedAttributes, (value, attrName) => {
			return `${value}="${attrName}"`;
		}).join(' ');

		if (attributeString) {
			attributeString = ` ${attributeString}`;
		}

		let tagString;

		if (_.includes(VOID_ELEMENTS, tagName)) {
			tagString = `<${tagName}${attributeString} />`;
		} else {
			tagString = `<${tagName}${attributeString}>${expectedContent}</${tagName}>`;
		}

		let contentEl = null;

		if (expectedContent) {
			contentEl = (
				<div>
					<p>
						Set your <code>{tagName}</code> tag's content to:
					</p>
					<Code>
						{expectedContent}
					</Code>
				</div>
			);
		}

		return (
			<div>
				<p>You are missing a <code>{tagName}</code> tag.</p>
				<p>Add a <code>{tagName}</code> tag to your HTML page.</p>
				{contentEl}
				{attributesEls}
				<p>
					When you're done, your <code>{tagName}</code> tag should look like this:
				</p>
				<Html noSelect={true}>{tagString}</Html>
			</div>
		);
	},
});
