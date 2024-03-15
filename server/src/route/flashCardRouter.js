import express from 'express';

import { flashCardController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authentication, flashCardController.getAllFlashCard);

export default router;
