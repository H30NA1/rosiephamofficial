import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const post_telegram_send = async (req, res) => {
  try {
    const { content, media } = req.body;

    // 1. Get Credentials
    // We prefer credentials passed in body (for modularity if user wants to switch bots), 
    // but fallback to env vars for default bot.
    const token = req.body.credentials?.token || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = req.body.credentials?.chatId || process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(400).json({
        success: false,
        error: 'Missing Telegram credentials. Please provide token and chatId in body or Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env'
      });
    }

    // 2. Prepare URL
    const baseUrl = `https://api.telegram.org/bot${token}`;

    let response;

    // 3. Send Logic
    // If there is media (image), we normally use sendPhoto. 
    // For now, let's implement text message support (sendMessage).
    if (content) {
      console.log(`Sending Telegram message to ${chatId}...`);
      response = await axios.post(`${baseUrl}/sendMessage`, {
        chat_id: chatId,
        text: content,
        parse_mode: 'HTML' // Allows bold/italic in text
      });
    } else {
      return res.status(400).json({ success: false, error: 'Content is required' });
    }

    // 4. Return Success
    console.log('Telegram post success:', response.data);
    res.status(200).json({
      success: true,
      platform: 'telegram',
      action: 'send',
      data: response.data
    });

  } catch (error) {
    console.error('Telegram send error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data.description : error.message
    });
  }
};

export default post_telegram_send;