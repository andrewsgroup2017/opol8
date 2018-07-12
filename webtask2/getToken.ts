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
