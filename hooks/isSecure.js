import {getHookSignature} from '../utils/github';

export function isSecure(hook, webhookSecret, request) {
	const calculatedSignature = getHookSignature(JSON.stringify(hook), webhookSecret).toString();
	return request.get('X-Hub-Signature') === `sha1=${calculatedSignature}`;
}
