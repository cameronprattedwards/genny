export function errorSerializer(error) {
	return {
		...error,
		errorType: error.constructor.name,
		message: error.message,
	};
}
