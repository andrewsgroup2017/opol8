<template>
  <div>
    <v-card v-if="deviceCurrentRoute">
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
    <!-- <v-dialog v-if="!deviceCurrentRoute" max-width="500px"> -->
    <v-card v-if="!deviceCurrentRoute">
      <v-card-title>
        <v-alert :value="true" type="info">
          <h3> A route must be selected before before initial clock in. </h3>
        </v-alert>
      </v-card-title>
      <v-card-text>
        <v-select :items="selectItems" label="A Select List" item-text="name" item-value="name"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
import utils from '../util/'
import firebase from '../plugins/firebase'
export default {
  props: ['user'],
  data () {
    return {
      loading: false,
      selectItems: [],
      deviceCurrentRoute: null,
      no_pic_url: 'https://d3l54fgzztlejs.cloudfront.net/app/layout/images/no_avatar.png'
    }
  },
  // computed: {
  //   dialog2 () {
  //     return (this.deviceCurrentRoute) ? true : false
  //   },

  // },
  async mounted () {
    let vm = this
    this.getDeviceRoute()
    let smcall = this.$firebase.functions().httpsCallable('handleServiceMonster')
    smcall({ ServiceMonsterCall: { action: 'getRoutes', }}).then(function (result) {
      console.log(result.data.items)
      vm.selectItems = result.data.items
    })
  },
  methods: {

    async getDeviceRoute () {
      let deviceRef = this.$firebase.firestore().collection('devices').where('fingerprint', '==', window.localStorage.getItem('fingerprint'))
      deviceRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          this.deviceCurrentRoute = doc.data().currentRoute
          console.log(doc.id, ' => ', doc.data())
        })
      })
    },
    async clock (action) {
      console.log('clocking ', action)
      const vm = this
      const location = await utils.location
      const print = window.localStorage.getItem('fingerprint')
      const _id = vm.user.id
      let loc = {
        'lat': location.lat,
        'lon': location.lon
      }
      let clockIn = this.$firebase.functions().httpsCallable('onTimeClockCreate')
      clockIn({ TimeClock: { action: action, employeeId: this.user.id, databaseKey: this.user.databaseKey, currentDevice: print, location: loc }}).then(function (result) {
        if (result.data) {
          console.log('CLOCKED_' + action + ' and going to crewlist')
          // vm.$emit('user', null)
          vm.loading = false
          vm.$router.replace({ path: '/crews' })

        } else {
          console.log('CLOCKED_' + action + ' and going to crewlist')
          vm.loading = false
          vm.$router.replace({ path: '/login' })

        }
      })
    }

  },

}

</script>
