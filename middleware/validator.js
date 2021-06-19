import { validationResult } from 'express-validator';

// handling validation errors
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	return res.status(400).json({ message: errors.array() });
};
