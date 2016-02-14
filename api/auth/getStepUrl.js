import StepService from '../../domain/StepService';
import db from '../../steps';

export const getStepUrl = async function getStepUrl(id) {
	let step = await StepService.getLastVisit(id);
	step = step || db.modules[db.moduleOrder[0]].steps[0];
	return `${process.env.SERVER_DOMAIN}/step/${step}`;
}
