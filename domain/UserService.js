import squel from 'squel';
import mysql from '../utils/mysql';
import {Client} from '../utils/github';

const queries = {
	create({id, repoName, token, webhookSecret}) {
		return squel.insert().into('User')
			.set('id', id)
			.set('repoName', repoName)
			.set('webhookSecret', webhookSecret)
			.set('createdAt', new Date().getTime());
	},

	addToken(userId, token) {
		return squel.insert().into('User_token_update')
			.set('User_id', userId)
			.set('token', token)
			.set('updatedAt', new Date().getTime());
	},

	get(id) {
		return squel.select().from('User').limit(1).where(`id = '${id}'`);
	},

	getToken(id) {
		return squel.select().from('User_token_update')
			.field('token')
			.limit(1)
			.order('updatedAt', false)
			.where(`User_id = ${id}`);
	},

	updateToken(userId, newToken) {
		return squel.insert().into('User_token_update')
			.set('User_id', userId)
			.set('token', newToken)
			.set('updatedAt', new Date().getTime());
	}
};

const getWithToken = async function getWithToken(token) {
	const client = new Client(token);
	const {id} = await client.getUser();
	return getWithId(id);
}

const getWithId = async function getWithId(id) {
	let query = queries.get(id);
	const [gennyUser] = await mysql(query);
	query = queries.getToken(id);
	const [{token}] = await mysql(query);
	gennyUser.token = token;
	return gennyUser;
}

export default {
	async create(user) {
		let query = queries.create(user);
		await mysql(query);
		query = queries.updateToken(user.id, user.token);
		await mysql(query);
	},

	get({id, token}) {
		if (id) {
			return getWithId(id);
		}

		return getWithToken(token);
	},

	updateToken(userId, newToken) {
		const query = queries.updateToken(userId, newToken);
		return mysql(query);
	},
};
