import querystring from 'querystring'
import axios from 'axios'

module.exports = function (ctx, cb) {
  const email = ctx.body.email

  const payload = {
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
      return axios.get(`https://www.humanity.com/api/v2/employees?access_token=${response.data.access_token}`)
    })
    .then((response) => {
      for (let value of response.data.data) {
        if (value.email === email) {
          console.log('28', value.id)
          return axios.get(
            `https://www.humanity.com/api/v2/timeclocks/status/${value.id}/1?access_token=${response.data.access_token}}`
          )
        }
      }
    })
    .then((response) => {
      cb('null', response)
    })
    .catch((error) => {
      console.log('76', error)
    })

}

// app.post('/login', (req, res) => {
//   console.log(req.body.email)
// res.end(req.body.email);
// var user = {};
//     var inout = {};
//     var token = "";
//     var payload = {
//       client_id: "0cbaa9173943569cad4c0b8267981147bac0cf5d",
//       client_secret: "be6a34d0830ab6fb3db837958d50faace249e0d1",
//       grant_type: "password",
//       username: "ash@andrewscarpetcleaning.com",
//       password: "sugarlips42",
//       redirect_uri: "https://andrewsadmin.firebaseapp.com/#/"
//     };

//     var querystring = require("querystring");
//     axios
//       .post(
//         "https://www.humanity.com/oauth2/token.php",
//         querystring.stringify(payload)
//       )
//       .catch(error => {
//         console.error(new Error('message'))
//         console.log(error)
//         res.end(error);
//       })
//       .then(response => {
//         token = response.data.access_token;
//         return axios.get(
//           `https://www.humanity.com/api/v2/employees?access_token=${token}`
//         );
//       })
//       .catch(error => {
//         console.error(new Error('message'))
//         res.end(error);
//       })
//       .then(response => {
//         for (var value of response.data.data) {
//           if (value.email === req.body.email) {
//             user = value;
//             console.log(value.id);
//             return axios.get(
//               `https://www.humanity.com/api/v2/timeclocks/status/${
//                 value.id
//               }/1?access_token=${token}`
//             );
//           }
//         }
//         res.status(400).send("user not found");
//       })
//       .catch(error => {
//         console.error(new Error('message'))
//         res.end(error);
//       })
//       .then(response => {
//         console.log(response);

//         inout = response;
//         user.clockedIn = inout.data.data;
//         console.log(inout.data.data);
//         //
//         // res.status(200).send(user);
//         // res.status(200).send({ test: "Testing functions" });
//         // res.end({ user: user });
//         res.status(200).send(user);
//       })
//       .catch(error => {
//         console.error(new Error('message'))
//         res.end(error);
//       });
//     res.end(555);
//     // res.status(404).send("error")

//     })

// module.exports = fromExpress(app);
// app.use(bodyParser.json());

// app.get('/login', (req, res) => {
// axios.get({
//     baseURL: 'https://platform.humanity.com/api/',
//     timeout: 1000,
//     headers: {
//         Accept: 'application/json'
//     },
//     data: {
//                 "key": "cb1a82f76610a8baddcfecea6198914b5552b506",
//                 "module": "staff.login",
//                 "method": "GET",
//                 "username": "andrewsgroup",
//                 "password": "sugarlips42"
//     }
// }).then(function(response) {
//                 console.log(response.data)
//               res.status(200)
//             })
//         res.status(200)
// })

// app.get('/', (req, res) => {
//   const HTML = renderView({
//     title: 'My Webtask View',
//     body: '<h1>Simple webtask view</h1>'
//   });

//   res.set('Content-Type', 'text/html');
//   res.status(200).send(HTML);
// });

// module.exports = fromExpress(app);

// function renderView(locals) {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>${locals.title}</title>
//     </head>

//     <body>
//       ${locals.body}
//     </body>
//     </html>
//   `;
// }