import express from 'express';

import { authController } from '../controllers/index.js';

const router = express.Router();

router.post('/login', authController.login);
router.put('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/password/reset', authController.resetPassword);

export default router;
