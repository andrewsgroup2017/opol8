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
              <v-avatar size="36px">
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
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'avatar'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Route', value: 'deadline' },
        { text: 'Progress', value: 'progress' },
        { text: '', value: 'action', align: 'right' }
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
