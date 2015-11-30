import React from 'react';
import {Link} from 'react-router';
import {createStep} from '../../../utils/createStep';

const TerminalBasicsStep = createStep({
	render() {
		const {repoName, login, step} = this.props;

		let message = '';

		if (step.get('success')) {
			const next = this.next();
			message = <div>You succeeded. <Link to={next} href={next}>Next Step</Link></div>;
		} else if (step.get('failure')) {
			message = 'You failed.';
		} else if (step.get('commit')) {
			message = 'We got your code - we are waiting for tests to run.';
		}

		const cloneUrl = `https://github.com/${login}/${repoName}.git`;

		return <div>
			<p>To get started, run:</p>
			<p>
				<code>
					git clone {cloneUrl} && mkdir {repoName}/terminal-basics && cd {repoName}/terminal-basics
				</code>
			</p>
			<p><code>touch test-file.txt</code></p>
			<p>
				<code>
					git add test-file.txt && git commit -m "Add test-file.txt" && git push origin master
				</code>
			</p>
			<div>{message}</div>
		</div>;
	},
});

export default TerminalBasicsStep;
