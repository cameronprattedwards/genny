import {firebaseApp} from './firebaseApp';

export function notify(token, stepId, status, error = false) {
	let child = firebaseApp.child(token).child(stepId).child(status);
	child.set(error);
	child.remove();
}
