<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title>
        <h4>Crews</h4>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="projects" hide-actions class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>
              <v-avatar size="52px">
                <img :src="props.item.avatar" :alt="props.item.name" />
              </v-avatar>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.deadline }}</td>
            <td class="text-xs-left">
              <v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear>
            </td>

            <td class="text-xs-right">
              <!-- <v-btn flat icon :color="props.item.clockedIn ? 'green' : 'orange'"> -->
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
import { Projects } from '@/api/project'
export default {
  data () {
    return {
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
      ]
    }
  },
  computed: {
    projects () {
      return Projects
    }
  }
}
</script>
