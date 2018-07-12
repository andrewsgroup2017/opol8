<template>
  <div id="app">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer v-if="!mobile && !debug" class="app--drawer"></app-drawer>
        <app-toolbar v-if="!mobile && !debug" class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <bottom-nav v-if="mobile"></bottom-nav>
            <bottom-nav v-if="debug"></bottom-nav>
            <div v-if="!mobile && !debug">
              <span class="caption">{{mobile}} {{ new Date().getFullYear() }}</span>
              <v-spacer></v-spacer>
              <span class="caption mr-1"> Make With Love </span>
              <v-icon color="pink" small>favorite</v-icon>
            </div>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer class="setting-drawer" temporary right v-model="rightDrawer" hide-overlay fixed>
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar :timeout="6000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
<script>
import AppDrawer from '@/components/AppDrawer'
import BottomNav from '@/components/BottomNav'
import AppToolbar from '@/components/AppToolbar'
import AppFab from '@/components/AppFab'
import PageHeader from '@/components/PageHeader'
import menu from '@/api/menu'
import ThemeSettings from '@/components/ThemeSettings'
import AppEvents from './event'
export default {
  components: {
    AppDrawer,
    BottomNav,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),

  computed: {},
  mounted () {
    let vm = this

    this.$pubnub.subscribe({
      channels: ['general']
    })
    this.$pubnub.addListener({
      status: function (statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          // handle status
          console.log('PC connected')
        }

      },

      // message: function (message) {
      //   console.log(message.message)

      //   if (message.message.title === 'error') {
      //     console.log(message)
      //     vm.snackbar.color = 'red'
      //     vm.snackbar.text = message.message.description
      //     vm.snackbar.show = true
      //   }
      //   // console.log('New Message!', message)
      // },
      presence: function (presenceEvent) {
        // handle presence
      }
    })

    // this.fireMessage('t', 'd')
  },
  created () {
    this.pubnub.load()
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback)
    })
    window.getApp = this
  },
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    }
  }
}
</script>


<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
