import React from 'react';
import {Paths, BASE_PATH} from '../api/paths';
import fetch from 'isomorphic-fetch';

const baseConfig = {
	componentDidMount() {
		const {step, token} = this.props;
		const path = BASE_PATH + Paths.ADD_VISIT[1](step.get('id'), token);
		fetch(path, {method: 'POST'});
	},

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
};

export function createStep(config) {
	return React.createClass({
		...baseConfig,
		...config,
	});
}