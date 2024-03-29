import express from 'express';

import { topicController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authentication, topicController.getAllTopic);
router.get('/total', authentication, topicController.getTotalTopics);

export default router;
