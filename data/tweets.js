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
				const { username, name, url } = await userData.findById(tweet.userId);
				return { ...tweet, username, name, url };
			})
		);
	},

	async getById(id) {
		return data.find((tweet) => tweet.id === id);
	},

	async addTweet(body, userId) {
		const newTweet = {
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			text: body.text,
			userId: userId,
		};
		data.unshift(newTweet);
		return newTweet;
	},

	async updateTweet(body, userId, id) {
		const targetTweet = data.find((tweet) => tweet.id === id);
		if (targetTweet && targetTweet.userId === userId) {
			targetTweet.text = body.text;
			targetTweet.modifiedAt = new Date().toISOString();
			return targetTweet;
		}
		return;
	},

    async deleteTweet(userId, id) {
        let idx;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                idx = i;
                break;
            }
        }
        if (idx) {
            data.splice(idx, 1);
            return;
        }
        return new Error();
	},
};
