<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title>
        <!-- <h4>Route 1</h4> -->
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
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="item.currentTimeClockStatus == 0 ? 'teal' : 'grey'">schedule</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

    </v-card-text>
  </v-card>
</template>

<script>
import MiniStatistic from './widgets/statistic/MiniStatistic'
import firebase from '../plugins/firebase'

import { Projects } from '@/api/project'
export default {
  components: { MiniStatistic },
  data () {
    return {
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
      ],
      currentCrew: []
    }
  },
  computed: {
    projects () {
      return Projects
    },
  },
  async mounted () {
    const vm = this
    let employeesRef = this.$firebase.firestore().collection('employees').where('currentDevice', '==', window.localStorage.getItem('fingerprint'))
    employeesRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        vm.currentCrew.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
      })
    })
  },
  methods: {
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
