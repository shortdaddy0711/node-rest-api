import { ObjectId } from 'mongodb';
import { getDb } from '../db/database.js';
import { config } from '../config.js';

const dbName = config.db.database;
const db = getDb(dbName);
const collection = db.collection('users');

export default {
	async getAllUsers() {
		return await collection
			.find({})
			.toArray()
			.then((users) => {
				return users
					? users.map((user) => {
							return { ...user, id: user._id.toString() };
					  })
					: users;
			})
			.catch((e) => console.error(e));
	},

	async findByUsername(username) {
		return await collection
			.findOne({ username })
			.then((user) => {
				return user ? { ...user, id: user._id.toString() } : user;
			})
			.catch((e) => console.error(e));
	},

	async findById(id) {
		return await collection
			.findOne({ _id: new ObjectId(id) })
			.then((user) => {
				return user ? { ...user, id: user._id.toString() } : user;
			})
			.catch((e) => console.error(e));
	},

	async addUser(user) {
		return await collection
			.insertOne(user)
			.then((data) => data.insertedId.toString())
			.catch((e) => console.error(e));
	},

	// for dev only
	async deleteAll() {
		return await collection
			.deleteMany({})
			.then((data) => data)
			.catch((e) => console.error(e));
	},
};
