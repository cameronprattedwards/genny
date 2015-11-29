import squel from 'squel';
import mysql from '../utils/mysql';

export default {
	get({directoryName}) {
		let query = squel.select().from('Step').join(
			squel.select().from('Step_directoryName_update')
				.order('updatedAt', false)
				.field('Step_id').field('directoryName'),
			'dir',
			'Step.id = dir.Step_id'
		).where(`directoryName = '${directoryName}'`);
		
		return mysql(query);
	},
};
