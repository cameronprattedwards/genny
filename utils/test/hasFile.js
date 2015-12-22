import _ from 'lodash';
import {expect} from 'chai';

export function hasFile(hook, fileName) {
	console.log(fileName);
	return _.some(hook.commits, ({added, modified}) => {
		return _.includes(added, fileName) || _.includes(modified, fileName);
	});
}

export function assertHasFile(hook, fileName) {
	let containsFile = hasFile(hook, fileName);
	expect(containsFile).to.equal(true);
}
