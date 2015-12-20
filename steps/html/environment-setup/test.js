import _ from 'lodash';
import {expect} from 'chai';

const FILENAME = 'test-file.txt';

const test = async function test(hook) {
	let containsFile = _.some(hook.commits, ({added, modified}) => {
		return _.contains(added, FILENAME) || _.contains(modified, FILENAME);
	});

	expect(containsFile).to.be(true);
};

export default test;
