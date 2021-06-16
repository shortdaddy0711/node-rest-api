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
		const body = req.body;
		const tweet = await data.addTweet(body);
		res.status(201).json(tweet);
	},

	async updateTweet(req, res) {
		const { text } = req.body;
		const { id } = req.params;
		const tweet = await data.updateTweet(id, text);
		tweet
			? res.status(200).json(tweet)
			: res.status(404).json({ message: `Not found id: ${id}` });
	},

	async deleteTweet(req, res) {
		const { id } = req.params;
		await data.deleteTweet(id);
		res.sendStatus(204);
	},
};
