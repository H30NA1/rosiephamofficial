import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const post_instagram_post = async (req, res) => {
  try {
    const { content, media, credentials } = req.body;

    // 1. Get Credentials
    const accessToken = credentials?.accessToken || process.env.META_USER_ACCESS_TOKEN;
    const accountId = credentials?.accountId || process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !accountId) {
      return res.status(400).json({
        success: false,
        error: 'Missing Instagram credentials. Need META_USER_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID in .env'
      });
    }

    if (!media || media.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Instagram requires an image URL (media).'
      });
    }

    const imageUrl = media[0]; // Must be a public URL
    const baseUrl = `https://graph.facebook.com/v19.0/${accountId}`;

    console.log(`Posting to Instagram Account ${accountId}...`);

    // 2. Create Media Container
    console.log('Step 1: Creating Media Container...');
    const containerResponse = await axios.post(`${baseUrl}/media`, {
      image_url: imageUrl,
      caption: content,
      access_token: accessToken
    });

    const containerId = containerResponse.data.id;
    console.log('Container ID:', containerId);

    // 3. Publish Media
    // Instagram needs a moment sometimes, but usually API is synchronous enough for the ID.
    // However, sometimes checking status is required. For this implementation we try to publish immediately.
    console.log('Step 2: Publishing Media...');
    const publishResponse = await axios.post(`${baseUrl}/media_publish`, {
      creation_id: containerId,
      access_token: accessToken
    });

    console.log('Instagram post success:', publishResponse.data.id);

    res.status(200).json({
      success: true,
      platform: 'instagram',
      action: 'post',
      data: publishResponse.data
    });

  } catch (error) {
    console.error('Instagram post error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data.error.message : error.message
    });
  }
};

export default post_instagram_post;