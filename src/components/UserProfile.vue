<template>
  <v-card>
    <v-card-media :src="user.avatar.large || no_pic_url" height="300">
      <v-layout column class="media ma-0" v-show="!loading">
        <v-card-title>
          <div>
            <!-- <v-icon>chevron_left</v-icon> -->
          </div>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn dark icon class="mr-3">
            <v-icon>edit</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon :color="user.clockedIn ? 'green' : 'orange'">schedule</v-icon>

          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{user.name}}</div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{user.cell_phone}}</v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <!-- <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>(903) 566-3068</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile> -->
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{user.email}}</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action>

          <v-btn v-if="!user.clockedIn" class="ml-4" block color="green" @click="clockIn()">Clock In</v-btn>
          <v-btn v-if="user.clockedIn" class="ml-4" block color="warning" @click="clockOut()">Clock Out</v-btn>

        </v-list-tile-action>
        <!-- <v-list-tile-action>
          <v-btn class="pa-3 " block color="primary" to="login">Add Member</v-btn>
        </v-list-tile-action> -->
      </v-list-tile>
      <!-- <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>1400 Main Street</v-list-tile-title>
          <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile> -->
    </v-list>
  </v-card>
</template>

<script>
import utils from '../util/'
import firebase from '../plugins/firebase'
export default {
  props: ['user'],
  data () {
    return {
      loading: false,
      no_pic_url: 'https://d3l54fgzztlejs.cloudfront.net/app/layout/images/no_avatar.png'
    }
  },
  methods: {
    async clockIn () {
      console.log('clocking in ...')
      const vm = this
      const location = await utils.location
      const print = window.localStorage.getItem('fingerprint')
      const _id = vm.user.id
      let loc = {
        'lat': location.lat,
        'lon': location.lon
      }
      let clockIn = this.$firebase.functions().httpsCallable('onTimeClockCreate')
      clockIn({ TimeClock: { action: 'clockIn', employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }}).then(function (result) {
        if (result.data) {
          console.log('CLOCKED_IN and going to crewlist')
          // vm.$emit('user', null)
          vm.loading = false
          vm.$router.replace({ path: '/crews' })

        } else {
          // this.fireNotify('error', 'Server Error')
          // vm.$emit(vm.user, null)
          vm.loading = false
          vm.$router.replace({ path: '/login' })

        }
      })
    },
    async clockOut () {
      console.log('clocking out ...')
      const vm = this
      const location = await utils.location
      const print = window.localStorage.getItem('fingerprint')
      const _id = vm.user.userUID
      let loc = {
        'lat': location.lat,
        'lon': location.lon
      }
      let clockOut = this.$firebase.functions().httpsCallable('onTimeClockCreate')
      clockOut({ TimeClock: { action: 'clockOut', currentTimeClock: this.user.currentTimeClock, employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }}).then(function (result) {
        if (result.data) {
          console.log('CLOCKED_OUT and going to crewlist')
          vm.loading = false
          vm.$router.replace({ path: '/crews' })

        } else {
          console.log('ERROR and going to login')
          vm.loading = false
          vm.$router.replace({ path: '/login' })

        }
      })
    }
  }
}

</script>
