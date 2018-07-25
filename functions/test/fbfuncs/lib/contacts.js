
Object.defineProperty(exports, '__esModule', { value: true })
const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const firebaseHelper = require('firebase-functions-helper')
const db = admin.firestore()
const timeclocksCollection = 'timeclocks'
const app = express()
const main = express()
main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))
exports.webApi = functions.https.onRequest(main)
const contactsCollection = 'contacts'
// Add new contact
app.post('/contacts', (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, contactsCollection, req.body)
  res.send('Create a new contact')
})
// Update new contact
app.patch('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore.updateDocument(db, contactsCollection, req.params.contactId, req.body)
  res.send('Update a new contact')
})
// View a contact
app.get('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, contactsCollection, req.params.contactId)
    .then(doc => res.status(200).send(doc))
})
// View all contacts
app.get('/contacts', (req, res) => {
  firebaseHelper.firestore
    .backup(db, contactsCollection)
    .then(data => res.status(200).send(data))
})
// Delete a contact
app.delete('/contacts/:contactId', (req, res) => {
  firebaseHelper.firestore.deleteDocument(db, contactsCollection, req.params.contactId)
  res.send('Contact is deleted')
})
// # sourceMappingURL=contacts.js.map