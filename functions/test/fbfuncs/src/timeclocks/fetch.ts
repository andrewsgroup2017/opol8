import * as fetch from 'fetch'

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

export async function fetchToken() {
  let data = await (await fetch(
    'https://www.humanity.com/oauth2/token.php',
    options
  )).json()
  return data
}

export async function clockIn(id, token) {
  let data = await (await fetch(
    `https://www.humanity.com/api/v2/employees/${id}/clockout?access_token=${token}`
  )).json()
  return data
}
