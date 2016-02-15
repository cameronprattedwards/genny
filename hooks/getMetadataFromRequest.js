import UserService from '../domain/UserService';

export const getMetadataFromRequest = async function getMetadataFromRequest(request) {
	const hook = request.body;
	const {userId} = request.params;
	const {webhookSecret, token} = await UserService.get({id: userId});

	return {
		hook,
		userId,
		webhookSecret,
		token,
	};
};
