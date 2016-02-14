import {RepoService} from '../../domain/RepoService';

export function makeRepo(accessToken, id, login) {
	const repoService = new RepoService(accessToken, {id, login});
	return repoService.create();
};
