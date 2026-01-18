import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const post_facebook_post = async (req, res) => {
  try {
    const { content, media, credentials } = req.body;

    // 1. Get Credentials
    const accessToken = credentials?.accessToken || process.env.META_USER_ACCESS_TOKEN;
    const pageId = credentials?.pageId || process.env.FACEBOOK_PAGE_ID;

    if (!accessToken || !pageId) {
      return res.status(400).json({
        success: false,
        error: 'Missing Facebook credentials. Need META_USER_ACCESS_TOKEN and FACEBOOK_PAGE_ID in .env'
      });
    }

    // 2. Prepare URL
    const baseUrl = `https://graph.facebook.com/v19.0/${pageId}/feed`;

    console.log(`Posting to Facebook Page ${pageId}...`);

    let response;

    // 3. Post Logic
    // For simple text post: message
    // For link: link
    // For photo: we should use /{page-id}/photos endpoint, but for now let's stick to feed with link/message

    // If media is a URL, we can treat it as a link or picture
    if (media && media.length > 0) {
      // Checking if it looks like an image URL or just a link
      // For simplicity, treating as 'link' param which renders preview
      response = await axios.post(baseUrl, {
        message: content,
        link: media[0],
        access_token: accessToken
      });
    } else {
      response = await axios.post(baseUrl, {
        message: content,
        access_token: accessToken
      });
    }

    console.log('Facebook post success:', response.data.id);

    res.status(200).json({
      success: true,
      platform: 'facebook',
      action: 'post',
      data: response.data
    });

  } catch (error) {
    console.error('Facebook post error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data.error.message : error.message
    });
  }
};

export default post_facebook_post;