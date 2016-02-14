import randomstring from 'randomstring';
import apiPaths from '../paths';
import github from '../../utils/github';
import {STATE_KEY} from './constants';

const {CLIENT_ID} = process.env;

export function login(request, response) {
	const redirectUri = apiPaths.reversePath(apiPaths.Paths.CALLBACK);
	const state = randomstring.generate({ length: 32 });
	const params = {
		[STATE_KEY]: state,
		scope: 'user, repo',
		'redirect_uri': redirectUri,
		'client_id': CLIENT_ID,
	};

	response
		.cookie('state', state)
		.redirect(github.Paths.authorize(params));
}
