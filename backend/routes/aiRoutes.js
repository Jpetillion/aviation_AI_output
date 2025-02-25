import express from 'express';
import { processQuestion } from '../controllers/aiController.js';

const router = express.Router();

router.post('/ask-ai', processQuestion);

export default router;
