import jwt from 'jsonwebtoken';
import data from '../data/auth.js';

// authorization with bearer using jwt.verify

const accessTokenSecret = 'NdRfUjXn';

export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const authHeaderArr = authHeader.split(' ');

	if (authHeader && authHeaderArr[0] === 'Bearer') {
		const token = authHeaderArr[1];

		jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
            req.userId = user.key;
            req.token = token;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};