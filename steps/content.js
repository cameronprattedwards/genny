import dirs from './files';

import _ from 'lodash';

let mapping = {};

let blacklist = ['.', '..', 'index.js'];

let difference = _.difference(dirs, blacklist);

for (let dir of difference) {
	let {Mac, Win} = require(`./html/${dir}/content`);
	mapping[dir] = {Mac, Win};
}

export default mapping;
