import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const post_twitter_post = async (req, res) => {
  try {
    const { content, media, credentials } = req.body;

    // 1. Get Credentials
    const appKey = credentials?.appKey || process.env.TWITTER_APP_KEY;
    const appSecret = credentials?.appSecret || process.env.TWITTER_APP_SECRET;
    const accessToken = credentials?.accessToken || process.env.TWITTER_ACCESS_TOKEN;
    const accessSecret = credentials?.accessSecret || process.env.TWITTER_ACCESS_SECRET;

    if (!appKey || !appSecret || !accessToken || !accessSecret) {
      return res.status(400).json({
        success: false,
        error: 'Missing Twitter credentials. Check .env or body.'
      });
    }

    // 2. Initialize Client
    const client = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    });

    const rwClient = client.readWrite;

    console.log('Posting to Twitter (X)...');

    let tweet;

    // 3. Post Logic
    if (media && media.length > 0) {
      // Upload media first (v1.1 API still used for media upload usually, wrapper handles it)
      // Assuming 'media' is an array of local paths or buffers. If URLs, we need to download them first.
      // For simplicity/demo: user passes content text only.
      // TODO: Implement media upload from URL if needed.

      // Setup for just text for now to avoid complexity of downloading files
      tweet = await rwClient.v2.tweet(content);
    } else {
      tweet = await rwClient.v2.tweet(content);
    }

    console.log('Twitter post success:', tweet.data.id);

    res.status(200).json({
      success: true,
      platform: 'twitter',
      action: 'post',
      data: tweet.data
    });

  } catch (error) {
    console.error('Twitter post error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default post_twitter_post;