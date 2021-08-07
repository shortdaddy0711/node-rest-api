import { db } from '../db/database.js';

export default {
	async findByUsername(username) {
		return db
			.execute('SELECT * FROM users WHERE username=?', [username])
			.then((result) => result[0][0])
			.catch((e) => console.log(e));
	},

	async getAllUsers() {
		return db
			.execute('SELECT * FROM users')
			.then((result) => result[0])
			.catch((e) => console.log(e));
	},

	async findById(id) {
		return db
			.execute('SELECT * FROM users WHERE id=?', [id])
			.then((result) => result[0][0])
			.catch((e) => console.log(e));
	},

	async addUser({ username, password, name, email, url }) {
		return db
			.execute(
				'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
				[username, password, name, email, url]
			)
			.then((result) => result[0].insertId)
			.catch((e) => console.log(e));
	},
};
