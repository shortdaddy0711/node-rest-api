import jwt from 'jsonwebtoken';
import data from '../data/auth.js';
import { config } from '../config.js';

// authorization using jwt.verify with bearer
export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const authHeaderArr = authHeader.split(' ');
	const authError = { message: 'authentication error' };

	if (authHeader && authHeaderArr[0] === 'Bearer') {
		const token = authHeaderArr[1];

		jwt.verify(token, config.jwt.secretKey, async (err, user) => {
			if (err) {
				return res.status(401).json(authError);
			}
			const retrievedUser = await data.findById(user.key);
			if (retrievedUser) {
				req.userId = user.key;
				req.token = token;
			} else {
				return res.status(401).json(authError);
			}
			next();
		});
	} else {
		return res.status(401).json(authError);
	}
};
