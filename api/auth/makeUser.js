import {makeRepo} from './makeRepo';
import UserService from '../../domain/UserService';

export const makeUser = async function makeUser(token, id, login) {
	const {repoName, webhookSecret} = await makeRepo(token, id, login);
	const user = {
		id,
		repoName,
		token,
		webhookSecret,
	};

	return UserService.create(user);
};
