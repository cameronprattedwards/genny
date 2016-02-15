export function userIsLost(request, token) {
	return !token && request.path !== '/' && request.path.indexOf('setup') === -1;
}
