'use latest'
import querystring from 'querystring'
import axios from 'axios'

module.exports = function (ctx, req, res) {
  // let id = ctx.body.id
  let user = {}
  let token = ''
  let payload = {
    client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
    client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
    grant_type: 'password',
    username: 'ash@andrewscarpetcleaning.com',
    password: 'sugarlips42',
    redirect_uri: 'https://andrewsadmin.firebaseapp.com/#/'
  }

  axios
    .post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload))
    .then((response) => {
      token = response.data.access_token
      return axios.get(`https://www.humanity.com/api/v2/employees?access_token=${token}`)
    })
    .then((response) => {
      console.log('45', token)
      for (let value of response.data.data) {
        console.warn('asdfsdfsdfd')
        if (value.id == ctx.body.id) {
          console.log('48', value.id)
          console.warn('asdfsdfsdfd')
          console.warn('asdfsdfsdfd')
          console.log(value.id)
          // console.log('49', user)
          return axios.post(
            `https://www.humanity.com/api/v2/employees/${value.id}/clockin?access_token=${token}`
          )
        }
      }

    })
    .then((response) => {
      let r = response.data
      console.error(r.data)
      res.end(r)
    })
    .catch((error) => {
      res.end(error)
    })
}