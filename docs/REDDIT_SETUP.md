# Reddit API Setup Guide

## Overview
Reddit uses OAuth2 for authentication. For a persistent bot that can post on your behalf, we use a **Script App** and a **Refresh Token**. We use the `snoowrap` library which handles token refreshing automatically once set up.

---

## Step 1: Create a Reddit App

1. Go to [Reddit App Preferences](https://www.reddit.com/prefs/apps) (you must be logged in).
2. Scroll to the bottom and click **"are you a developer? create an app..."**
3. Fill in the following:
   - **Name**: "Rosie Pham Bot" (or your choice)
   - **Type**: Select **"script"** (This is critical!)
   - **Description**: "Social media manager for Rosie Pham Official"
   - **About URL**: (Can be left blank or your website URL)
   - **Redirect URI**: `http://localhost:8080/` (Even for scripts, Reddit requires a valid URI here)
4. Click **"create app"**.

---

## Step 2: Get Client ID and Client Secret

1. Once the app is created, you will see your **Client ID** right under the app name (a string of random characters).
2. You will see your **Client Secret** next to the word "secret".
3. **Copy both** - you'll need these for your `.env` file.

---

## Step 3: Get your Refresh Token

Because you are the owner of the bot, you need to authorize it once to get a refresh token so it can post forever without you logging in every hour.

The easiest way to do this without writing more code is to use a tool like the **Reddit OAuth Helper**.

1. Visit: [Reddit OAuth Helper](https://not-an-aardvark.github.io/reddit-oauth-helper/)
2. Enter your **Client ID** and **Client Secret** from Step 2.
3. In "Scopes", select: `submit`, `identity`, `read`.
4. Click **"Generate Tokens"**.
5. Reddit will ask you to authorize the app. Click **"Authorize"**.
6. The tool will display a **Refresh Token**.
7. **Copy the Refresh Token**.

---

## Step 4: Update .env File

Add your credentials to `.env`:

```env
# Reddit Credentials
REDDIT_USER_AGENT="rosie-bot:v1.0.0 (by /u/YOUR_REDDIT_USERNAME)"
REDDIT_CLIENT_ID=YOUR_CLIENT_ID
REDDIT_CLIENT_SECRET=YOUR_CLIENT_SECRET
REDDIT_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
```

---

## Step 5: Test Your Setup

Run the test script:
```bash
npm run test:reddit
```

---

## Troubleshooting

- **"Invalid OAuth access token"**: Your Refresh Token might be invalid or the Client ID/Secret don't match.
- **"User-Agent required"**: Reddit is very strict about User-Agents. Make sure it follow the format `platform:app_id:version (by /u/username)`.
- **403 Forbidden**: Your app might not have the `submit` scope authorized, or you are trying to post to a subreddit where you are banned or that requires special flair.

---

## Security Notes

- **Never share your Client Secret or Refresh Token**.
- A Refresh Token allows the holder to post as you indefinitely.
- You can revoke access at any time in your [Reddit App Settings](https://www.reddit.com/prefs/apps).
