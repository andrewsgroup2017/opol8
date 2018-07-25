import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
import * as firebaseHelper from 'firebase-functions-helper';
const db = admin.firestore();

const timeclocksCollection = 'timeclocks';

export async function saveTimeClock(tc) {
	console.log(tc);
	let data = {};
	try {
		data = await firebaseHelper.firestore.creatNewDocument(db, timeclocksCollection, tc);
	} catch (error) {
		console.log(error);
		data = error;
	}
	console.log(data);
	return data;
}
