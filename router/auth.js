import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { authMiddleware } from '../middleware/auth.js';
import controller from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage('username should be at least 3 characters'),
	body('password')
		.trim()
		.isLength({ min: 5 })
		.withMessage('Password should be at least 5 characters'),
	validate,
];

const validateSignup = [
	...validateCredential,
	body('name').notEmpty().withMessage('Name is required'),
	body('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('invalid email address'),
	body('url')
		.isURL()
		.withMessage('invalid URL')
		.optional({ nullable: true, checkFalsy: true }),
	validate,
];

router.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));

router.post('/signup', validateSignup, controller.signup);

router.post('/login', validateCredential, controller.login);

router.get('/me', authMiddleware, controller.me);

//for dev
router.get('/users', authMiddleware, controller.users);

export default router;
