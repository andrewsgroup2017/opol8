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
      // const deviceId = window.localStorage.getItem('deviceId')
      // const lat = window.localStorage.getItem('deviceInfo').lat
      // const lon = window.localStorage.getItem('deviceInfo').lon
      const location = await utils.location
      const print = window.localStorage.getItem('fingerprint')
      const _id = vm.user.id
       let htc = await vm.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockin', { id: _id })
      // if (htc.status === 13) {
      //   console.log('employee already logged in')
      //   return
      // }
      // if (htc) {
      let loc = {
        'lat': location.lat,
        'lon': location.lon
      }
      // const TimeClock = {
      //   employeeId: _id,
      //   action: 'clockIn',
      //   currentDevice: deviceId,
      //   databaseKey: this.user.databaseKey,
      //   location: loc,
      //   print: print,
      //   // createdAt: d.toString(),
      //   // startTime: d.toString(),
      // }
      let serverClockStatus = await this.axios.post('http://localhost:3000/timeclocks', { TimeClock: { action: 'clockIn', employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }})
      // }
      //   const d = new Date()
      // console.log(itimeclock.data)
      /* eslint-disable-next-line */
      // htc.currentDevice = deviceId,
      // htc.location = loc,
      // htc.print = print,
      // htc.createdAt = d.toString()
      // itimeclock.createdAt = this.firebase.firestore().FieldValue.serverTimestamp()
      // firebase.firestore().collection('timeclocks').set({
      //   employeeId: _id,
      //   currentDevice: deviceId,
      //   location: loc,
      //   print: print,
      //   createdAt: d.toString(),
      //   startTime: d.toString(),
      // }).then(result => {
      //   console.log(result)
      // })
      // console.log(vm.user.userUID)

      // let docRef = firebase.firestore().collection('employees').doc(vm.user.userUID)
      // docRef.update({
      //   currentDevice: deviceId,
      //   location: {
      //     'lat': location.lat,
      //     'lon': location.lon
      //   },
      //   print: print,
      //   updatedAt: firebase.firestore().FieldValue.serverTimestamp()
      // })
      // } else {
      //   console.log('error ')
      // }
    },
    async clockOut () {
      console.log('clocking out ...')
      const vm = this
      const location = await utils.location
      const print = window.localStorage.getItem('fingerprint')
      const _id = vm.user.userUID
       let otimeclock = await vm.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockout', vm.user.id)
      // if (otimeclock) {
      //   console.log(vm.user.id)
      //   let docRef = vm.$firebase.firestore().collection('timeclocks').where('userId', '==', vm.user.userUID).where('status', '==', 0)
      //   docRef.get().then(function (doc) {
      //     if (doc.exists) {
      //       console.log('Document data:', doc.data())
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log('No such document!')
      //     }
      //   }).catch(function (error) {
      //     console.log('Error getting document:', error)
      //   })
      // } else {
      //   console.log(otimeclock)
      // }
      let loc = {
        'lat': location.lat,
        'lon': location.lon
      }

      let serverClockOut = await this.axios.post('http://localhost:3000/timeclocks', { TimeClock: { action: 'clockOut', employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc, currentTimeClock: this.user.currentTimeClock }})
      // async clockIn () {
      //   console.log('clocking in ...')
      //   this.loading = true
      //   let itemclock_humanity = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockIn', { id: this.user.id })
      //   let itemclock = await this.$firestore.collection('timeclocks').add(itemclock_humanity)
      //   this.loading = false
      //   console.log('Document successfully updated!')
      // },
      // async  clockOut () {
      //   this.loading = true
      //   let otimeclock = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockIn', { id: this.user.id })
      //   console.log(otimeclock)
      //   let deviceInfo = window.localStorage.getItem('deviceInfo')
      //   let oclock = await this.$firestore.collection('users').doc(otimeclock).update({
      //     'location': { lat: deviceInfo.lat, lng: deviceInfo.lng },
      //     'fingerprint': deviceInfo.fingerprint,
      //     'out_servertime': this.$firestore.firestore.FieldValue.serverTimestamp(),
      //     'updatedAt': this.$firestore.firestore.FieldValue.serverTimestamp()
      //   })
      //   this.loading = false
      //   console.log('Document successfully updated!')


      // },
    }
  }
}

</script>
