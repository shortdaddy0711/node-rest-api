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
		const checkDup = await data.findByUsername(newUser.username);
		if (checkDup) {
			return res
				.status(409)
				.json({ message: 'choose different username' });
		}
		const hashedPassword = await bcrypt.hash(
			newUser.password,
			config.bcrypt.saltRounds
		);
		newUser.password = hashedPassword;
		const createdUser = await data.addUser(newUser);
		createdUser
			? res.status(201).json({
					username: newUser.username,
					token: tokenGen(createdUser.id),
			  })
			: res.status(401).json({
					message: `${createdUser.username} already exists`,
			  });
	},

	async login(req, res) {
		const { username, password } = req.body;

		const user = await data.findByUsername(username);
		if (!user) {
			return res
				.status(401)
				.json({ message: 'Invalid username or password' });
		}

		const authInfoPassword = await bcrypt.compare(password, user.password);
		if (!authInfoPassword) {
			return res
				.status(401)
				.json({ message: 'Invalid username or password' });
		}

		const token = tokenGen(user.id);
		return res.status(200).json({ username, token });
	},

	async me(req, res) {
		const { username } = await data.findById(req.userId);
		username
			? res.status(200).json({ token: req.token, username })
			: res.status(401).json({ message: `Not found user` });
	},

	// for dev
	async users(req, res) {
		const users = await data.getAllUsers();
		users
			? res.status(200).json(users)
			: res.status(404).json({ message: 'Not found' });
	},
};
