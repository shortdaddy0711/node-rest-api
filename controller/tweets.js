import data from '../data.js';

export default {
	async getAll() {
		const tweets = data;
		if (tweets.length > 0) {
			return tweets;
		} else {
			throw new Error();
		}
	},

	async getByUsername(username) {
		const tweets = data.filter((t) => t.username === username);
		if (tweets.length > 0) {
			return tweets;
		} else {
			throw new Error();
		}
	},

	async getById(id) {
		const tweet = data.find((t) => t.id === id);
		if (tweet) {
			return tweet;
		} else {
			throw new Error();
		}
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
		return newTweet.id;
	},

	async updateTweet(id, body) {
		const tweet = data.find((t) => t.id === id);
		if (tweet) {
			tweet.body = body;
			tweet.modifiedAt = new Date();
			return tweet;
		} else {
			throw new Error();
		}
	},

	async deleteTweet(id) {
		let index;
		data.forEach((t, i) => {
			if (t.id === id) {
				index = i;
			}
		});
		if (index) {
			data.splice(index, 1);
		} else {
			throw new Error();
		}
	},
};

const idGen = (dataLength) => {
	return dataLength + 1;
};
