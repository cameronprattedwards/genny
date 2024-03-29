import fs from 'fs';
import path from 'path';
import _ from 'lodash';

let mapping = {};

let dirs = fs.readdirSync(path.join(__dirname, 'html'));

let blacklist = ['.', '..', 'state.js', 'index.js'];

dirs = _.difference(dirs, blacklist);

for (let dir of dirs) {
	mapping[dir] = require(`./html/${dir}/test`).default;
}

export default mapping;
