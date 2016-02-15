import Firebase from 'firebase';

const {FIREBASE_NAME} = process.env;

const firebaseApp = new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`);

export function notify(token, stepId, status, error = false) {
	console.log('notify');
	console.log(arguments);
	let child = firebaseApp.child(token).child(stepId).child(status);
	child.set(error);
	child.remove();
}
