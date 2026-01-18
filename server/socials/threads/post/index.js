import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const post_threads_post = async (req, res) => {
  try {
    const { content, media, credentials } = req.body;

    // 1. Get Credentials
    const accessToken = credentials?.accessToken || process.env.META_USER_ACCESS_TOKEN;
    const userId = credentials?.userId || process.env.THREADS_USER_ID;

    if (!accessToken || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing Threads credentials. Need META_USER_ACCESS_TOKEN and THREADS_USER_ID in .env'
      });
    }

    const baseUrl = `https://graph.threads.net/v1.0/${userId}`;

    console.log(`Posting to Threads User ${userId}...`);

    // 2. Create Media Container
    console.log('Step 1: Creating Threads Container...');

    const containerPayload = {
      media_type: 'TEXT',
      text: content,
      access_token: accessToken
    };

    // If media is provided, change to IMAGE type
    if (media && media.length > 0) {
      containerPayload.media_type = 'IMAGE';
      containerPayload.image_url = media[0];
    }

    const containerResponse = await axios.post(`${baseUrl}/threads`, containerPayload);
    const containerId = containerResponse.data.id;
    console.log('Container ID:', containerId);

    // 3. Publish the Container
    // Threads recommends waiting ~30 seconds for media processing, but for text it's usually instant
    // For production, you might want to add a delay or status check here
    console.log('Step 2: Publishing Threads Container...');

    // Small delay for safety (especially if image)
    if (media && media.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    }

    const publishResponse = await axios.post(`${baseUrl}/threads_publish`, {
      creation_id: containerId,
      access_token: accessToken
    });

    console.log('Threads post success:', publishResponse.data.id);

    res.status(200).json({
      success: true,
      platform: 'threads',
      action: 'post',
      data: publishResponse.data
    });

  } catch (error) {
    console.error('Threads post error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data.error?.message || error.response.data : error.message
    });
  }
};

export default post_threads_post;