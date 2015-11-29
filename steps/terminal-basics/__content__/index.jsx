import React from 'react';
import {Link} from 'react-router';

const TerminalBasicsStep = React.createClass({
	next() {
		const {step, db, modules} = this.props;
		const currentStepId = step.get('id');
		const currentModuleId = step.get('module');
		const module = db.getIn(['modules', currentModuleId.toString()]);
		const currentStepIndex = module.get('steps').indexOf(currentStepId);
		const finalStepInModule = currentStepIndex === module.get('steps').size - 1;
		let nextStepId;
		if (finalStepInModule) {
			const currentModuleIndex = modules.indexOf(module.get('id'));
			const isFinalModule = currentModuleIndex === modules.size - 1;
			if (isFinalModule) {
				return '/the-end';
			}
			const nextModuleId = modules.get(currentModuleIndex + 1);
			const nextModule = db.get('modules').get(nextModuleId);
			nextStepId = nextModule.getIn(['steps', 0]);
		} else {
			nextStepId = module.getIn(['steps', currentStepIndex + 1]);
		}
		const nextStep = db.getIn(['steps', nextStepId.toString()]);
		return `/step/${nextStep.get('directoryName')}`;
	},

	render() {
		const {repoName, login, step} = this.props;

		console.log('STEP!');
		console.log(step);

		const cloneUrl = `https://github.com/${login}/${repoName}.git`;

		let message = '';

		if (step.get('success')) {
			const next = this.next();
			message = <div>You succeeded. <Link to={next} href={next}>Next Step</Link></div>;
		} else if (step.get('failure')) {
			message = 'You failed.';
		} else if (step.get('commit')) {
			message = 'We got your code - we are waiting for tests to run.';
		}

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
