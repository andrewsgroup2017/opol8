// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import './theme/default.styl'
import VeeValidate from 'vee-validate'
import colors from 'vuetify/es5/util/colors'
import Truncate from 'lodash.truncate'
import store from './store/store'
import './plugins/setup'
Vue.config.productionTip = false
import './registerServiceWorker'



function isMobileDevice () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
}
Vue.prototype.mobile = isMobileDevice()
Vue.prototype.debug = false
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.debug = true
}

// Helpers
// Global filters
Vue.filter('truncate', Truncate)
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields'
})
Vue.use(Vuetify, {
  theme: {
    primary: '#41b883', // #E53935
    secondary: colors.indigo.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  },
  options: {
    themeVariations: ['#41b883', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: '#41b883'
      },
      sideToolbar: {},
      sideNav: '#41b883',
      mainNav: '#41b883 lighten-1',
      bodyBg: ''
    }
  }
})
// Bootstrap application components
let mobile = isMobileDevice()
/* eslint-disable no-new */
new Vue({
  router,
  store,
  mobile,
  render: h => h(App)
}).$mount('#app')
// new Vue({
//   el: "#app",
//   router,
//   components: {
//     App
//   },
//   template: "<App/>"
// });