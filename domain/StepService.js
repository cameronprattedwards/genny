import squel from 'squel';
import mysql from '../utils/mysql';

export default {
	get({branchName}) {
		let query = squel.select().from('Step').join(
			squel.select().from('Step_branchName_update')
				.order('updatedAt', false)
				.field('Step_id').field('branchName'),
			'dir',
			'Step.id = dir.Step_id'
		).where(`branchName = '${branchName}'`);
		
		return mysql(query);
	},

	commit(userId, stepId, success) {
		let query = squel.insert().into('Step_commit')
			.set('Step_id', stepId)
			.set('User_id', userId)
			.set('success', success)
			.set('committedAt', new Date().getTime());

		return mysql(query);
	},
};
