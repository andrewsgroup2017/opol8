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
  created () {
    if (!this.user) {
      this.$router.replace('/login')
    } else {
      this.getTimeclockStatus()
    }
  },
  methods: {
    async  getTimeclockStatus () {
      this.loading = true
      const vm = this
      let print = window.localStorage.getItem('fingerprint')
      const loc = await utils.location
      let serverClockStatus = this.$firebase.functions().httpsCallable('onTimeClockCreate')
      serverClockStatus({ TimeClock: { action: 'checkStatus', employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }}).then(function (result) {
        // Read result of the Cloud Function.
        if (result.data) {
          vm.user.clockedIn = true
        } else {
          vm.user.clockedIn = false
        }
        vm.loading = false

      })
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
