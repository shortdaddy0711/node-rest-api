let data = [
	{
		id: '1',
		body: '드림코딩에서 강의 들으면 너무 좋으다',
		createdAt: '2021-05-09T04:20:57.000Z',
		name: 'Bob',
		username: 'bob',
		url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
	},
];

export default {
	async getByUsername(username) {
		return data.filter((tweet) => tweet.username === username);
	},

	async getAll() {
		return data;
	},

	async getById(id) {
		return data.find((tweet) => tweet.id === id);
	},

	async addTweet(tweet) {
		const newTweet = {
			id: Date.now().toString(),
			createdAt: new Date(),
			name: tweet.name,
			username: tweet.username,
			body: tweet.body,
			url: tweet.url
				? tweet.url
				: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
		};
		data.unshift(newTweet);
		return newTweet;
	},

	async updateTweet(id, body) {
		const tweet = data.find((tweet) => tweet.id === id);
		if (tweet) {
			tweet.body = body;
			tweet.modifiedAt = new Date();
		}
		return tweet;
	},

	async deleteTweet(id) {
		data = data.filter((tweet) => tweet.id !== id);
	},
};
