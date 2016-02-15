import StepService from '../domain/StepService';

export const commitExists = async function commitExists(userId, branchName) {
	const lastCommit = await StepService.getLastCommit(userId, branchName);
	return lastCommit && lastCommit.success;
};
