import { ObjectId } from 'mongodb';
import { getDb } from '../db/database.js';
import { config } from '../config.js';
import User from './auth.js';

const dbName = config.db.database;
const db = getDb(dbName);
const collection = db.collection('tweets');

export default {
	async getAll() {
		return await collection
			.find({})
			.sort({ createdAt: -1 })
			.toArray()
			.then((tweets) => {
				return tweets
					? tweets.map((tweet) => {
							return { ...tweet, id: tweet._id.toString() };
					  })
					: tweets;
			})
			.catch((e) => console.log(e));
	},

	async getByUsername(username) {
		return await collection
			.find({ username })
			.sort({ createdAt: -1 })
			.toArray()
			.then((tweets) => {
				return tweets
					? tweets.map((tweet) => {
							return { ...tweet, id: tweet._id.toString() };
					  })
					: tweets;
			})
			.catch((e) => console.log(e));
	},

	async getById(id) {
		return await collection
			.findOne({ _id: new ObjectId(id) })
			.then((tweet) => {
				return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
			})
			.catch((e) => console.log(e));
	},

	async addTweet(text, userId) {
		return await User.findById(userId)
			.then((user) => {
				return {
					text,
					userId,
					createdAt: new Date(),
					name: user.name,
					username: user.username,
					url: user.url,
				};
			})
			.then((newTweet) => collection.insertOne(newTweet))
			.then((data) => {
				return this.getById(data.insertedId.toString());
			})
			.catch((e) => console.log(e));
	},

	async updateTweet(text, id) {
		return await collection
			.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{
					$set: { text },
				},
				{ returnDocument: 'after' }
			)
			.then((updatedTweet) => {
				return updatedTweet.ok === 1
					? {
							...updatedTweet.value,
							id: updatedTweet.value._id.toString(),
					  }
					: updatedTweet;
			})
			.catch((e) => console.log(e));
	},

	async deleteTweet(id) {
		return await collection
			.findOneAndDelete({ _id: new ObjectId(id) })
			.then((deletedTweet) => {
				return deletedTweet.ok === 1
					? {
							...deletedTweet.value,
							id: deletedTweet.value._id.toString(),
					  }
					: deletedTweet;
			})
			.catch((e) => console.log(e));
	},

	// for dev only
	async deleteAll() {
		return await collection
			.deleteMany({})
			.then((data) => data)
			.catch((e) => console.error(e));
	},
};
