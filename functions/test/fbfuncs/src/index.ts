import * as functions from 'firebase-functions';
import * as db from './firestore';
// import * as fetch from './timeclocks/fetch';
// import * as timeclocks from './timeclocks/timeclocks';
// import TimeClock from './timeclocks/TimeClock';

exports.submitTimeClock = functions.https.onRequest((req, res) => {
	console.log(req.body);
	async function submitTC(req) {
		// var tc = new TimeClock(req.body.id);
		try {
			let now = new Date();
			var tc = {
				employee_id: req.body.id,
				dept: req.body.dept,
				status: req.body.status,
				created: now.toString(),
				in_timestamp: now.toString()
			};
			return tc;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	var _tc = submitTC(req);

	res.send(db.saveTimeClock(_tc));
});

// exports.addTimeClock = functions.https.onRequest((req, res) => {
// 	const id = req.body.id;

// 	if (!(typeof id === 'string') || id.length === 0) {
// 		// Throwing an HttpsError so that the client gets the error details.
// 		throw new functions.https.HttpsError(
// 			'invalid-argument',
// 			'The function must be called with ' + 'one arguments "text" containing the message text to add.'
// 		);
// 	}

// 	if (!context.auth) {
// 		throw new functions.https.HttpsError(
// 			'failed-precondition',
// 			'The function must be called ' + 'while authenticated.'
// 		);
// 	}
// 	async function setup() {
// 		const result = await timeclocks.addTimeClock(data);
// 		return result;
// 	}
// 	return setup();
// });

// const app = express()
// const main = express()

// main.use('/api/v1', app)
// main.use(bodyParser.json())
// main.use(bodyParser.urlencoded({ extended: false }))

// export const webApi = functions.https.onRequest(main)

// Add new Timeclock
// app.post('/timeclocks', (req, res) => {
//   async function fetchUsers(res) {
//     // const token = await fetch.fetchToken()
//     const htc = await fetch.clockIn(req.body.token)
//     const timeclock = timeclockGenerate(htc)
//     const result = await db.saveTimeClock(timeclock)

//     res.send('Create a new Timeclock', timeclock)
//   }
// })
// Update new Timeclock
// app.patch('/timeclocks/:timeclockId', (req, res) => {
//   firebaseHelper.firestore.updateDocument(
//     db,
//     timeclocksCollection,
//     req.params.timeclockId,
//     req.body
//   )
//   res.send('Update a new Timeclock')
// })

// // View a Timeclock
// app.get('/timeclocks/:timeclockId', (req, res) => {
//   firebaseHelper.firestore
//     .getDocument(db, timeclocksCollection, req.params.timeclockId)
//     .then(doc => res.status(200).send(doc))
// })

// // View all timeclocks
// app.get('/timeclocks', (req, res) => {
//   firebaseHelper.firestore
//     .backup(db, timeclocksCollection)
//     .then(data => res.status(200).send(data))
// })

// // Delete a Timeclock
// app.delete('/timeclocks/:timeclockId', (req, res) => {
//   firebaseHelper.firestore.deleteDocument(
//     db,
//     timeclocksCollection,
//     req.params.timeclockId
//   )
//   res.send('Timeclock is deleted')
// })
