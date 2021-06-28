import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { authMiddleware } from '../middleware/auth.js';
import controller from '../controller/tweets.js';

const router = express.Router();

// validation and sanitization for text
const validateTweet = [
	body('text')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Minimum length of text is 3'),
	validate,
];

router.get('/', authMiddleware, controller.getList);

router.get('/:id', authMiddleware, controller.getById);

router.post('/', authMiddleware, validateTweet, controller.addTweet);

router.put('/:id', authMiddleware, validateTweet, controller.updateTweet);

router.delete('/:id', authMiddleware, controller.deleteTweet);

export default router;
