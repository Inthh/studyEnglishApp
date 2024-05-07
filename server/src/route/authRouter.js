import express from 'express';

import { authController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.post('/login', authController.login);
router.put('/logout', authController.logout);
router.post('/register', authController.register);
router.patch('/refresh-token', authController.refreshToken);
router.patch('/password/change', authentication, authController.changePassword);
router.patch('/password/forgot', authController.forgotPassword);
router.patch('/password/reset', authController.resetPassword);

export default router;
