import squel from 'squel';
import mysql from '../utils/mysql';

export default {
	create({id, repoName, accessToken, webhookSecret}) {
		const query = squel.insert().into('User')
			.set('id', id)
			.set('repoName', repoName)
			.set('token', accessToken)
			.set('webhookSecret', webhookSecret)
			.set('createdAt', new Date().getTime());

		return mysql(query);
	},

	async get(id) {
		const query = squel.select().from('User').where(`id = ${id}`);
		const [gennyUser] = await mysql(query);
		return gennyUser;
	},
};
