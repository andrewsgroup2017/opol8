'use latest'; let _regenerator = require('babel-runtime/regenerator'); let _regenerator2 = _interopRequireDefault(_regenerator); let _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator'); let _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)
let _querystring = require('querystring'); let _querystring2 = _interopRequireDefault(_querystring)
let _axios = require('axios'); let _axios2 = _interopRequireDefault(_axios); function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

module.exports = function (ctx, req, res) { let _this = this
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

  let getInfo = (function () { let _ref = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee (payload) { let token, 
    result; return _regenerator2.default.wrap(function _callee$ (_context) { while (1) { switch (_context.prev = _context.next) { case 0: _context.next = 2; return (
    _axios2.default.post('https://www.humanity.com/oauth2/token.php', _querystring2.default.stringify(payload))); case 2: token = _context.sent; _context.next = 5; return (
      _axios2.default.post('https://www.humanity.com/api/v2/employees?access_token=' + token, _querystring2.default.stringify(payload))); case 5: result = _context.sent
      res.send(result)
      // return result;
    case 7: case 'end': return _context.stop() } } }, _callee, _this) })); return function getInfo (_x) { return _ref.apply(this, arguments) } })()
  getInfo(payload)
  // var token = await axios.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload))
  // axios
  //   .post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload))
  //   .then((response) => {
  //     token = response.data.access_token
  //     return axios.get(`https://www.humanity.com/api/v2/employees?access_token=${token}`)
  //   })
  //   .then((response) => {
  //     console.log('45', token)
  //     for (let value of response.data.data) {
  //       console.warn('asdfsdfsdfd')
  //       if (value.id == ctx.body.id) {

  //         return axios.post(
  //           `https://www.humanity.com/api/v2/employees/${value.id}/clockin?access_token=${token}`
  //         )
  //       }
  //     }

  //   })
  //   .then((response) => {
  //     let r = response.data
  //     console.error(r.data)
  //     res.end(r)
  //   })
  //   .catch((error) => {
  //     res.end(error)
  //   })
}