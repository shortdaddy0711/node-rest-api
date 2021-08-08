import { getSocketIo } from '../connection/socket.js';
import data from '../data/tweets.js';

export default {
	async getList(req, res) {
		const { username } = req.query;
		const tweets = await (username
			? data.getByUsername(username)
			: data.getAll());
		res.status(200).json(tweets);
	},

	async getById(req, res) {
		const { id } = req.params;
		const tweet = await data.getById(id);
		tweet
			? res.status(200).json(tweet)
			: res.status(404).json({ message: `Not found id: ${id}` });
	},

	async addTweet(req, res) {
		const { body, userId } = req;
		const tweet = await data.addTweet(body.text, userId);
		res.status(201).json(tweet);
		getSocketIo().emit('tweets', tweet);
	},

	async updateTweet(req, res) {
		const { body, userId } = req;
		const { id } = req.params;
		const tweet = await data.getById(id);
		return tweet
			? tweet.userId !== userId
				? res.sendStatus(403)
				: res.status(200).json(await data.updateTweet(body.text, id))
			: res.status(404).json({ message: 'Tweet not found' });
	},

	async deleteTweet(req, res) {
		const { userId } = req;
		const { id } = req.params;
		const tweet = await data.getById(id);
		return tweet
			? tweet.userId !== userId
				? res.sendStatus(403)
				: res.status(204).json(await data.deleteTweet(id))
			: res.status(404).json({ message: 'Tweet not found' });
	},
};
