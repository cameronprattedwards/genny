export function handleError(response, e) {
		console.log(e.stack);
		if (e.isUnauthorizedError) {
			response.cookie('token', '', {expires: new Date(0)});
			return response.redirect('/');
		}
		let text = `Sorry, we encountered a problem processing your request.

${e.stack}`;

		response.set('Content-Type', 'text/plain');

		response.status(e.status ? e.status : 500).send(text);
}
