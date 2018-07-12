import { NextFunction, Request, Response } from 'express';
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

export class HelloWorldController {
	public get(req: Request, res: Response, next: NextFunction) {
		res.status(200).json({
			message: 'Hello World!'
		});
	}

	public create(req: Request, res: Response, next: NextFunction) {
		console.log(req.params.id);
		async function humanityClockin(id) {
			const token = await axios.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload));
			const clockin = await axios.post(
				`https://www.humanity.com/api/v2/employees/${id}/clockin?access_token=${token}`
			);
			return clockin;
		}
		const ci = humanityClockin(req.body.id);
		res.status(200).json(ci);
	}

	public update(req: Request, res: Response, next: NextFunction) {
		res.status(201).json({
			id: req.params.id,
			body: req.body.text
		});
	}

	public delete(req: Request, res: Response, next: NextFunction) {
		res.status(200).json({
			id: req.params.id,
			message: 'deleted'
		});
	}
}

export default new HelloWorldController();

module.exports = function(ctx, req, res) {
	// let id = ctx.body.id
	let user = {};
	let token = '';

	axios
		.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload))
		.then((response) => {
			token = response.data.access_token;
			return axios.get(`https://www.humanity.com/api/v2/employees?access_token=${token}`);
		})
		.then((response) => {
			console.log('45', token);
			for (let value of response.data.data) {
				console.warn('asdfsdfsdfd');
				if (value.id == ctx.body.id) {
					console.log('48', value.id);
					console.warn('asdfsdfsdfd');
					console.warn('asdfsdfsdfd');
					console.log(value.id);
					// console.log('49', user)
					return axios.post(
						`https://www.humanity.com/api/v2/employees/${value.id}/clockin?access_token=${token}`
					);
				}
			}
		})
		.then((response) => {
			let r = response.data;
			console.error(r.data);
			res.end(r);
		})
		.catch((error) => {
			res.end(error);
		});
};
