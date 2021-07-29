import data from '../data/auth.js';

export default {
	async signup(req, res) {
		const newUser = req.body;
		const token = await data.addUser(newUser);
		token
			? res.status(201).json(token)
			: res
					.status(401)
					.json({ message: `${newUser.username} already exists` });
	},

	async login(req, res) {
		const authInfo = req.body;
		const token = await data.authentication(authInfo);
		token
			? res.status(200).json(token)
			: res.status(401).json({ message: 'Invalid username or password' });
	},

	async me(req, res) {
		const { userId } = req;
		const { username } = await data.findById(userId);
		username
			? res.status(200).json({ token: req.token, username })
			: res.status(401).json({ message: `Not found user` });
	},

	// for dev
	async users(req, res) {
		const users = await data.getAllUsers();
		users
			? res.status(200).json(users)
			: res.status(404).json({ message: 'Not found' });
	},
};
