import firebase from '../plugins/firebase'
const db = firebase.firestore()

const state = {
  all: [],
  crews: [],
  allIds: [],
  employees: [],
  profile: null,
}

const mutations = {
  SET_CREWMEMBER (state, {
    crewMember
  }) {
    const now = new Date()
    // state.all = {
    //   ...state.all,
    //   [crewMember.id]: {
    //     userId: crewMember.data().userId,
    //     deviceId: crewMember.data().deviceId,
    //     uid: crewMember.data().userkey,
    //     key: crewMember.data().id,
    //     photoURL: crewMember.data().photoURL,
    //     userUID: crewMember.data().userUID,
    //     lead: crewMember.data().lead,
    //     createdAt: now.toString(),
    //     online: true,
    //     clockedIn: false,
    //   },
    // }
    let cm = {
      userId: crewMember.data().userId,
      deviceId: crewMember.data().deviceId,
      uid: crewMember.data().userkey,
      key: crewMember.data().id,
      photoURL: crewMember.data().photoURL,
      userUID: crewMember.data().userUID,
      lead: crewMember.data().lead,
      createdAt: now.toString(),
      online: true,
      clockedIn: false
    }
    state.all.push(cm)
    state.allIds.push(crewMember.id)
  },
  SET_EMPLOYEE (state, {
    employee
  }) {
    state.employees = {
      ...state.employees,
      [employee.id]: {
        userId: employee.data().userUID,
        id: employee.data().userUID,
        phone: employee.data().cell_phone,
        email: employee.data().email,
        last_active: employee.data().last_active,
        photoURL: employee.data().photoURL,
        userUID: employee.data().userUID,
        online: true,
        clockedIn: false
      }
    }
    state.allIds.push(employee.id)
  },
  SET_PROFILE (state, {
    profile
  }) {
    console.log(profile.data())
    state.profile = profile.data()
    // state.profile = {
    //   userId: profile.data().userId,
    //   photoURL: profile.data().avatar.large,
    //   name: profile.data().name,
    //   userUID: profile.data().id,
    //   phone: profile.data().cell_phone,
    //   email: profile.data().email,
    //   last_active: profile.data().last_active,
    //   online: true,

    // }
  }
}

const actions = {
  async getCrewMembers ({
    commit
  }, deviceId) {
    let crewRef = db.collection('deviceStatus/' + deviceId + '/userList')
    let crews = await crewRef.get()
    crews.forEach(crewMember => {
      commit('SET_CREWMEMBER', {
        crewMember
      })
    })
  },

  async getEmloyees ({
    commit
  }) {
    let empRef = db.collection('employees/')
    let employees = await empRef.get()
    employees.forEach(employee => {
      commit('SET_EMPLOYEE', {
        employee
      })
    })
  },

  async setProfile ({
    commit
  }, profile) {
    commit('SET_PROFILE', {
      profile
    })
  },

  async addCrewmember ({
    commit
  }) {
    // let crewRef = rootState.db.collection('crews')
    let crewRef = db.collection('crews')
    let crews = await crewRef.get()
    // console.log(crewMember)
    crews.forEach(crewMember =>
      commit('SET_CREWMEMBER', {
        crewMember
      })
    )
  }
}

const getters = {
  profile: state => state.profile,
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}