<template>
  <v-container>
    <v-card v-if="deviceCurrentRoute">
      <v-toolbar card dense color="transparent">
        <v-toolbar-title>
          <!-- <h4>Route 1</h4> -->
          {{deviceCurrentRoute.name}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex class="ml-5" lg3 sm3 xs3>
          <mini-statistic icon="fa fa-truck" title="7" sub-title="Minutes Away" color="indigo">
          </mini-statistic>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex lg3 sm3 xs3>
          <mini-statistic icon="fa fa-list-ol" title="8/10+" sub-title="Tasks" color="red">
          </mini-statistic>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex class="mr-5" lg3 sm3 xs3>
          <mini-statistic icon="fa fa-check" title="0" sub-title="Alerts" color="green">
          </mini-statistic>
        </v-flex>
      </v-layout>

      <!-- <v-divider></v-divider> -->
      <v-card-text class="mt-3">
        <v-list>
          <v-list-tile v-for="item in currentCrew" :key="item.title" avatar @click="test()">
            <v-list-tile-avatar>
              <img :src="item.avatar.large">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-title v-html="deviceCurrentRoute.name"></v-list-tile-title>

            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon :color="item.currentTimeClockStatus == 0 ? 'teal' : 'grey'">schedule</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-btn class="my-5" block color="primary" to="login">Add Member</v-btn>
      </v-card-text>
    </v-card>

    <v-layout align-center justify-center row fill-height v-if="!deviceCurrentRoute">

      <v-card>
        <v-card-title>
          <v-alert :value="true" type="info">
            <h3> A route must be selected before before initial clock in. </h3>
          </v-alert>
        </v-card-title>
        <v-card-text>
          <v-select :items="selectItems" label="Please Select" v-model="routeID" item-text="name" item-value="routeID" return-object></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="setDCR(routeID)">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MiniStatistic from './widgets/statistic/MiniStatistic'
import firebase from '../plugins/firebase'

import { Projects } from '@/api/project'
export default {
  components: { MiniStatistic },
  data () {
    return {

      currentCrew: [],
      deviceCurrentRoute: {},
      selectItems: [],
      routeID: {}
    }
  },
  computed: {
    projects () {
      return Projects
    },
  },
  async mounted () {
    const vm = this
    let dcr = window.localStorage.getItem('deviceCurrentRoute')
    if (!dcr || dcr === 'undefined') {
      let smcall = this.$firebase.functions().httpsCallable('handleServiceMonster')
      smcall({ ServiceMonsterCall: { action: 'getActiveRoutes', }}).then(function (result) {
        console.log(result)
        vm.selectItems = result.data
      })
    } else {
      const p = JSON.parse(dcr)
      const p2 = {
        stuff: p.resourceTypes,
        name: p.row_number
      }
      this.deviceCurrentRoute = p2
      console.log(this.deviceCurrentRoute.name)
      console.log(dcr.resourceTypes)
    }

    let employeesRef = this.$firebase.firestore().collection('employees').where('currentDevice', '==', window.localStorage.getItem('fingerprint'))
    employeesRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        vm.currentCrew.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
      })
    })
    this.deviceCurrentRoute = window.localStorage.getItem('deviceCurrentRoute')
    if (!this.deviceCurrentRoute || this.deviceCurrentRoute === 'undefined') {
      this.deviceCurrentRoute = null
    }
  },
  methods: {
    setDCR (routeID) {
      console.log(routeID)
      this.deviceCurrentRoute = routeID
      window.localStorage.setItem('deviceCurrentRoute', JSON.stringify(routeID))
    },
    test () {
      console.log('filler')
    }
  },
}
</script>
<!--
// <template>
//   <v-card>
//     <v-toolbar card dense color="transparent">
//       <v-toolbar-title>
//         <h4>Route 1</h4>
//       </v-toolbar-title>
//       <v-spacer></v-spacer>
//     </v-toolbar>
//     <v-layout row wrap>

//       <v-flex class="ml-5" lg3 sm3 xs3>
//         <mini-statistic icon="fa fa-truck" title="7" sub-title="Minutes Away" color="indigo">
//         </mini-statistic>
//       </v-flex>
//       <v-spacer></v-spacer>
//       <v-flex lg3 sm3 xs3>
//         <mini-statistic icon="fa fa-list-ol" title="8/10+" sub-title="Tasks" color="red">
//         </mini-statistic>
//       </v-flex>
//       <v-spacer></v-spacer>
//       <v-flex class="mr-5" lg3 sm3 xs3>
//         <mini-statistic icon="fa fa-check" title="0" sub-title="Alerts" color="green">
//         </mini-statistic>
//       </v-flex>
//     </v-layout>

//     <v-card-text class="pa-0">
//       <template>

//         <v-list-tile dark v-for="item in currentCrew" :key="item.name" avatar>
//           <v-list-tile-avatar>
//             <img :src="item.avatar_url" :alt="item.name" />
//           </v-list-tile-avatar>

//           <v-list-tile-content dark>
//             <v-list-tile-title>{{ item.name }}</v-list-tile-title>
//             <v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
//           </v-list-tile-content>

//           <v-list-tile-action>
//             <v-btn icon ripple>
//               <v-icon color="grey lighten-1">info</v-icon>
//             </v-btn>
//           </v-list-tile-action>
//         </v-list-tile>
//         <!-- <v-data-table :items="currentCrew" hide-actions class="elevation-0">
//           <template slot="items" slot-scope="props">
//             <td>
//               <v-avatar class="my-1 pt-3" size="80px">
//                 <img :src="props.item.cell_phone" :alt="props.item.name" />
//               </v-avatar>
//             </td>
//             <td>{{ props.item.name }}</td>
//             <td class="text-xs-left">{{ props.item.name }}</td>

//             <td class="text-xs-right ">
//               <v-btn class="pr-4" flat icon :color="props.item.clockedIn ? 'green' : 'orange'">
//                 <v-icon>schedule</v-icon>
//               </v-btn>
//               <v-btn v-if="props.item.name" flat icon color="green">
//                 <v-icon>people</v-icon>
//               </v-btn>

//             </td>

//           </template>

//       </template>
//       <v-divider></v-divider>
//     </v-card-text>
//   </v-card>
// </template>

// <script>
// import MiniStatistic from './widgets/statistic/MiniStatistic'
// import firebase from '../plugins/firebase'
// export default {
//   components: { MiniStatistic },
//   // props: ['currentCrew'],
//   data () {
//     return {
//       currentCrew: []
//     }
//   },

//   mounted () {
//     const vm = this
//     let employeesRef = this.$firebase.firestore().collection('employees')
//     employeesRef.get().then(function (querySnapshot) {
//       querySnapshot.forEach(function (doc) {
//         vm.currentCrew.push(doc)
//         console.log(doc.id, ' => ', doc.data())
//       })
//     })
//   }
// }
// </script>
