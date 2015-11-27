export const BASE_PATH = '/api';

export const Paths = {
	LOGIN: '/login',
	CALLBACK: '/callback',
	GET_USER_STATE: '/state',
};

const {SERVER_DOMAIN} = process.env;

export function reversePath(path, full = true) {
	let reversedPath = BASE_PATH + path;
	if (full) {
		reversedPath = SERVER_DOMAIN + reversedPath;
	}

	return reversedPath;
}

export default {
	Paths,
	reversePath,
};
