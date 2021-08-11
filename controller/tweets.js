import { getSocketIo } from '../connection/socket.js';
import data from '../data/tweets.js';

export default {
	async getList(req, res) {
		const { username } = req.query;
		await (username ? data.getByUsername(username) : data.getAll()).then(
			(tweets) => {
				tweets
					? res.status(200).json(tweets)
					: res.status(404).json({ message: 'no users' });
			}
		);
	},

	async getById(req, res) {
		const { id } = req.params;
		const tweet = await data.getById(id).then((tweet) => {
			tweet
				? res.status(200).json(tweet)
				: res.status(404).json({ message: `Not found id: ${id}` });
		});
	},

	async addTweet(req, res) {
		const { body, userId } = req;
		await data.addTweet(body.text, userId).then((addedTweet) => {
			if (addedTweet) {
				res.status(201).json(addedTweet);
				getSocketIo().emit('tweets', addedTweet);
			} else {
				res.status(404).json({ message: 'fail to add tweet' });
			}
		});
	},

	async updateTweet(req, res) {
		const { body, userId } = req;
		const { id } = req.params;
		await data.updateTweet(body.text, id).then((updatedTweet) => {
			updatedTweet
				? updatedTweet.userId !== userId
					? res.sendStatus(403)
					: res.status(200).json(updatedTweet)
				: res.status(404).json({ message: 'Tweet not found' });
		});
	},

	async deleteTweet(req, res) {
		const { userId } = req;
		const { id } = req.params;
		await data.deleteTweet(id).then((result) => {
			result
				? result.userId !== userId
					? res.sendStatus(403)
					: res.sendStatus(204)
				: res.status(404).json({ message: 'Tweet not found' });
		});
	},

	// for dev only
	async deleteAll(req, res) {
		await data.deleteAll().then((result) => {
			result
				? res.status(200).json(result)
				: res.status(404).json({ message: 'no users' });
		});
	},
};
