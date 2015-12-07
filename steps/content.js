import dirs from './files';

import _ from 'lodash';

let mapping = {};

let blacklist = ['.', '..', 'index.js'];

let difference = _.difference(dirs, blacklist);

for (let dir of difference) {
	mapping[dir] = require(`./html/${dir}/content`).default;
}

export default mapping;
