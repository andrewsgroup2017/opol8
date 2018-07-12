import {
  firebase
} from '@firebase/app'
import '@firebase/firestore'
import '@firebase/storage'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/functions'
import '@firebase/messaging'

firebase.initializeApp({
  apiKey: 'AIzaSyCBcvJvSl24XC-f1O23N42bgjdMcZwJrnA',
  authDomain: 'opol7dev.firebaseapp.com',
  databaseURL: 'https://opol7dev.firebaseio.com',
  projectId: 'opol7dev',
  storageBucket: 'opol7dev.appspot.com',
  messagingSenderId: '1099037767188'
})
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   "BDCeCJxRkeGaGOK13G1WXwnE7tx7DpyFd1stslPEEFEFrHud28g1Nfgb0BhNEluUs55gpUYMofAwnt2HBjI0eR0"
// );
// messaging
//   .requestPermission()
//   .then(function() {
//     console.log("Notification permission granted.");
//     // TODO(developer): Retrieve an Instance ID token for use with FCM.
//     // ...
//   })
//   .catch(function(err) {
//     console.log("Unable to get permission to notify.", err);
//   });

const settings = { /* your settings... */
  timestampsInSnapshots: true
}
firebase.firestore().settings(settings)

// export const hardwares = firebase.firestore().collection('hardwares')
// export var storage = firebase.storage()
export default firebase