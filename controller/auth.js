import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import data from '../data/auth.js';
import { config } from '../config.js';

const tokenGen = (key) => {
	return jwt.sign({ key }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresInSec,
	});
};

export default {
	async signup(req, res) {
		const newUser = req.body;
		await data
			.findByUsername(newUser.username)
			.then((user) => {
				if (user)
					return res.status(401).json({
						message: `${newUser.username} already exists`,
					});
				return newUser;
			})
			.then((user) =>
				bcrypt.hash(user.password, config.bcrypt.saltRounds)
			)
			.then((password) => {
				newUser.password = password;
				return newUser;
			})
			.then((user) => data.addUser(user))
			.then((userId) => {
				return res.status(201).json({
					username: newUser.username,
					token: tokenGen(userId),
				});
			})
			.catch(console.error);
	},

	async login(req, res) {
		const { username, password } = req.body;
		await data
			.findByUsername(username)
			.then((user) => {
				if (!user) {
					return res
						.status(401)
						.json({ message: 'Invalid username or password' });
				}
				if (!bcrypt.compare(password, user.password)) {
					return res
						.status(401)
						.json({ message: 'Invalid username or password' });
				}
				return user;
			})
			.then((user) => tokenGen(user.id))
			.then((token) => {
				return res.status(200).json({ username, token });
			})
			.catch(console.error);
	},

	async me(req, res) {
		const { userId } = req;
		await data
			.findById(userId)
			.then(({ username }) => {
				username
					? res.status(200).json({ username })
					: res
							.status(401)
							.json({ message: `Not found user: ${username}` });
			})
			.catch(console.error);
	},

	// for dev
	async users(req, res) {
		const users = await data.getAllUsers();
		users
			? res.status(200).json(users)
			: res.status(404).json({ message: 'Not found' });
	},

	async deleteAll(req, res) {
		const result = await data.deleteAll();
		result
			? res.status(200).json(result)
			: res.status(404).json({ message: 'no users' });
	},
};
