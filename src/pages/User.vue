<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout v-if="!loading" align-center justify-center>
          <userprofile :user="user"></userprofile>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserProfile from '../components/UserProfile'
import { mapGetters } from 'vuex'
import utils from '../util/'

export default {
  name: 'User',
  components: {
    userprofile: UserProfile
  },
  data: () => ({
    loading: true,

  }),

  computed: {
    ...mapGetters({
      user: 'people/profile'
    }),
  },
  async created () {
  },
  mounted () {
    const vm = this
    this.$pubnub.addListener({

      message: function (message) {
        console.log(message.message)

        if (message.message.description.key === 'CLOCKED_STATUS') {

          if (message.message.description.value === true) {
            console.log(message.message.description.value)
            vm.user.clockedIn = true
            vm.loading = false
          } else {
            console.log(message.message.description.value)
            vm.user.clockedIn = false
            vm.loading = false
          }

        }

        if (message.message.description.key === 'CLOCKED_IN') {
          if (message.message.description.value === true) {
            console.log('CLOCKED_IN and going to crewlist')
            vm.user.clockedIn = true
            vm.loading = false
            vm.$router.replace({ path: '/crewlist' })

          } else {
            console.log(message.message.description.value)
            // this.fireNotify('error', 'Server Error')
            vm.user = null
            vm.loading = false
            vm.$router.replace({ path: '/login' })

          }
        }

        if (message.message.description.key === 'CLOCKED_OUT') {
          if (message.message.description.value === true) {
            console.log('CLOCKED_OUT and going to crewlist')
            vm.user.clockedIn = false
            vm.loading = false
            vm.$router.replace({ path: '/crewlist' })

          } else {
            console.log(message.message.description.value)
            // this.fireMessage('error', 'Server Error')
            console.log('Server Error and going to login')
            // vm.user.clockedIn = false
            vm.loading = false
            vm.user = null
            vm.$router.replace({ path: '/login' })

          }
        }

      },
    })
    this.getTimeclockStatus()

  },
  methods: {


    async  getTimeclockStatus () {
      this.loading = true
      // console.log(this.user.id)
      // console.log(this.user.databaseKey)
      const clockedStatus = this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity', { id: this.user.id })
      // console.log('cs ', clockedStatus)
      // this.user.clockedIn = clockedStatus
      let print = window.localStorage.getItem('fingerprint')
      const loc = await utils.location
      let serverClockStatus = await this.axios.post('http://localhost:3000/timeclocks', { TimeClock: { action: 'checkStatus', employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }})

      // let serverClockedStatus = this.axios.post('http://localhost:3000/timeclocks', { TimeClock: { action: 'clockIn', employeeId: this.user.id, currentDevice: this.user.id }})

      // if (serverClockStatus === 'out') {
      //   this.user.clockedIn = false
      //   this.loading = false
      // } else {
      //   this.user.clockedIn = true
      //   this.loading = false

      // }
    }
  },

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
