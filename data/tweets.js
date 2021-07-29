import userData from './auth.js';

let data = [
	{
		id: '1',
		text: 'first tweet',
		createdAt: '2021-05-09T04:20:57.000Z',
		userId: '1624663002793',
	},
	{
		id: '2',
		text: 'second tweet',
		createdAt: '2021-05-11T04:20:57.000Z',
		userId: '1624735777282',
	},
];

export default {
	async getByUsername(username) {
		return this.getAll().then((data) =>
			data.filter((tweet) => tweet.username === username)
		);
	},

	async getAll() {
		return Promise.all(
			data.map(async (tweet) => {
				const { username, name, url } = await userData.findById(
					tweet.userId
				);
				return { ...tweet, username, name, url };
			})
		);
	},

	async getById(id) {
		const tweet = data.find((tweet) => tweet.id === id);
		const { username, name, url } = await userData.findById(tweet.userId);
		return { ...tweet, username, name, url };
	},

	async addTweet(body, userId) {
		const newTweet = {
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			text: body.text,
			userId: userId,
		};
		data.unshift(newTweet);
		const { username, name, url } = await userData.findById(userId);
		return { ...newTweet, username, name, url };
	},

	async updateTweet(body, userId, id) {
		const targetTweet = data.find((tweet) => tweet.id === id);

		if (!targetTweet) {
			return { message: 'Not found tweet' };
		}

		if (targetTweet.userId !== userId) {
			return { message: 'No permission to do this' };
		}

		targetTweet.text = body.text;
		targetTweet.modifiedAt = new Date().toISOString();
		const { username, name, url } = await userData.findById(userId);
		return { ...targetTweet, username, name, url };
	},

	async deleteTweet(userId, id) {
		let idx;
		const targetTweet = data.find((tweet, i) => {
			tweet.id === id ? (idx = i) : null;
			return tweet.id === id;
		});

		if (!targetTweet) {
			return { message: 'Not found tweet' };
		}

		if (targetTweet.userId !== userId) {
			return { message: 'No permission to do this' };
		}

		data.splice(idx, 1);

		return { message: 'deleted' };
	},
};
