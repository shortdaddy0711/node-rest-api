import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import controller from '../controller/tweets.js';

const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Minimum length of text is 3'),
    validate,
];

router.get('/', controller.getList);

router.get('/:id', controller.getById);

router.post('/', validateTweet, controller.addTweet);

router.put('/:id', validateTweet, controller.updateTweet);

router.delete('/:id', controller.deleteTweet);

export default router;
