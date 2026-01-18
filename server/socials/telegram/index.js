import express from 'express';
import sendAction from './send/index.js';

const router = express.Router();

router.post('/send', sendAction);

export default router;