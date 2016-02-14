const {FIREBASE_NAME} = process.env;

export const firebaseApp = new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`);
