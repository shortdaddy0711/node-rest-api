import express from 'express';
import data from '../data.js';

const router = express.Router();

router.get('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const tweet = await data.getById(id);
		res.status(200).json(tweet);
	} catch (err) {
		res.status(404).json({ message: `Not found id: ${id}` });
	}
});

router.post('/', async (req, res) => {
	const body = req.body;
	try {
		const tweet = await data.addTweet(body);
		res.status(201).json(tweet);
	} catch (err) {
		res.status(409).json({ message: `failed to add new tweet` });
	}
});

router.put('/:id', async (req, res) => {
	const { body } = req.body;
	const { id } = req.params;
	try {
		const tweet = await data.updateTweet(id, body);
		res.status(200).json(tweet);
	} catch (err) {
		res.status(404).json({ message: `Not found id: ${id}` });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await data.deleteTweet(id);
		res.sendStatus(204);
	} catch (err) {
		res.status(404).json({ message: `Not found id: ${id}` });
	}
});

export default router;
