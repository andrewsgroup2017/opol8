// import * as Webtask from 'webtask-tools';
import axios from 'axios';
import * as querystring from 'querystring';

const payload = {
	client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
	client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
	grant_type: 'password',
	username: 'ash@andrewscarpetcleaning.com',
	password: 'sugarlips42',
	redirect_uri: 'https://andrewsadmin.firebaseapp.com/#/'
};
// import App from './src/App';

// module.exports = Webtask.fromExpress(App);
module.exports = function getToken(ctx, cb) {
	async function getToken() {
		var token = null;
		try {
			token = await axios.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload));
			return token.data.access_token;
		} catch (error) {
			cb(error, 400);
		}
	}
	const token = getToken();
	cb(null, token);
};

module.exports = function clockin(ctx, cb) {
	console.log(ctx.body.id);
	async function humanityClockin(id) {
		var token = null;
		try {
			token = await axios.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload));
		} catch (error) {
			cb(error, 400);
		}
		try {
			console.log(token.data.access_token);
			const clockin = await axios.post(
				`https://www.humanity.com/api/v2/employees/${id}/clockin?access_token=${token.data.access_token}`
			);
			const result = clockin.data;
			cb(null, { result });
		} catch (error) {
			cb(error, 401);
		}
	}
	const ci = humanityClockin(ctx.body.id);
};

// 'use latest';
// import querystring from 'querystring'
// import axios from 'axios'

// module.exports = function(ctx, cb) {
// var id = ctx.body.id
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
//         console.log('31',error)
//         // res.end(error);
//       })
//       .then(response => {
//         token = response.data.access_token;
//         return axios.get(
//           `https://www.humanity.com/api/v2/employees?access_token=${token}`
//         );
//       })
//       .catch(error => {
//         console.error(new Error('message'))
//         // res.end(error);
//       })
//       .then(response => {
//         // console.log('45', response.data)
//         for (var value of response.data.data) {

//           if (value.id == id) {
//             user = value;
//              console.log('49', value.id)
//             return axios.put(
//               `https://www.humanity.com/api/v2/employees/${
//                 value.id
//               }/clockout?access_token=${token}`
//             );
//           }
//         }
//         // res.status(400).send("user not found");
//       })
//       .catch(error => {
//         // console.error(new Error('message'))
//         console.log('63', error)
//         // res.end(error);
//       })
//       .then(response => {
//         var r = response
//         console.log(r)
// //       console.log('67',response);
// // console.log('user ', user.name)
// //         inout = response;
// //         user.clockedIn = inout.data.data;
// //         console.log('71',inout.data.data);
//         //
//         // res.status(200).send(user);
//         // res.status(200).send({ test: "Testing functions" });
//         // res.end({ user: user });
//         // res.status(200).send(user);
//            cb(null, {
//                     status: 200,
//                     timeclock: r
//                 })

//       })
//       .catch(error => {
//         console.log('76', error)
//         // res.end(error);
//       });
//     // res.end(555);
//     // res.status(404).send("error")
//   //  console.log('84', user.clockedIn)
//   // cb(null, {
//   //                   status: 200,
//   //                   length: user
//   //               })

// }

// // fetch("https://try.readme.io/https://www.humanity.com/api/v2/employees/1444044/clockout?access_token=d47a051d4b1023c4a65519bf9d4437774233a55c", {"credentials":"omit","headers":{},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"OPTIONS","mode":"cors"});
// // fetch("https://try.readme.io/https://www.humanity.com/api/v2/employees/1444044/clockout?access_token=d47a051d4b1023c4a65519bf9d4437774233a55c", {"credentials":"omit","headers":{},"referrer":"https://platform.humanity.com/v2.0/reference","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"PUT","mode":"cors"});
