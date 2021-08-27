import bcrypt from 'bcrypt';
import { config } from '../config.js';

async function validateCsrfToken(csrfHeader) {
	return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}

export const csrfCheckMiddleware = (req, res, next) => {
	const methodIgnore = ['GET', 'OPTIONS', 'HEAD'];
	if (methodIgnore.includes(req.method)) {
		return next();
	}
	console.log(req.get('_csrf-token'));
	console.log([...Object.entries(req.headers)]);
	const csrfHeader = req.get('_csrf-token');

	if (!csrfHeader) {
		console.warn('"_csrf-token" is missing', req.headers.origin);
		return res.status(403).json({ message: '"_csrf-token" is missing' });
	}

	validateCsrfToken(csrfHeader)
		.then((valid) => {
			if (!valid) {
				console.warn(
					'csrf-token validation failed',
					req.headers.origin,
					csrfHeader
				);
				return res
					.status(403)
					.json({ message: 'csrf-token validation failed' });
			}
			next();
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ message: 'something went wrong' });
		});
};
