<template>
  <div id="app">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer v-if="!mobile && !debug" class="app--drawer"></app-drawer>
        <app-toolbar v-if="!mobile && !debug" class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <!-- <page-header v-if="$route.meta.breadcrumb"></page-header> -->
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
import Vue from 'vue'
import AppDrawer from '@/components/AppDrawer'
import BottomNav from '@/components/BottomNav'
import AppToolbar from '@/components/AppToolbar'
import AppFab from '@/components/AppFab'
import PageHeader from '@/components/PageHeader'
import menu from '@/api/menu'
import ThemeSettings from '@/components/ThemeSettings'
import AppEvents from './event'
// import DefaultChats from './plugins/pubnubchat/default-chats'
// import botInit from './plugins/pubnubchat/bot'
// import util from './plugins/pubnubchat/util'
// import VueChatEngine from 'vue-chat-engine'
// import ChatEngineCore from 'chat-engine'

// // Global chat settings are first in the friend list (default-chats.js)
// const globalChatSettings = DefaultChats.friends[0]

// // ChatBot REST endpoint powered by PubNub Functions and Amazon Lex
// const chatBotURL = 'https://pubsub.pubnub.com/v1/blocks/sub-key/sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d/chat-bot'

// // Init ChatEngine with PubNub
// const publishKey = 'pub-c-4fc6b882-3f6b-4865-acaa-fe0fa2cc74d1'
// const subscribeKey = 'sub-c-3005a33c-d2fc-11e7-b07a-4e4fd9aca72d'

// if (!publishKey || !subscribeKey) {
//   console.error('ChatEngine: PubNub Keys are missing.')
// }

// const chatEngine = ChatEngineCore.create({
//   publishKey,
//   subscribeKey,
// }, {
//   globalChannel: globalChatSettings.chatKey,
// })

// const myUuid = util.fourCharID()
// const me = {
//   name: myUuid,
//   uuid: myUuid,
// }

// // ChatEngine injected into every component instance with the plugin
// Vue.use(VueChatEngine, {
//   chatEngine,
// })


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
    console.log(this.$humanity_token)
    // this.$pubnub.subscribe({
    //   channels: ['general']
    // })
    // this.$pubnub.addListener({
    //   status: function (statusEvent) {
    //     if (statusEvent.category === 'PNConnectedCategory') {
    //       // handle status
    //       console.log('PC connected')
    //     }

    //   },

    //   // message: function (message) {
    //   //   console.log(message.message)

    //   //   if (message.message.title === 'error') {
    //   //     console.log(message)
    //   //     vm.snackbar.color = 'red'
    //   //     vm.snackbar.text = message.message.description
    //   //     vm.snackbar.show = true
    //   //   }
    //   //   // console.log('New Message!', message)
    //   // },
    //   presence: function (presenceEvent) {
    //     // handle presence
    //   }
    // })

    // this.fireMessage('t', 'd')
  },
  created () {
    const vm = this
    // this.pubnub.load()
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback)
    })
    window.getApp = this


    /**
     * Execute this function when the Vue instance is created
     */

    // const ChatEngine = this.$chatEngine
    // const store = this.$store

    // ChatEngine.connect(me.uuid, me)

    // document.addEventListener('beforeunload', function () {
    //   ChatEngine.disconnect()
    // })

    // ChatEngine.on('$.ready', function (data) {
    //   // store my new user as `me`
    //   let me = data.me
    //   store.commit('chat/setMe', {
    //     me
    //   })

    //   // Auto add a 1:1 chat to UI when invited
    //   // more invite code in (components/FriendList.vue)
    //   me.direct.on('$.invite', (event) => {
    //     let uuids = [event.sender.uuid, store.state.me.uuid].sort()
    //     let chatKey = uuids.join('-')

    //     // Don't make the same 1:1 chat if it already exists
    //     if (store.state.chats[chatKey]) {
    //       return
    //     }

    //     // Make the new 1:1 private Chat
    //     util.newChatEngineChat(
    //       store,
    //       ChatEngine, {
    //         chatKey,
    //         uuid: event.sender.uuid,
    //       },
    //       true,
    //     )
    //   })

    //   ChatEngine.global.key = globalChatSettings.chatKey

    //   // Make a Global Chat and add to the client's UI
    //   const globalChat = util.newChatEngineChat(
    //     store,
    //     ChatEngine,
    //     globalChatSettings,
    //   )

    //   // Get the message history in the global chat
    //   globalChat.search({
    //     event: 'message',
    //     limit: 6,
    //   })

    //   store.commit('chat/setCurrentChat', {
    //     chatKey: globalChat.key,
    //   })

    //   // Create a new chat for each user in the friends list
    //   DefaultChats.friends.forEach(function (friend) {
    //     const uuids = [friend.uuid, store.state.me.uuid].sort()
    //     const chatKey = uuids.join('-')

    //     // Don't make a duplicate chat if it already exists
    //     if (
    //       store.state.chats[chatKey] ||
    //       friend.uuid === 'global'
    //     ) {
    //       return
    //     }

    //     // Make a private chat key with the Stephen bot
    //     if (friend.isChatBot) {
    //       // Init ChatBot with its own ChatEngine client (bot.js)
    //       botInit(ChatEngine, friend, chatBotURL)
    //     }

    //     // Add the chat key to the Chat object for Vue UI use
    //     friend.chatKey = chatKey

    //     // Make the new 1:1 private Chat
    //     const myChat = util.newChatEngineChat(
    //       store,
    //       ChatEngine,
    //       friend,
    //       true,
    //     )

    //     // when a user comes online
    //     myChat.on('$.online.*', (data) => {
    //       // console.log('New user', data.user.uuid);
    //     })

    //     // when a user goes offline
    //     myChat.on('$.offline.*', (data) => {
    //       // console.log('User left', data.user.uuid);
    //     })
    //   })
    // })


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
