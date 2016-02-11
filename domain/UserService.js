import squel from 'squel';
import mysql from '../utils/mysql';
import {Client} from '../utils/github';

const getWithToken = async function getWithToken(token) {
	const client = new Client(token);
	const {id} = await client.getUser();
	return getWithId(id);
}

const getWithId = async function getWithId(id) {
	let query = squel.select().from('User').limit(1).where(`id = '${id}'`);
	const [gennyUser] = await mysql(query);
	return gennyUser;
}

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

	get({id, token}) {
		if (id) {
			return getWithId(id);
		}

		return getWithToken(token);
	},
};
