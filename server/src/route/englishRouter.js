import express from 'express';

import { englishController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.post('/check-grammar', authentication, englishController.checkGrammar);

export default router;