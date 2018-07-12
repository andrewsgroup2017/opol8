
<template>
  <div class="develop">
    <v-btn @click="test()">
    </v-btn>
  </div>
</template>
<script>
import firebase from '../plugins/firebase'
export default {
  name: 'Develop',
  data () {
    return {
    }
  },
  methods: {
    async test () {
      let user = firebase.auth().currentUser

      if (user) {
        console.log(user.uid)
      } else {
        // No user is signed in.
      }
      // console.log(window.localStorage.getItem('deviceId'))

      this.axios.post('http://localhost:3000/timeclocks', { TimeClock: { action: 'clockIn', employeeId: 666, currentDevice: user.uid }})
      // this.$store.state.people.profile.email
      // let clockedStatus = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity', { email: 'test@groupandrews.com' }).then(result => {
      //   return result.data.user.clockedIn
      // })
      // console.log(clockedStatus)

    }
  }
}
</script>