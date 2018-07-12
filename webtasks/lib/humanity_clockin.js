'use latest'
let _querystring = require('querystring'); let _querystring2 = _interopRequireDefault(_querystring)
let _axios = require('axios'); let _axios2 = _interopRequireDefault(_axios); function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

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


  _axios2.default
    .post('https://www.humanity.com/oauth2/token.php', _querystring2.default.stringify(payload))
    .then(function (response) {
      token = response.data.access_token
      return _axios2.default.get('https://www.humanity.com/api/v2/employees?access_token=' + token)
    })
    .then(function (response) {
      console.log('45', token); let _iteratorNormalCompletion = true; let _didIteratorError = false; let _iteratorError; try {
        for (var _iterator = response.data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) { let value = _step.value
          console.warn('asdfsdfsdfd')
          if (value.id == ctx.body.id) {
            console.log('48', value.id)
            console.warn('asdfsdfsdfd')
            console.warn('asdfsdfsdfd')
            console.log(value.id)
            // console.log('49', user)
            return _axios2.default.post('https://www.humanity.com/api/v2/employees/' +
          value.id + '/clockin?access_token=' + token)

          }
        } } catch (err) { _didIteratorError = true; _iteratorError = err } finally { try { if (!_iteratorNormalCompletion && _iterator.return) { _iterator.return() } } finally { if (_didIteratorError) { throw _iteratorError } } }

    })
    .then(function (response) {
      let r = response.data
      console.error(r.data)
      res.end(r)
    })
    .catch(function (error) {
      res.end(error)
    })
}