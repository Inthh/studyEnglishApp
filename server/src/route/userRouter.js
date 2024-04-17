import express from 'express';

import { userController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/:userId', authentication, userController.getInfo);
router.patch('/', authentication, userController.updateInfo);

export default router;
