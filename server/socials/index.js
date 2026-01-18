import express from 'express';
import redditRoutes from './reddit/index.js';
import threadsRoutes from './threads/index.js';
import instagramRoutes from './instagram/index.js';
import facebookRoutes from './facebook/index.js';
import telegramRoutes from './telegram/index.js';
import twitterRoutes from './twitter/index.js';

const router = express.Router();

router.use('/reddit', redditRoutes);
router.use('/threads', threadsRoutes);
router.use('/instagram', instagramRoutes);
router.use('/facebook', facebookRoutes);
router.use('/telegram', telegramRoutes);
router.use('/twitter', twitterRoutes);

export default router;