import createBrowserHistory from 'history/lib/createBrowserHistory';

export let history = createBrowserHistory();

function getInitialLocation() {
	return new Promise((resolve) => {
		let unlisten = history.listen(location => {
			resolve(location);
		});
		unlisten();
	});
}			

export function goToCurrentStep(state) {
	getInitialLocation().then(location => {
		if (typeof state.user.get('currentStep') !== 'undefined' && location.pathname === '/') {
			const currentStep = state.user.get('currentStep');
			let step = state.db.getIn(['steps', currentStep.toString()]);
			let route = `/step/${step.get('branchName')}`;
			history.replaceState(null, route);
		}
	});
}
