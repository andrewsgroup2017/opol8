import Vue from 'vue'
import Vuex from 'vuex'
// import { messaging, geofire, firestore, fb } from './firebase'
// import auth from './auth'
import people from './people'
import storage from './storage'
import chat from './chatmodule'
// import storage from './storage'
// import hardware from './hardware'
// import people from './people'
import common from './common'
import firebase from '../plugins/firebase'

Vue.use(Vuex)
const state = {
  firebase: firebase
}
const modules = {
  common: common,
  // auth: auth,
  people: people,
  chat: chat,
  storage: storage
}

const getters = {}

const mutations = {}
const store = new Vuex.Store({
  state,
  modules,
  getters,
  mutations
})

export default store