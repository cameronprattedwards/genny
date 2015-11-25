import 'isomorphic-fetch';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import qs from 'qs';

export const request = async function request(url, accessToken, options = {}) {
	const headers = {
		'Accept': 'application/json',
	};

	if (accessToken) {
		headers['Authorization'] = `Token ${accessToken}`;
	}

	if (options.headers) {
		options.headers = Object.assign(headers, options.headers);
	} else {
		options.headers = headers;
	}

	if (typeof options.body === 'object') {
		options.body = JSON.stringify(options.body);
	}

	const response = await fetch(url, options);
	return response.json();
};

export const Paths = {
	authorize(params) {
		return `https://github.com/login/oauth/authorize?${qs.stringify(params)}`;
	},
	accessToken(params) {
		return `https://github.com/login/oauth/access_token?${qs.stringify(params)}`;
	},
	user() {
		return 'https://api.github.com/user';
	},
	repos() {
		return 'https://api.github.com/user/repos';
	},
	collaborators(login, repoName, adminName) { 
		return `https://api.github.com/repos/${login}/${repoName}/collaborators/${adminName}`;
	},
	hooks(login, repoName) {
		return `https://api.github.com/repos/${login}/${repoName}/hooks`;
	},
};

export class Client {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	getUser() {
		return request(Paths.user(), this.accessToken);
	}

	getRepos() {
		return request(Paths.repos(), this.accessToken);
	}

	createRepo(repo) {
		return request(Paths.repos(), this.accessToken, {method: 'POST', body: repo});
	}

	addPermissions(login, repoName, adminName, permission = 'admin') {
		const collabUrl = Paths.collaborators(login, repoName, adminName);
		console.log('collabUrl:');
		console.log(collabUrl);
		return request(collabUrl, this.accessToken, {method: 'PUT', body: {permission}});
	}

	createHook(hook, login, repoName) {
		const headers = {
			'X-Hub-Signature': signHookRequest(hook, hook.config.secret),
		};
		const hooksUrl = Paths.hooks(login, repoName);
		return request(hooksUrl, this.accessToken, {headers, method: 'POST', body: hook});
	}
}

function signHookRequest(body, secret) {
	return HmacSHA1(JSON.stringify(body), secret); // eslint-disable-line new-cap
}

export default {
	request,
	Paths,
	Client,
};
