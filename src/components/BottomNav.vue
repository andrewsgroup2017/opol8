<template>
  <v-footer flat dense dark style="max-height: 74px;" app>
    <v-toolbar color="primary" dark>
      <!-- <v-btn v-if="user" icon>
      <v-avatar size="56px" >
        <img :src="user.photoURL">
      </v-avatar>
    </v-btn> -->
      <v-btn flat to="/develop">
        Develop
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-divider vertical></v-divider>
        <v-btn flat to="/schedule">
          Schedule
        </v-btn>
        <v-btn flat to="/crews">
          crewlist
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn flat to="/coms">
          Coms
        </v-btn>

        <v-divider vertical></v-divider>
      </v-toolbar-items>
      <!-- <v-bottom-nav :value="true" dark app>
      <v-btn v-if="user" to="/profile">

        <v-avatar

          size="46px"
        >
     <img :src="user.photoURL">
        </v-avatar>
      </v-btn>
      <v-btn flat to="/">
        <span>Schedule</span>
        <v-icon>schedule</v-icon>
      </v-btn>
      <v-btn flat to="/crewlist">
        <span>Crew</span>
        <v-icon>people</v-icon>
      </v-btn>
    </v-bottom-nav> -->
    </v-toolbar>
  </v-footer>
</template>

<script>
// import { Plugins } from '@capacitor/core'
// const { Geolocation } = Plugins
import { mapGetters } from 'vuex'
export default {
  name: 'BottomNav',
  computed: {
    ...mapGetters({
      user: 'common/user'
    }),
  }
}
</script>

<style>
.bottomtoolbar {
  /* background-color: #41b883 !important; */
  /* bottom: 0; */
}
.theme--dark .bottom-nav,
.application .theme--dark.bottom-nav {
  /* background-color: #41b883; */
}
.v-avatar {
  padding-bottom: 20px;
}
</style>