import jwt from 'jsonwebtoken';
import data from '../data/auth.js';
import { config } from '../config.js';

// authorization using jwt.verify with bearer
export const authMiddleware = (req, res, next) => {
	const authHeader = req.get('Authorization');
	const authError = { message: 'authentication error' };

	const token =
		authHeader && authHeader.split(' ')[0] === 'Bearer'
			? authHeader.split(' ')[1]
			: req.cookies.token;

	if (!token) return res.status(401).json(authError);

	jwt.verify(token, config.jwt.secretKey, async (err, user) => {
		if (err) return res.status(401).json(authError);
		const retrievedUser = await data.findById(user.key);
		if (retrievedUser) {
			req.userId = user.key;
			req.token = token;
		} else {
			return res.status(401).json(authError);
		}
		next();
	});
};
