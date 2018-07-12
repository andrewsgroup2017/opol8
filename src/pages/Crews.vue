<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12 lg8>
            <crewlist></crewlist>
            <v-btn class="my-5" block color="primary" to="login">Add Member</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CrewList from '../components/CrewList'

export default {
  name: 'Crews',
  components: {
    crewlist: CrewList,

  },
  data: () => ({
    loading: false,
    model: {
      username: 'admin@isockde.com',
      password: 'password'
    }
  }),

  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 1000)
    }
  }
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
