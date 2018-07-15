<template>
  <div class="chat-contact">
    <v-toolbar flat dense class="chat-contact--toolbar">
      <v-text-field flat solo full-width prepend-icon="search" label="Search"></v-text-field>
    </v-toolbar>
    <vue-perfect-scrollbar class="chat-history--scrollbar">
      <v-divider></v-divider>
      <v-list two-line class="chat-contact--list">
        <v-subheader>Contacts</v-subheader>
        <template v-for="(item, index) in users">
          <v-divider :key="index"></v-divider>
          <v-list-tile avatar :key="item.name + index" :to="contactRoute(item.id)">
            <v-list-tile-avatar color="primary">
              <img :src="item.avatar.large" v-if="item.avatar.large">
              <span v-else class="white--text headline">{{ firstLetter(item.name)}}</span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{item.name}}
              </v-list-tile-title>
              <v-list-tile-sub-title>{{item.jobTitle}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-circle dot medium :color="userStatusColor(item)"></v-circle>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
// import { getUser } from '@/api/user'
import VCircle from '@/components/circle/VCircle'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: {
    VuePerfectScrollbar,
    VCircle
  },
  data: () => ({
    users: []
  }),
  // computed: {
  //   users () {
  //     return getUser()
  //   }
  // },
  async mounted () {
    const vm = this
    let employeesRef = this.$firebase.firestore().collection('employees')
    employeesRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        vm.users.push(doc.data())
        console.log(doc.id, ' => ', doc.data().id)
      })
    })
  },
  methods: {
    contactRoute (id) {
      return '/chat/contact/' + id
    },
    firstLetter (name) {
      return name.charAt(0)
    },
    userStatusColor (item) {
      return item.currentTimeClockStatus === 0 ? 'green' : 'grey'
    }
  }
}
</script>

<style>
</style>
