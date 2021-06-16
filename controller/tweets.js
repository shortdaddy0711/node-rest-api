import data from '../data/tweets.js';

export default {
	async getList(req, res) {
		const { username } = req.query;
		if (username) {
			try {
				const tweets = await data.getByUsername(username);
				res.status(200).json(tweets);
			} catch (err) {
				res.status(404).json({
					message: `Not found username: ${username}`,
				});
			}
		} else {
			try {
				const tweets = await data.getAll();
				res.status(200).json(tweets);
			} catch (err) {
				res.status(404).json({ message: `No tweets` });
			}
		}
	},

	async getOne(req, res) {
		const { id } = req.params;
		try {
			const tweet = await data.getById(id);
			res.status(200).json(tweet);
		} catch (err) {
			res.status(404).json({ message: `Not found id: ${id}` });
		}
	},

	async addTweet(req, res) {
		const body = req.body;
		try {
			const tweet = await data.addTweet(body);
			res.status(201).json(tweet);
		} catch (err) {
			res.status(409).json({ message: `failed to add new tweet` });
		}
	},

	async updateTweet(req, res) {
		const { body } = req.body;
		const { id } = req.params;
		try {
			const tweet = await data.updateTweet(id, body);
			res.status(200).json(tweet);
		} catch (err) {
			res.status(404).json({ message: `Not found id: ${id}` });
		}
	},

	async deleteTweet(req, res) {
		const { id } = req.params;
		try {
			await data.deleteTweet(id);
			res.sendStatus(204);
		} catch (err) {
			res.status(404).json({ message: `Not found id: ${id}` });
		}
	},
};

const idGen = (dataLength) => {
	return dataLength + 1;
};
