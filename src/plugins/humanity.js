import axios from 'axios'
import Vue from 'vue'
let token
async function setToken () {
  token = await axios.post(
    'https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_gettoken'
  )
	console.log(token)
	window.localStorage.setItem('humanity_token', token.data.toString())
	Vue.mixin({
    data () {
      return {
        humanity_token: token.data.toString()
      }
		}
  })
}

if (!window.localStorage.getItem('humanity_token')) {
  setToken()
} else {
  Vue.mixin({
    data () {
      return {
        humanity_token: window.localStorage.getItem('humanity_token')
      }
		}
  })
}
