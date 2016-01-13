export function getOs(userAgentString) {
	if (userAgentString.indexOf('Windows') !== -1) {
		return 'Win';
	} else {
		return 'Mac';
	}
}
