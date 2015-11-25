import github from '../utils/github';
import webhookPaths from '../hooks/paths';
import randomstring from 'randomstring';

export const BASE_REPO_NAME = 'genny-test';
export const GITHUB_ADMIN = 'cameronprattedwards';

export class RepoService {
	constructor(accessToken, user) {
		this.githubClient = new github.Client(accessToken);
		this.user = user;
	}

	async create() {
		const {id, login} = this.user;
		const repos = await this.githubClient.getRepos();
		const repoName = getRepoName(repos);
		const repo = {
			name: repoName,
			description: 'This is your Genny repository',
		};

		await this.githubClient.createRepo(repo);
		await this.githubClient.addPermissions(login, repoName, GITHUB_ADMIN);
		const hookUrl = webhookPaths.reversePath(webhookPaths.Paths.HOOK, true, {userId: id});
		const webhookSecret = randomstring.generate({ length: 32 });
		const hook = {
			name: 'web',
			events: ['push', 'pull_request'],
			config: {
				url: hookUrl,
				'content_type': 'json',
				secret: webhookSecret,
			},
			active: true,
		};

		await this.githubClient.createHook(hook, login, repoName);

		return {repoName, webhookSecret};
	}
}

function getRepoName(repos) {
	let repoName = BASE_REPO_NAME;
	let counter = 1;

	for (let i = 0; i < repos.length; i++) {
		const {name} = repos[i];
		if (name === repoName) {
			repoName = `${BASE_REPO_NAME}-${counter}`;
			counter++;
		} else if (name[0] > BASE_REPO_NAME[0]) {
			break;
		}
	}

	return repoName;
}
