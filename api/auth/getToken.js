import github from '../../utils/github';

const {CLIENT_ID, CLIENT_SECRET} = process.env;

export const getToken = async function getToken(code) {  // eslint-disable-line no-unused-vars
	const params = {
		code,
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET,
	};

	const url = github.Paths.accessToken(params);
	console.log('boom url');
	console.log(url);

	const response = await github.request(url);

	return response['access_token'];
};
