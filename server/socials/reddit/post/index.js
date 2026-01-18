import Snoowrap from 'snoowrap';
import dotenv from 'dotenv';

dotenv.config();

const post_reddit_post = async (req, res) => {
  try {
    const { content, media, credentials, subreddit, title } = req.body;

    // 1. Get Credentials
    const clientId = credentials?.clientId || process.env.REDDIT_CLIENT_ID;
    const clientSecret = credentials?.clientSecret || process.env.REDDIT_CLIENT_SECRET;
    const refreshToken = credentials?.refreshToken || process.env.REDDIT_REFRESH_TOKEN;
    const userAgent = credentials?.userAgent || process.env.REDDIT_USER_AGENT;

    // Default valid target
    const targetSubreddit = subreddit || 'u_RosiePham_Test'; // Posting to user profile by default if not specified

    if (!clientId || !clientSecret || !refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Missing Reddit credentials. Check .env or body.'
      });
    }

    // 2. Initialize Snoowrap
    const r = new Snoowrap({
      userAgent,
      clientId,
      clientSecret,
      refreshToken
    });

    console.log(`Posting to Reddit (Sub: ${targetSubreddit})...`);

    // 3. Post Logic
    // If we have an image URL in 'media', we post a Link post (or submitLink). 
    // Actual image upload requires more steps, so assuming 'media' is a URL to an image.
    // If just text, we submitSelfpost.

    let submission;

    if (media && media.length > 0) {
      // Assume media[0] is a URL
      // Note: subbitLink is for external links. For uploading images directly to Reddit hosting, need submitImage (less standard in snoowrap older versions but let's try link first)
      submission = await r.getSubreddit(targetSubreddit).submitLink({
        title: title || content.substring(0, 50) + '...',
        url: media[0]
      });
    } else {
      submission = await r.getSubreddit(targetSubreddit).submitSelfpost({
        title: title || content.substring(0, 50) + '...',
        text: content
      });
    }

    console.log('Reddit post success:', submission.name);

    res.status(200).json({
      success: true,
      platform: 'reddit',
      action: 'post',
      message: 'Posted successfully',
      data: { id: submission.name, url: submission.url }
    });

  } catch (error) {
    console.error('Reddit post error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default post_reddit_post;