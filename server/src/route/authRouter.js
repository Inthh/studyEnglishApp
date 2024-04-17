import express from 'express';

import { authController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.post('/login', authController.login);
router.put('/logout', authController.logout);
router.post('/register', authController.register);
router.patch('/password/reset', authentication, authController.resetPassword);

export default router;
