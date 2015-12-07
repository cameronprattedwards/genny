export class NotFoundError extends Error {
	constructor(...args) {
		super(...args);
		this.status = 404;
	}
}

export class UnauthorizedError extends Error {
	constructor(...args) {
		super(...args);
		this.status = 401;
	}
}
