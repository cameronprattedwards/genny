export const Paths = {
	HOOK: [
		'/hook/:userId',
		({userId}) => `/hook/${userId}`
	],
};

const {WEBHOOK_DOMAIN} = process.env;

export function reversePath(path, full=true, params) {
	let reversedPath = path[1](params);
	if (full) {
		reversedPath = WEBHOOK_DOMAIN + reversedPath;
	}

	return reversedPath;
}

export default {
	Paths,
	reversePath,
};
