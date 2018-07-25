<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 lg6>
            <v-card class="elevation-1 pa-3">
              <div v-if="showScanner" class="layout column align-center">
                <!-- <qrcode-reader @init="onInit"></qrcode-reader> -->
                <qrcode-reader @decode="onDecode"></qrcode-reader>
              </div>
              <v-card-actions>
                <v-btn v-if="!showScanner" block color="primary" @click="scan()" :loading="loading">Scan</v-btn>
                <v-btn v-if="showScanner" block color="primary" @click="stop()" :loading="loading">Stop</v-btn>
                <b>{{paused}}</b>
                <v-btn v-if="debug" block color="primary" @click="onDecode('1444044')" :loading="loading">Decode</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { QrcodeReader } from 'vue-qrcode-reader'


export default {
  name: 'Login',
  components: { QrcodeReader },
  data: () => ({
    showScanner: false,
    loading: false,
    paused: true,
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
    },
    scan () {
      this.paused = false
      this.showScanner = true
    },
    stop () {
      this.paused = true
      this.showScanner = false
    },
    async onDecode (decodedString) {
      const vm = this
      this.showScanner = false
      this.paused = true
      let employees = await vm.$firebase.firestore().collection('employees').where('id', '==', decodedString)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data())
            vm.$store.dispatch('people/setProfile', doc)
            vm.$router.replace('user')
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })

    },
    async onInit (promise) {
      // show loading indicator

      try {
        await promise

        // successfully initialized
      } catch (error) {
        console.log(error.name)
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson

        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
      }
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
  content: '';
  z-index: 0;
}
</style>
