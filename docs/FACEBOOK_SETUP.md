# Facebook API Setup Guide

## Overview
Facebook, Instagram, and Threads all use Meta's Graph API. You'll need:
1. A Meta (Facebook) Developer Account
2. A Facebook App
3. A Facebook Page (for posting)
4. Access Tokens with proper permissions

---

## Step 1: Create a Meta Developer Account

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **"Get Started"** in the top right
3. Log in with your Facebook account
4. Complete the registration process

---

## Step 2: Create a New App

1. Go to [My Apps](https://developers.facebook.com/apps)
2. Click **"Create App"**
3. Select **"Business"** as the app type
4. Fill in:
   - **App Name**: "Rosie Pham Social Manager" (or your choice)
   - **App Contact Email**: Your email
   - **Business Account**: Select or create one
5. Click **"Create App"**

---

## Step 3: Add Required Products

In your app dashboard, add these products:

### For Facebook Pages:
1. Click **"Add Product"**
2. Find **"Facebook Login"** → Click **"Set Up"**
3. Also add **"Pages API"** if available

### For Instagram:
1. Add **"Instagram Graph API"**

### For Threads:
1. Add **"Threads API"** (if available in your region)

---

## Step 4: Configure Facebook Login

1. Go to **Facebook Login** → **Settings**
2. Add these **Valid OAuth Redirect URIs**:
   ```
   https://developers.facebook.com/tools/explorer/callback
   http://localhost:3001/auth/callback
   ```
3. Save changes

---

## Step 5: Get Your Access Token

### Option A: Using Graph API Explorer (Quick Test)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click **"Generate Access Token"**
4. Select these permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_engagement`
   - `business_management` (if available)
5. Click **"Generate Access Token"**
6. **Important**: This is a short-lived token (1 hour)

### Option B: Get a Long-Lived User Access Token (Recommended)

After getting the short-lived token from Graph API Explorer:

1. Go to [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
2. Paste your short-lived token
3. Click **"Debug"**
4. Note the expiration time
5. To extend it, use this URL (replace values):
   ```
   https://graph.facebook.com/v19.0/oauth/access_token?
   grant_type=fb_exchange_token&
   client_id=YOUR_APP_ID&
   client_secret=YOUR_APP_SECRET&
   fb_exchange_token=YOUR_SHORT_LIVED_TOKEN
   ```
6. This gives you a token that lasts 60 days

### Option C: Get a Page Access Token (Best for posting)

1. Use the long-lived user token to get your pages:
   ```
   https://graph.facebook.com/v19.0/me/accounts?access_token=YOUR_USER_TOKEN
   ```
2. Find your page in the response
3. Copy the `access_token` for that page
4. **This token doesn't expire** as long as the app is active!

---

## Step 6: Get Your Facebook Page ID

### Method 1: From Graph API Explorer
1. In Graph API Explorer, use your token
2. Make a GET request to: `/me/accounts`
3. Find your page and copy the `id`

### Method 2: From Your Page
1. Go to your Facebook Page
2. Click **"About"**
3. Scroll down to find **"Page ID"**

### Method 3: From URL
1. Go to your page
2. Look at the URL: `facebook.com/YourPageName`
3. Use Graph API: `https://graph.facebook.com/v19.0/YourPageName`

---

## Step 7: Update .env File

Add your credentials to `.env`:

```env
# Meta Access Token (Long-lived User Token or Page Token)
META_USER_ACCESS_TOKEN=YOUR_LONG_LIVED_TOKEN_HERE

# Facebook Page ID
FACEBOOK_PAGE_ID=YOUR_PAGE_ID_HERE
```

---

## Step 8: Test Your Setup

Run the test script:
```bash
npm run test:facebook
```

---

## Important Notes

### Access Token Types:
1. **User Access Token**: 
   - Short-lived: 1 hour
   - Long-lived: 60 days
   - Use for initial setup

2. **Page Access Token**:
   - Never expires (as long as app is active)
   - **Best for automated posting**
   - Get from `/me/accounts` endpoint

3. **App Access Token**:
   - Never expires
   - Limited permissions
   - Not recommended for posting

### Permissions Required:
- `pages_show_list` - To see your pages
- `pages_read_engagement` - To read page data
- `pages_manage_posts` - **Required for posting**
- `pages_manage_engagement` - For comments/reactions

### Common Issues:

**"Invalid OAuth access token"**
- Token expired → Get a new long-lived token
- Wrong permissions → Re-generate with correct permissions

**"(#200) Requires extended permission: pages_manage_posts"**
- Need to add this permission in Graph API Explorer
- May need to submit app for review (for public use)

**"Page ID not found"**
- Make sure you're an admin of the page
- Use the correct Page ID (not User ID)

### App Review (For Production):

For personal/testing use, you don't need app review. But for public use:
1. Go to **App Review** in your app dashboard
2. Request permissions: `pages_manage_posts`, etc.
3. Provide use case and demo
4. Wait for approval (can take days/weeks)

---

## Quick Reference

### Get App Credentials:
- **App ID**: App Dashboard → Settings → Basic
- **App Secret**: App Dashboard → Settings → Basic (click "Show")

### Useful Endpoints:
```
# Get your pages
GET /me/accounts

# Get page info
GET /{page-id}

# Post to page
POST /{page-id}/feed

# Debug token
GET /debug_token?input_token={token}
```

### Testing URLs:
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
- [Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## Security Best Practices

1. **Never commit tokens to git** (already in .gitignore)
2. **Use Page Tokens** for posting (more secure than user tokens)
3. **Rotate tokens regularly** (every 60 days for user tokens)
4. **Monitor token usage** in App Dashboard → Analytics
5. **Revoke old tokens** when no longer needed

---

## Next Steps

After setup:
1. Test with the test script
2. Set up Instagram (uses same token + Instagram Account ID)
3. Set up Threads (uses same token + Threads User ID)
