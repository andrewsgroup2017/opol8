<template>
  <div id="crews">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md12 lg8>
          <crewlist></crewlist>
          <v-btn class="my-5" block color="primary" to="login">Add Member</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CrewList from '../components/CrewList'
import firebase from '../plugins/firebase'
export default {
  name: 'Crews',
  components: {
    crewlist: CrewList,
  },
  data: () => ({
    loading: false,
    // currentCrew: [],
    deviceId: {}

  }),
  mounted () {
    const vm = this
    // this.deviceId = window.localStorage.getItem('fingerprint')
    // let employeesRef = this.$firebase.firestore().collection('employees').where('currentDevice', '==', window.localStorage.getItem('fingerprint'))
    let docRef = this.$firebase.firestore().collection('devices').doc(window.localStorage.getItem('fingerprint'))

    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }).catch(function (error) {
      console.log('Error getting document:', error)
    })
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 1000)
    }
  },
  // firestore () {
  //   return {
  //     // Collection
  //     // currentCrew: firebase.firestore().collection('employees').where('currentDevice', '==', this.deviceId),
  //     currentCrew: firebase.firestore().collection('employees')
  //     // // Doc
  //     // ford: firestore.collection('cars').doc('ford')
  //   }
  // },
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
