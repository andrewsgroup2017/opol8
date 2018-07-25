
let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value) }).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
Object.defineProperty(exports, '__esModule', { value: true })
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const firebaseHelper = require('firebase-functions-helper')
const db = admin.firestore()
const timeclocksCollection = 'timeclocks'
function saveTimeClock (tc) {
  return __awaiter(this, void 0, void 0, function* () {
    console.log(tc)
    let data = ''
    try {
      data = yield firebaseHelper.firestore.creatNewDocument(db, timeclocksCollection, tc)
    }
    catch (error) {
      console.log(error)
      data = error
    }
    console.log(data)
    return data
  })
}
exports.saveTimeClock = saveTimeClock
// # sourceMappingURL=firestore.js.map