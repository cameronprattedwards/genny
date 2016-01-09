import fetch from 'isomorphic-fetch';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import qs from 'qs';
import {UnauthorizedError} from './errors';

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

	let json = await response.json();
	if (response.status === 401) {
		throw new UnauthorizedError(json.message);
	}
	return json;
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
	emails() {
		return 'https://api.github.com/user/emails';
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

	getEmails() {
		return request(Paths.emails(), this.accessToken);
	}

	createRepo(repo) {
		return request(Paths.repos(), this.accessToken, {method: 'POST', body: repo});
	}

	addPermissions(login, repoName, adminName, permission = 'admin') {
		const collabUrl = Paths.collaborators(login, repoName, adminName);
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
	return getHookSignature(JSON.stringify(body), secret);
}

export function getHookSignature(string, key) {
	return HmacSHA1(string, key); // eslint-disable-line new-cap
}

export const getRawFile = async function getRawFile(hook, branchName, fileName) {
	let {
		sender: {login},
		repository: {name},
	} = hook;

	let docUrl = `https://raw.githubusercontent.com/${login}/${name}/${branchName}/${fileName}`;
	let markupResponse = await fetch(docUrl);
	return markupResponse.text();
};

export default {
	request,
	Paths,
	Client,
};
