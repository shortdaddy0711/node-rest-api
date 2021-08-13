import mongoose from 'mongoose';
import { idVirtualization } from '../db/database.js';
const { Schema } = mongoose;

const userSchema = new Schema({
	username: String,
	password: String,
	name: String,
	email: String,
	url: String,
});

idVirtualization(userSchema);

export const User = mongoose.model('User', userSchema);

export default {
	async getAllUsers() {
		return User.find({})
			.then((users) => users)
			.catch(console.error);
	},

	async findByUsername(username) {
		return User.findOne({ username })
			.then((user) => user)
			.catch(console.error);
	},

	async findById(id) {
		return User.findById(id)
			.then((user) => user)
			.catch(console.error);
	},

	async addUser(user) {
		return new User(user)
			.save()
			.then((result) => result.id)
			.catch(console.error);
	},

	// for dev only
	async deleteAll() {
		return User.deleteMany({}, (err, data) => {
			if (err) return console.error(err);
			return data;
		});
	},
};
