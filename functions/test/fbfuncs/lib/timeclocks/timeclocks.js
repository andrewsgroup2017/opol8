
let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value) }).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
Object.defineProperty(exports, '__esModule', { value: true })
const fetch = require('./fetch')
const db = require('../firestore')
const TimeClock_1 = require('./TimeClock')
const now = new Date()
function timeClockGenerate (htc) {
  let obj = new TimeClock_1.default(htc.id);
  (obj.employee_id = htc.id),
  (obj.dept = htc.dept),
  (obj.status = htc.status),
  (obj.created = htc.created),
  (obj.in_timestamp = htc.in_timestamp)
  return obj
}
exports.timeClockGenerate = timeClockGenerate
function addTimeClock (data) {
  return __awaiter(this, void 0, void 0, function* () {
    const htc = yield fetch.clockIn(data.id, data.token)
    const tc = this.timeClockGenerate(htc)
    const result = yield db.saveTimeClock(tc)
    return result
  })
}
exports.addTimeClock = addTimeClock
//   async function fetchUsers(res) {
//     const htc = await fetch.clockIn(req.body.id, req.body.token)
//     const timeclock = this.timeclockGenerate(htc, req)
//     const result = await db.saveTimeClock(timeclock)
//     res.send('Create a new Timeclock', result)
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
// const contactsCollection = 'contacts'
// // Add new contact
// app.post('/contacts', (req, res) => {
//   firebaseHelper.firestore.creatNewDocument(db, contactsCollection, req.body)
//   res.send('Create a new contact')
// })
// // Update new contact
// app.patch('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore.updateDocument(
//     db,
//     contactsCollection,
//     req.params.contactId,
//     req.body
//   )
//   res.send('Update a new contact')
// })
// // View a contact
// app.get('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore
//     .getDocument(db, contactsCollection, req.params.contactId)
//     .then(doc => res.status(200).send(doc))
// })
// // View all contacts
// app.get('/contacts', (req, res) => {
//   firebaseHelper.firestore
//     .backup(db, contactsCollection)
//     .then(data => res.status(200).send(data))
// })
// // Delete a contact
// app.delete('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore.deleteDocument(
//     db,
//     contactsCollection,
//     req.params.contactId
//   )
//   res.send('Contact is deleted')
// })
// # sourceMappingURL=timeclocks.js.map