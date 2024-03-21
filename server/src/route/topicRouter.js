import express from 'express';

import { topicController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authentication, topicController.getAllTopic);

export default router;
