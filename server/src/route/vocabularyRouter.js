import express from 'express';

import { vocaController } from '../controllers/index.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authentication, vocaController.getVocabularies);
router.patch('/', authentication, vocaController.updateMemoried);

export default router;
