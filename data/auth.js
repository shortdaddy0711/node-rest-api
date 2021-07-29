import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';

let userList = [
	{
		id: '1624663002793',
		username: 'bob',
		password:
			'$2b$10$5etRdC9KY5P9cbD5y1LAq.tflvDzCePmxErxndEoR7klM6oJeVJZ2', // 'abcd1234'
		name: 'Bob',
		url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
	},
	{
		id: '1624735777282',
		username: 'shortdaddy',
		password:
			'$2b$10$bqAKqozHz5pRc1573bWIQ.LVO0cBhX6QD9ew7t35JTL12lVX77B1S', // 'hopper21'
		name: 'Namsoo',
		url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-2.png',
	},
];

const tokenGen = (key) => {
	return jwt.sign({ key }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresInSec,
	});
};

export default {
	async findByUsername(username) {
		return userList.find((user) => user.username === username);
	},

	async getAllUsers() {
		return userList;
	},

	async findById(id) {
		return userList.find((user) => user.id === id);
	},

	async addUser({ name, username, password, url }) {
		const session = {};
		const user = await this.findByUsername(username);

		if (user) {
			return null;
		}

		const newUser = {
			id: Date.now().toString(),
			name,
			username,
			password: await bcrypt.hash(password, config.bcrypt.saltRounds),
			url: url ? url : null,
		};

		userList.push(newUser);

		const token = tokenGen(newUser.id);
		session.username = newUser.username;
		session.token = token;
		return session;
	},

	async authentication({ username, password }) {
		const session = {};

		const user = await this.findByUsername(username);

		if (!user) {
			return;
		}

		const authInfoPassword = await bcrypt.compare(password, user.password);

		if (!authInfoPassword) {
			return;
		}

		const token = tokenGen(user.id);
		session.username = username;
		session.token = token;

		return session;
	},
};
