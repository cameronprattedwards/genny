import branchNames from './branchNames';

let mapping = {};

for (let branchName of branchNames) {
	mapping[branchName] = require(`./${branchName}/test`).default;
}

export default mapping;
