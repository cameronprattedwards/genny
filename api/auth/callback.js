import github from '../../utils/github';
import UserService from '../../domain/UserService';

import {getToken} from './getToken';
import {makeUser} from './makeUser';
import {isSecure} from './isSecure';
import {getHtml} from './getHtml';

export const callback = async function callback(request, response) {  // eslint-disable-line no-unused-vars
	try {
		if (!isSecure(request)) {
			response.status(400).send('Ya tryin to trick me?');
		}

		const token = await getToken(request.query.code);  // eslint-disable-line no-undef
		response.cookie('token', token);
		const {id, login} = await (new github.Client(token).getUser());
		const gennyUser = await UserService.get({id});

		if (!gennyUser) {
			await makeUser(token, id, login);
		} else if (gennyUser.token !== token) {
			await UserService.updateToken(id, token);
		}

		const string = await getHtml(id, token);
		response.status(200).send(string);
	} catch (e) {
		console.log(e.stack);
		response.set('Content-type', 'text/plain').status(500).send(e.stack);
	}
};
