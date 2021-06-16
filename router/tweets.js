import express from 'express';
import controller from '../controller/tweets.js';

const router = express.Router();

router.get('/', controller.getList);

router.get('/:id', controller.getById);

router.post('/', controller.addTweet);

router.put('/:id', controller.updateTweet);

router.delete('/:id', controller.deleteTweet);

export default router;
