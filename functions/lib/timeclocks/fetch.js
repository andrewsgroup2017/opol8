
let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value) }).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
Object.defineProperty(exports, '__esModule', { value: true })
const fetch = require('fetch')
const payload = {
  client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
  client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
  grant_type: 'password',
  username: 'ash@andrewscarpetcleaning.com',
  password: 'sugarlips42',
  redirect_uri: 'https://andrewsadmin.firebaseapp.com/#/',
}
const options = {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json',
  },
}
function fetchToken () {
  return __awaiter(this, void 0, void 0, function* () {
    let data = yield (yield fetch('https://www.humanity.com/oauth2/token.php', options)).json()
    return data
  })
}
exports.fetchToken = fetchToken
function clockIn (id, token) {
  return __awaiter(this, void 0, void 0, function* () {
    let data = yield (yield fetch(`https://www.humanity.com/api/v2/employees/${id}/clockout?access_token=${token}`)).json()
    return data
  })
}
exports.clockIn = clockIn
// # sourceMappingURL=fetch.js.map