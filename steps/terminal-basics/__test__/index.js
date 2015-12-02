export default function test({head_commit}) {  // eslint-disable-line camelcase
	return head_commit.added.indexOf('test-file.txt') !== -1;
}
