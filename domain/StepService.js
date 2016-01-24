import squel from 'squel';
import mysql from '../utils/mysql';

const queries = {
	get(branchName) {
		return squel.select().from('Step').join(
			squel.select().from('Step_branchName_update')
				.order('updatedAt', false)
				.field('Step_id').field('branchName'),
			'dir',
			'Step.id = dir.Step_id'
		).where(`branchName = '${branchName}'`);
	},

	getLastCommit(userId, stepId) {
		return squel.select().from('Step_commit')
			.order('committedAt', false)
			.where(`User_id = ${userId}`)
			.where(`Step_id = '${stepId}'`)
			.limit(1);
	},

	commit(userId, stepId, success, error = null) {
		return squel.insert().into('Step_commit')
			.set('Step_id', stepId)
			.set('User_id', userId)
			.set('success', success)
			.set('error', JSON.stringify(error))
			.set('committedAt', new Date().getTime());
	},

	getLastVisit(userId) {
		return squel.select().from('Step_visit')
			.order('visitedAt', false)
			.where(`User_id = ${userId}`)
			.limit(1);
	},
};

export default {
	get({branchName}) {
		return mysql(queries.get(branchName));
	},

	async getLastCommit(userId, stepId) {
		const query = queries.getLastCommit(userId, stepId);
		let [commit] = await mysql(query);
		return commit;
	},

	commit(userId, stepId, success, error) {
		return mysql(queries.commit(userId, stepId, success, error));
	},

	async getLastVisit(userId) {
		const query = queries.getLastVisit(userId);
		let [visit] = await mysql(query);
		return visit && visit.Step_id;
	},
};
