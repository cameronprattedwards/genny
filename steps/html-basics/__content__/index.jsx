import React from 'react';
import {createStep} from '../../../utils/createStep';
import {Link} from 'react-router';

const HtmlBasicsStep = createStep({
	render() {
		const {step} = this.props;

		let message = '';

		if (step.get('success')) {
			const next = this.next();
			message = <div>You succeeded. <Link to={next} href={next}>Next Step</Link></div>;
		} else if (step.get('failure')) {
			message = 'You failed.';
		} else if (step.get('commit')) {
			message = 'We got your code - we are waiting for tests to run.';
		}

		return (
			<div>
				<div>Blah blah blah, some stuff about HTML.</div>
				<div>{message}</div>
			</div>
		);
	},
});

export default HtmlBasicsStep;
