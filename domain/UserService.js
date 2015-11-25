import squel from 'squel';
import mysql from '../utils/mysql';

export default {
	create({id, repoName, accessToken, webhookSecret}) {
		const query = squel.insert().into('User')
			.set('id', id)
			.set('repoName', repoName)
			.set('token', accessToken)
			.set('webhookSecret', webhookSecret);
		return mysql(query);
	},
};
