import { match, RoutingContext } from 'react-router';

export function matchRoutes({routes, location}) {
	return new Promise((resolve, reject) => {
		match({routes, location}, (error, redirectLocation, renderProps) => {
			if (error) {
				reject(error);
			} else {
				resolve([redirectLocation, renderProps]);
			}
		});
	});
}
