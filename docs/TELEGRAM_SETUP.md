# Telegram Bot Setup Guide

## Step 1: Create a Telegram Bot

1. Open Telegram app on your phone or desktop
2. Search for **@BotFather** (official Telegram bot)
3. Start a chat and send: `/newbot`
4. Follow the prompts:
   - Choose a name for your bot (e.g., "Rosie Pham Bot")
   - Choose a username (must end in 'bot', e.g., "rosiepham_trading_bot")
5. BotFather will give you a **token** that looks like:
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```
6. **Copy this token** - you'll need it for `.env`

## Step 2: Get Your Chat ID

### Option A: Send to Yourself (Private Chat)
1. Search for your bot username in Telegram
2. Click "Start" or send any message to your bot
3. Open this URL in your browser (replace YOUR_TOKEN):
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
4. Look for `"chat":{"id":123456789}` in the JSON response
5. Copy that number (your chat ID)

### Option B: Send to a Group/Channel
1. Create a group or channel in Telegram
2. Add your bot to the group/channel
3. Send a message in the group
4. Visit the same URL as above
5. Look for the chat ID (will be negative for groups, e.g., -1001234567890)

## Step 3: Update .env File

Add your credentials to `.env`:
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Step 4: Test Your Bot

Run the test script:
```bash
node scripts/test-telegram.js
```

## Troubleshooting

- **"Unauthorized"**: Check your bot token is correct
- **"Chat not found"**: Make sure you've started the bot or added it to the group
- **No messages**: Check the chat ID is correct (use /getUpdates)

## Security Notes

- Never share your bot token publicly
- The token gives full control of your bot
- You can revoke and regenerate tokens via @BotFather using `/revoke`
