import Snoowrap from 'snoowrap';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REFRESH_TOKEN = process.env.REDDIT_REFRESH_TOKEN;
const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT;

console.log('🧡 Reddit API Test Script');
console.log('============================\n');

// Check if credentials are set
if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_REFRESH_TOKEN) {
    console.error('❌ Error: Missing Reddit credentials!');
    console.error('\nPlease set the following in your .env file:');
    console.error('  REDDIT_CLIENT_ID=your_client_id');
    console.error('  REDDIT_CLIENT_SECRET=your_client_secret');
    console.error('  REDDIT_REFRESH_TOKEN=your_refresh_token');
    console.error('  REDDIT_USER_AGENT=your_app_name (e.g. rosie-bot:v1)');
    console.error('\nSee docs/REDDIT_SETUP.md for setup instructions.');
    process.exit(1);
}

console.log('✅ Credentials found');
console.log(`   Client ID: ${REDDIT_CLIENT_ID}`);
console.log(`   User Agent: ${REDDIT_USER_AGENT}\n`);

// Initialize Snoowrap
const r = new Snoowrap({
    userAgent: REDDIT_USER_AGENT,
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    refreshToken: REDDIT_REFRESH_TOKEN
});

// Test 1: Validate Authentication
async function testAuth() {
    console.log('🔐 Test 1: Validating Reddit authentication...');
    try {
        const me = await r.getMe();
        console.log('✅ Authentication successful!');
        console.log(`   Logged in as: /u/${me.name}`);
        console.log(`   Total Karma: ${me.link_karma + me.comment_karma}`);
        console.log(`   Created: ${new Date(me.created_utc * 1000).toLocaleDateString()}\n`);
        return me.name;
    } catch (error) {
        console.error('❌ Authentication failed');
        console.error(`   Error: ${error.message}\n`);
        return null;
    }
}

// Test 2: Try to post to user profile (safest)
async function testPost(username) {
    if (!username) return false;

    console.log(`📤 Test 2: Posting to your own profile (/u/${username})...`);
    try {
        const title = `🚀 Backend Test: ${new Date().toLocaleString()}`;
        const text = 'Testing the Reddit API integration for Rosie Pham Official social manager. If you see this, the integration is working!';

        // Posting to user's own profile is usually permitted without moderator approval
        const submission = await r.submitSelfpost({
            subredditName: `u_${username}`,
            title: title,
            text: text
        });

        console.log('✅ Post successful!');
        console.log(`   Post ID: ${submission.name}`);
        console.log(`   View at: https://reddit.com${submission.permalink}\n`);
        return true;
    } catch (error) {
        console.error('❌ Failed to create post');
        console.error(`   Error: ${error.message}\n`);
        return false;
    }
}

// Test 3: Test via Backend API
async function testBackendAPI(username) {
    console.log('🔌 Test 3: Testing via backend API...');
    try {
        const response = await axios.post(
            'http://localhost:3001/api/socials/reddit/post',
            {
                title: `🔧 Backend API Test: ${new Date().toLocaleTimeString()}`,
                content: 'This post verifies that the Express backend can communicate with Reddit.',
                subreddit: `u_${username}`
            }
        );

        if (response.data.success) {
            console.log('✅ Backend API test successful!');
            console.log(`   Platform: ${response.data.platform}`);
            console.log(`   Action: ${response.data.action}`);
            console.log(`   Post ID: ${response.data.data.id}\n`);
            return true;
        }
    } catch (error) {
        console.error('❌ Backend API test failed');
        console.error(`   Error: ${error.response?.data?.error || error.message}`);
        console.error('   Make sure your server is running (npm run dev)\n');
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('Starting Reddit API tests...\n');

    const username = await testAuth();
    const results = {
        auth: !!username,
        post: false,
        backendAPI: false
    };

    if (username) {
        results.post = await testPost(username);
        results.backendAPI = await testBackendAPI(username);
    }

    console.log('============================');
    console.log('📊 Test Results Summary');
    console.log('============================');
    console.log(`Authentication:    ${results.auth ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Profile Post:      ${results.post ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Backend API:       ${results.backendAPI ? '✅ PASS' : '❌ FAIL'}`);

    const totalPassed = Object.values(results).filter(r => r).length;
    const totalTests = Object.keys(results).length;

    console.log(`\n${totalPassed}/${totalTests} tests passed`);

    if (totalPassed === totalTests) {
        console.log('\n🎉 Reddit integration is fully working!');
    } else {
        console.log('\n⚠️  Check failed tests for details.');
    }
}

runAllTests().catch(console.error);
