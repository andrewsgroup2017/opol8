export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const SET_USER = 'SET_USER'
export const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'
export const LOGOUT = 'LOGOUT'
export const SET_USERLIST = 'SET_USERLIST'
import firebase from '../plugins/firebase'
const deviceId = window.localStorage.getItem('deviceId')

const state = {
  message: {
    visible: false,
    text: '',
    icon: '',
    color: ''
  },
  user: null,
  isLoggedIn: false,
  userList: []
}

// getters
const getters = {
  message: state => state.message,
  user: state => state.user,
  userList: state => state.userList
}
const mutations = {
  [SET_USERLIST] (state, deviceId) {
    /* eslint-disable-next-line */
    var ul = state.userList
    console.log('setting userlist', ul)
    firebase
      .firestore()
      .collection('deviceStatus/' + deviceId + '/userList/')
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot)

        querySnapshot.forEach(function (doc) {
          firebase
            .firestore()
            .collection('employees/')
            .doc(doc.data().userkey)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                ul.push(doc.data())
                console.log('Document data:', doc.data())
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
              }
            })
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  },
  [LOGOUT] (state, member) {
    /* eslint-disable-next-line */
    // firebase.auth().signOut().then(function() {
    console.log('logging out ', member)
    firebase
      .firestore()
      .collection('crews/' + deviceId + '/members')
      .doc(member['.key'])
      .delete()
    // if(firebase.firestore().collection('crews/'+ deviceId +'/members').length < 1){
    //   state.user = null,
    //   state.isLoggedIn = false,
    //   state.userList = []
    // }else{
    //   commit(SET_USERLIST)
    // }
    /* eslint-disable-next-line */
    // }, function(error) {
    //   // An error happened.
    //   console.log(error)
    // });
  },
  [SHOW_MESSAGE] (state, message) {
    /* eslint-disable-next-line */
    message.visible = true
    state.message = message
  },
  [SET_USER] (state, user) {
    /* eslint-disable-next-line */
    state.user = user
  },
  [SET_ISLOGGEDIN] (state, bool) {
    /* eslint-disable-next-line */
    state.isLoggedIn = bool
  }
}

const actions = {
  logout ({ commit }, member) {
    commit(LOGOUT, member)
  },
  showMessage ({ commit }, message) {
    commit(SHOW_MESSAGE, message)
  },
  addMembers ({ commit }, deviceId) {
    commit(SET_USERLIST, deviceId)
  },
  setUser ({ commit }, user) {
    if (user) {
      commit(SET_ISLOGGEDIN, true)
      commit(SET_USER, user)
      console.log(user.uid)
      let myConnectionsRef = firebase
        .database()
        .ref('users/connections/' + user.uid)
      let lastOnlineRef = firebase
        .database()
        .ref('users/lastOnline/' + user.uid)

      let connectedRef = firebase.database().ref('.info/connected')
      connectedRef.on('value', function (snap) {
        if (snap.val() === true) {
          let con = myConnectionsRef.push()
          con.onDisconnect().remove()
          con.set(true)
          lastOnlineRef
            .onDisconnect()
            .set(firebase.database.ServerValue.TIMESTAMP)
        }
      })
    } else {
      commit(SET_ISLOGGEDIN, false)
      commit(SET_USER, user)
    }
  }
}

// mutations

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
