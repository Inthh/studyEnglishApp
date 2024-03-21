import express from 'express';

import { vocaSetsController } from '../controllers/index.js';

const router = express.Router();

router.get('/', vocaSetsController.getAllVocaSets);

export default router;
