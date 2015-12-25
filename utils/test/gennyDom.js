import jsdom from 'jsdom';
import {expect} from 'chai';

export function gennyDom(markup) {
	return new Promise((resolve, reject) => {
		jsdom.env(markup, {
			done(error, window) {
				if (error) {
					reject(error);
				} else {
					resolve(window);
				}
			},
		});
	});
};

export function hasTag(document, tagName, innerText = null, innerErrorMessage = null) {
	let [tag] = document.getElementsByTagName(tagName);
	expect(tag).to.not.equal(undefined, `Add a ${tagName} tag to your HTML.`);
	console.log(tag);
	console.log(tag.innerText);


	if (innerText) {
		if (!innerErrorMessage) {
			innerErrorMessage = `Wrap your ${tagName} tag around the words '${innerText}'`;
		}
		let tagText = tag.firstChild && tag.firstChild.nodeValue && tag.firstChild.nodeValue.trim();
		expect(tagText).to.equal(innerText, innerErrorMessage);
	}

	return tag;
}

export class TagAsserter {
	constructor(document) {
		this.document = document;
	}

	hasTag(...args) {
		return hasTag(this.document, ...args);
	}
}

TagAsserter.instance = async function(markup) {
	let {document} = await gennyDom(markup);
	return new TagAsserter(document);
};
