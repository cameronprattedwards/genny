export function getBranchNameFromHook(hook) {
	const [, branchName] = /refs\/heads\/(.*)/.exec(hook.ref);
	return branchName;
}
