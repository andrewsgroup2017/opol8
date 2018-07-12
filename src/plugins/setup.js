import Vue from 'vue'
import Notifications from 'vue-notification'
import VueFirestore from 'vue-firestore'
import firebase from './firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Fingerprint2 from 'fingerprintjs2'
Vue.use(VueAxios, axios)
Vue.use(VueFirestore)
Vue.prototype.$firebase = firebase
Vue.use(Notifications)
Vue.use(require('vue-pubnub'), {
  subscribeKey: 'sub-c-6c0fa8d2-850d-11e8-ac0f-0e4b9865ddaa',
  publishKey: 'pub-c-74b5b283-b890-42c5-96ad-5013b1c7c906',
  logVerbosity: false,
  ssl: true,
  presenceTimeout: 130
})
let fp = window.localStorage.getItem('fingerprint')
const w = window
async function setFP () {
  fp = await new Fingerprint2().get(function (result, components) {
    console.log(result)
    let email = result + '@gmail.com'
    firebase.auth().signInWithEmailAndPassword(email, 'asdfasdf').catch(function (error) {
      console.log(error)
    })
    w.localStorage.setItem('fingerprint', result.toString()) // a
  })
}


if (!fp || fp === 'undefined') {
  setFP()
}

Vue.mixin({
  data () {
    return {
      fingerprint: fp,
    }
  },
  methods: {
    fireMessage: function (title, description) {
      let msg = {
        title: title,
        description: description
      }
      msg.title = title

      this.$pubnub.publish({
        message: {
          title: title,
          description: description
        },
        channel: 'general',
        sendByPost: false, // true to send via post
        storeInHistory: false, // override default storage options
        meta: {
          'cool': 'meta'
        } // publish extra meta with the request
      },
      function (status, response) {
        if (status.error) {
          // handle error
          console.log(status)
        } else {
          console.log('message ' + msg + ' Published w/ timetoken', response.timetoken)
        }
      }
      )

    },
    fireNotify: function (msg, group, type) {
      this.$notify({
        group: group || 'all',
        title: 'Authentication',
        type: type || '',
        text: msg || '',
        width: '100%'
      })
    }
  }
})