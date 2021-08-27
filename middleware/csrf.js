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
	const csrfHeader = req.get('X-CSRF-Token');

	if (!csrfHeader) {
		console.warn('"X-CSRF-Token" is missing', req.headers.origin);
		return res.status(403).json({ message: '"X-CSRF-Token" is missing' });
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
