import 'isomorphic-fetch';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import qs from 'qs';

export const request = async function request(url, accessToken, options={}) {
	const headers = {
		'Accept': 'application/json',
	};

	if (accessToken) {
		headers['Authorization'] = 'Token ' + accessToken;
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
}

export const Paths = {
	AUTHORIZE(params) {
		return 'https://github.com/login/oauth/authorize?' + qs.stringify(params);
	},
	ACCESS_TOKEN(params) {
		return 'https://github.com/login/oauth/access_token?' + qs.stringify(params);
	},
	USER() {
		return 'https://api.github.com/user';
	},
	REPOS() {
		return 'https://api.github.com/user/repos';
	},
	COLLABORATORS(login, repoName, adminName) { 
		return `https://api.github.com/repos/${login}/${repoName}/collaborators/${adminName}`;
	},
	HOOKS(login, repoName) {
		return `https://api.github.com/repos/${login}/${repoName}/hooks`;
	}
};

export class Client {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	getUser() {
		return request(Paths.USER(), this.accessToken);
	}

	getRepos() {
		return request(Paths.REPOS(), this.accessToken);
	}

	createRepo(repo) {
		return request(Paths.REPOS(), this.accessToken, {method: 'POST', body: repo});
	}

	addPermissions(login, repoName, adminName, permission='admin') {
		const collabUrl = Paths.COLLABORATORS(login, repoName, adminName);
		console.log('collabUrl:');
		console.log(collabUrl);
		return request(collabUrl, this.accessToken, {method: 'PUT', body: {permission}});
	}

	createHook(hook, login, repoName) {
		const headers = {
			'X-Hub-Signature': signHookRequest(hook, hook.config.secret),
		};
		const hooksUrl = Paths.HOOKS(login, repoName);
		return request(hooksUrl, this.accessToken, {headers, method: 'POST', body: hook});
	}
}

function signHookRequest(body, secret) {
	return HmacSHA1(JSON.stringify(body), secret);
}

export default {
	request,
	Paths,
	Client,
};




