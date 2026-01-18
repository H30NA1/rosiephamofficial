# Social Media API Backend - Complete Implementation

## ✅ Implemented Platforms

All 6 social media platforms are now fully implemented with modular backend endpoints:

### 1. **Telegram** ✅
- **Endpoint**: `POST /api/socials/telegram/send`
- **Library**: Native Axios (Telegram Bot API)
- **Credentials Required**:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- **Features**: Text messages, HTML formatting support
- **Setup**: Talk to @BotFather on Telegram

### 2. **Reddit** ✅
- **Endpoint**: `POST /api/socials/reddit/post`
- **Library**: `snoowrap`
- **Credentials Required**:
  - `REDDIT_CLIENT_ID`
  - `REDDIT_CLIENT_SECRET`
  - `REDDIT_REFRESH_TOKEN`
  - `REDDIT_USER_AGENT`
- **Features**: Text posts, Link posts
- **Note**: Requires OAuth2 approval process (new Reddit policy 2025)

### 3. **Twitter (X)** ✅
- **Endpoint**: `POST /api/socials/twitter/post`
- **Library**: `twitter-api-v2`
- **Credentials Required**:
  - `TWITTER_APP_KEY`
  - `TWITTER_APP_SECRET`
  - `TWITTER_ACCESS_TOKEN`
  - `TWITTER_ACCESS_SECRET`
- **Features**: Text tweets
- **Note**: Media upload can be added later

### 4. **Facebook** ✅
- **Endpoint**: `POST /api/socials/facebook/post`
- **Library**: Native Axios (Graph API v19.0)
- **Credentials Required**:
  - `META_USER_ACCESS_TOKEN`
  - `FACEBOOK_PAGE_ID`
- **Features**: Text posts, Link previews
- **Note**: Posts to Facebook Pages

### 5. **Instagram** ✅
- **Endpoint**: `POST /api/socials/instagram/post`
- **Library**: Native Axios (Graph API v19.0)
- **Credentials Required**:
  - `META_USER_ACCESS_TOKEN`
  - `INSTAGRAM_ACCOUNT_ID`
- **Features**: Image posts with captions (2-step: Container → Publish)
- **Note**: Requires public image URL

### 6. **Threads** ✅
- **Endpoint**: `POST /api/socials/threads/post`
- **Library**: Native Axios (Threads Graph API v1.0)
- **Credentials Required**:
  - `META_USER_ACCESS_TOKEN`
  - `THREADS_USER_ID`
- **Features**: Text posts, Image posts (2-step: Container → Publish)
- **Note**: 2-second delay for media processing

---

## 📁 Project Structure

```
server/socials/
├── index.js              # Main router
├── telegram/
│   ├── index.js
│   └── send/
│       └── index.js      # ✅ Implementation
├── reddit/
│   ├── index.js
│   └── post/
│       └── index.js      # ✅ Implementation
├── twitter/
│   ├── index.js
│   └── post/
│       └── index.js      # ✅ Implementation
├── facebook/
│   ├── index.js
│   └── post/
│       └── index.js      # ✅ Implementation
├── instagram/
│   ├── index.js
│   └── post/
│       └── index.js      # ✅ Implementation
└── threads/
    ├── index.js
    └── post/
        └── index.js      # ✅ Implementation
```

---

## 🔧 Environment Variables

All credentials are stored in `.env`:

```env
# Telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Reddit
REDDIT_USER_AGENT="rosie-bot:v1.0.0 (by /u/YOUR_USERNAME)"
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_REFRESH_TOKEN=

# Twitter (X)
TWITTER_APP_KEY=
TWITTER_APP_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=

# Meta (Facebook, Instagram, Threads)
META_USER_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=
INSTAGRAM_ACCOUNT_ID=
THREADS_USER_ID=
```

---

## 🚀 Usage Examples

### Telegram
```bash
POST http://localhost:3001/api/socials/telegram/send
{
  "content": "Hello from Rosie Pham Bot!"
}
```

### Reddit
```bash
POST http://localhost:3001/api/socials/reddit/post
{
  "title": "My Trading Insights",
  "content": "Here are my thoughts on gold trading...",
  "subreddit": "u_RosiePham_Test"
}
```

### Twitter
```bash
POST http://localhost:3001/api/socials/twitter/post
{
  "content": "Just posted a new trading analysis! 📈"
}
```

### Facebook
```bash
POST http://localhost:3001/api/socials/facebook/post
{
  "content": "Check out my latest trading tips!"
}
```

### Instagram
```bash
POST http://localhost:3001/api/socials/instagram/post
{
  "content": "New trading strategy explained 💰",
  "media": ["https://example.com/image.jpg"]
}
```

### Threads
```bash
POST http://localhost:3001/api/socials/threads/post
{
  "content": "Quick market update for today!",
  "media": ["https://example.com/chart.jpg"]  # Optional
}
```

---

## 📝 Next Steps

1. **Get Credentials**: Fill in all the empty values in `.env`
2. **Test Endpoints**: Use Postman or curl to test each platform
3. **Add Media Support**: Enhance Twitter/Reddit to support image uploads
4. **Error Handling**: Add retry logic and better error messages
5. **Rate Limiting**: Implement rate limiting to avoid API bans
6. **Logging**: Add comprehensive logging for debugging

---

## 🔐 Security Notes

- Never commit `.env` to version control
- Use long-lived tokens for Meta platforms (or implement token refresh)
- Reddit requires approval for new OAuth tokens (2025 policy)
- Twitter API has strict rate limits
- All credentials support override via request body for multi-account support

---

## 📚 Documentation Links

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Reddit API](https://www.reddit.com/dev/api/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [Threads API](https://developers.facebook.com/docs/threads)
