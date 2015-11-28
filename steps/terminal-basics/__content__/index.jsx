import React from 'react';

const TerminalBasicsStep = React.createClass({
	render() {
		const {repoName, login} = this.props;

		const cloneUrl = `https://github.com/${login}/${repoName}.git`;

		return <div>
			<p>To get started, run:</p>
			<p><code>git clone {cloneUrl} && mkdir {repoName}/terminal-basics && cd {repoName}/terminal-basics</code></p>
			<p><code>touch test-file.txt</code></p>
			<p><code>git add test-file.txt && git commit -m "Add test-file.txt" && git push origin master</code></p>
		</div>;
	}
});

export default TerminalBasicsStep;
