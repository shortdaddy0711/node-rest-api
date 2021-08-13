import mongoose from 'mongoose';
import { idVirtualization } from '../db/database.js';
import userData from './auth.js';
const { Schema } = mongoose;

const tweetSchema = new Schema(
	{
		text: String,
		createdAt: Date,
		userId: String,
		username: String,
		name: String,
		url: String,
	},
	{ timestamps: true }
);

idVirtualization(tweetSchema);

const Tweet = mongoose.model('Tweet', tweetSchema);

export default {
	async getAll() {
		return Tweet.find({}).sort({ createdAt: -1 }).catch(console.error);
	},

	async getByUsername(username) {
		return await Tweet.find({ username })
			.sort({ createdAt: -1 })
			.catch(console.error);
	},

	async getById(id) {
		return await Tweet.findById(id).catch(console.error);
	},

	async addTweet(text, userId) {
		return await userData
			.findById(userId)
			.then((user) => {
				return new Tweet({
					text,
					userId,
					createdAt: new Date(),
					name: user.name,
					username: user.username,
					url: user.url,
				}).save();
			})
			.catch(console.error);
	},

	async updateTweet(text, id) {
		return await Tweet.findByIdAndUpdate(
			id,
			{ text },
			{ returnDocument: 'after' }
		).catch(console.error);
	},

	async deleteTweet(id) {
		return await Tweet.findByIdAndDelete(id).catch(console.error);
	},

	// for dev only
	async deleteAll() {
		return await Tweet.deleteMany({}).catch(console.error);
	},
};
