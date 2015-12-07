import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const HTML = 'html';

let steps = {};

let dirs = fs.readdirSync(path.join(__dirname, HTML));

let blacklist = ['.', '..', 'index.js'];

dirs = _.difference(dirs, blacklist);

for (let dir of dirs) {
	let {branchName, name} = require(`./${HTML}/${dir}`).default;
	steps[dir] = {branchName, name, module: HTML};
}

let modules = {
	html: require(`./${HTML}`).default,
};

let state = {
	steps,
	modules,
	moduleOrder: [HTML],
};

console.log(state);

export default state;
