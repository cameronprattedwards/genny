export default function test({head_commit}) {
	console.log('boom there it is');
	console.log(head_commit.added);
	for (let file of head_commit.added) {
		let [dirName, fileName] = file.split('/');
		if (fileName === 'test-file.txt') {
			return true;
		}
	}

	return false;
}
