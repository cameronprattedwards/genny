import fs from 'fs';
import path from 'path';

const argv = require('yargs').demand(2).argv;
const [module, step] = argv._;
const dashedName = toDashes(step);

const index = `export default {
	name: '${step}',
	branchName: '${dashedName}',
};
`;

const content = `import React from 'react';

const Content = React.createClass({
	render() {
		return (
			<div>
			</div>
		);
	},
});

export default Content;
`;

const test = `const test = async function test(hook) {

};

export default test;
`;

const stepPath = path.join(__dirname, `../steps/${module}/${dashedName}`);

fs.mkdirSync(stepPath);

fs.writeFileSync(path.join(stepPath, 'index.js'), index);
fs.writeFileSync(path.join(stepPath, 'content.jsx'), content);
fs.writeFileSync(path.join(stepPath, 'test.js'), test);

function toDashes(string) {
	return string.replace(/\s+/g, '-').toLowerCase();
}
