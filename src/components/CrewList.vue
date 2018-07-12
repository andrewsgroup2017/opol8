<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title>
        <h4>Route 1</h4>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-layout row wrap>
      <!-- mini statistic start -->
      <v-flex class="ml-5" lg1 sm3 xs6>
        <mini-statistic icon="fa fa-truck" title="7" sub-title="Minutes Away" color="indigo">
        </mini-statistic>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex lg1 sm3 xs6>
        <mini-statistic icon="fa fa-list-ol" title="8/10+" sub-title="Tasks" color="red">
        </mini-statistic>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="mr-5" lg1 sm3 xs6>
        <mini-statistic icon="fa fa-check" title="0" sub-title="Alerts" color="green">
        </mini-statistic>
      </v-flex>
    </v-layout>
    <!-- <v-divider></v-divider> -->
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="currentCrew" hide-actions class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>
              <v-avatar class="my-1 pt-3" size="80px">
                <img :src="props.item.avatar" :alt="props.item.name" />
              </v-avatar>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.deadline }}</td>
            <td class="text-xs-left">
              <v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear>
            </td>

            <td class="text-xs-right ">
              <v-btn class="pr-4" flat icon :color="props.item.clockedIn ? 'green' : 'orange'">
                <v-icon>schedule</v-icon>
              </v-btn>
              <!-- <v-btn v-if="props.item.lead" flat icon color="green"> -->
              <v-icon>people</v-icon>
              </v-btn>

            </td>

          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import MiniStatistic from './widgets/statistic/MiniStatistic'
import firebase from '../plugins/firebase'
export default {
  components: { MiniStatistic },
  data () {
    return {
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'avatar',

        },
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        { text: 'Route', value: 'deadline' },
        { text: 'Progress', value: 'progress' },
        { text: '', value: 'action', align: 'right' }
      ],
      currentCrew: []
    }
  },
  firestore () {
    return {
      // Collection
      currentCrew: firebase.firestore().collection('employees').where("currentDevice", "==", this.deviceId),
      // // Doc
      // ford: firestore.collection('cars').doc('ford')
    }
  }
}
</script>
