import { db } from '../db/database.js';
import userData from './auth.js';

const SELET_JOIN =
	'SELECT tw.id, tw.text, tw.createdAt, tw.userId, u.username, u.name, u.url FROM tweets as tw JOIN users as u ON tw.userId=u.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export default {
	async getAll() {
		return db
			.execute(`${SELET_JOIN} ${ORDER_DESC}`)
			.then((result) => result[0])
			.catch((e) => console.log(e));
	},

	async getByUsername(username) {
		return db
			.execute(`${SELET_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
			.then((result) => result[0])
			.catch((e) => console.log(e));
	},

	async getById(id) {
		return db
			.execute(`${SELET_JOIN} WHERE tw.id=?`, [id])
			.then((result) => result[0][0])
			.catch((e) => console.log(e));
	},

	async addTweet(text, userId) {
		return db
			.execute(
				'INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)',
				[text, new Date(), userId]
			)
			.then((result) => this.getById(result[0].insertId))
			.catch((e) => console.log(e));
	},

	async updateTweet(text, id) {
		return db
			.execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
			.then(() => this.getById(id))
			.catch((e) => console.log(e));
	},

	async deleteTweet(id) {
		return db
			.execute('DELETE FROM tweets WHERE id=?', [id])
			.catch((e) => console.log(e));
	},
};
