import express from 'express';

import { userController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/:userId', authentication, userController.getInfo);

export default router;
