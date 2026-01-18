import express from 'express';
import postAction from './post/index.js';

const router = express.Router();

router.post('/post', postAction);

export default router;