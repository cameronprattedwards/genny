export default function test({head_commit}) {  // eslint-disable-line camelcase
	for (let file of head_commit.added) {  // eslint-disable-line camelcase
		let [, fileName] = file.split('/');
		if (fileName === 'test-file.txt') {
			return true;
		}
	}

	return false;
}
