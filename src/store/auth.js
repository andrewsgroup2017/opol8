import { auth } from '../plugins/firebase'
export const LOGOUT = 'LOGOUT'

// setup auth
// const auth = firebase.auth()

// catch error
const error = ''

export default {
  namespaced: true,
  state: {
    auth: auth,
    error: error
  },
  mutations: {
    /* eslint-disable-next-line */
    [LOGOUT](state) {

    },
    login (state, user) {
      const promis = state.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      )
      promis
        .then(userResult => {
          user.result(userResult)
        })
        .catch(error => {
          state.error = error.message
          user.error(error)
        })
    },
    signInGoogle (state, callBack) {
      let provider = state.googleAuthProvider
      state.auth
        .signInWithPopup(provider)
        .then(result => {
          callBack.result(result)
        })
        .catch(error => {
          callBack.error(error)
        })
    },
    signInFacebook (state, callBack) {
      let provider = state.facebookAuthProvider
      state.auth
        .signInWithPopup(provider)
        .then(result => {
          callBack.result(result)
        })
        .catch(error => {
          callBack.error(error)
        })
    },
    signInTwitter (state, callBack) {
      let provider = state.twitterAuthProvider
      state.auth
        .signInWithPopup(provider)
        .then(result => {
          callBack.result(result)
        })
        .catch(error => {
          callBack.error(error)
        })
    },
    signInGithub (state, callBack) {
      let provider = state.githubAuthProvider
      state.auth
        .signInWithPopup(provider)
        .then(result => {
          callBack.result(result)
        })
        .catch(error => {
          callBack.error(error)
        })
    },
    register (state, user) {
      const promis = state.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      )
      promis
        .then(userResult => {
          console.log('from Vuex : Done : ' + user.email)
          user.result(userResult)
        })
        .catch(error => {
          state.error = error.message
          user.error(error)
        })
    },
    updateProfilePicture (state, image) {
      state.auth.currentUser
        .updateProfile({
          photoURL: image.ref
        })
        .then(() => {
          image.result()
        })
        .catch(error => {
          image.error(error)
        })
    },
    stateChanged (state, callBack) {
      state.auth.onAuthStateChanged(user => {
        if (user) {
          callBack.then(user)
        } else {
          callBack.catch()
        }
      })
    }
  },
  getters: {},
  actions: {
    logout ({ commit }) {
      commit(LOGOUT)
    }
  }
}
