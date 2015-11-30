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

	async get({id, token}) {
		let query = squel.select().from('User').limit(1);

		if (id) {
			query = query.where(`id = ${id}`);
		}

		if (token) {
			query = query.where(`token = '${token}'`);
		}

		const [gennyUser] = await mysql(query);
		return gennyUser;
	},
};
