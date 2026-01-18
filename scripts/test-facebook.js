import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const META_USER_ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;

console.log('🔵 Facebook API Test Script');
console.log('============================\n');

// Check if credentials are set
if (!META_USER_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    console.error('❌ Error: Missing Facebook credentials!');
    console.error('\nPlease set the following in your .env file:');
    console.error('  META_USER_ACCESS_TOKEN=your_access_token');
    console.error('  FACEBOOK_PAGE_ID=your_page_id');
    console.error('\nSee docs/FACEBOOK_SETUP.md for setup instructions.');
    process.exit(1);
}

console.log('✅ Credentials found');
console.log(`   Access Token: ${META_USER_ACCESS_TOKEN.substring(0, 20)}...`);
console.log(`   Page ID: ${FACEBOOK_PAGE_ID}\n`);

// Test 1: Validate Access Token
async function testTokenValidity() {
    console.log('🔐 Test 1: Validating access token...');
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v19.0/debug_token`,
            {
                params: {
                    input_token: META_USER_ACCESS_TOKEN,
                    access_token: META_USER_ACCESS_TOKEN
                }
            }
        );

        const data = response.data.data;
        console.log('✅ Token is valid!');
        console.log(`   App ID: ${data.app_id}`);
        console.log(`   Type: ${data.type}`);
        console.log(`   Expires: ${data.expires_at ? new Date(data.expires_at * 1000).toLocaleString() : 'Never'}`);
        console.log(`   Scopes: ${data.scopes?.join(', ') || 'N/A'}\n`);
        return true;
    } catch (error) {
        console.error('❌ Token validation failed');
        console.error(`   Error: ${error.response?.data?.error?.message || error.message}\n`);
        return false;
    }
}

// Test 2: Get Page Information
async function testPageInfo() {
    console.log('📄 Test 2: Getting page information...');
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}`,
            {
                params: {
                    fields: 'id,name,username,category,fan_count,access_token',
                    access_token: META_USER_ACCESS_TOKEN
                }
            }
        );

        const page = response.data;
        console.log('✅ Page found!');
        console.log(`   Name: ${page.name}`);
        console.log(`   Username: @${page.username || 'N/A'}`);
        console.log(`   Category: ${page.category}`);
        console.log(`   Followers: ${page.fan_count || 'N/A'}`);

        if (page.access_token) {
            console.log(`   ⭐ Page has its own access token (recommended for posting!)`);
        }
        console.log();
        return true;
    } catch (error) {
        console.error('❌ Failed to get page info');
        console.error(`   Error: ${error.response?.data?.error?.message || error.message}\n`);
        return false;
    }
}

// Test 3: Check Permissions
async function testPermissions() {
    console.log('🔑 Test 3: Checking permissions...');
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v19.0/me/permissions`,
            {
                params: {
                    access_token: META_USER_ACCESS_TOKEN
                }
            }
        );

        const permissions = response.data.data;
        const granted = permissions.filter(p => p.status === 'granted');
        const declined = permissions.filter(p => p.status === 'declined');

        console.log('✅ Permissions retrieved!');
        console.log(`   Granted (${granted.length}):`);
        granted.forEach(p => console.log(`     - ${p.permission}`));

        if (declined.length > 0) {
            console.log(`   ⚠️  Declined (${declined.length}):`);
            declined.forEach(p => console.log(`     - ${p.permission}`));
        }

        // Check for required permission
        const hasPostPermission = granted.some(p => p.permission === 'pages_manage_posts');
        if (hasPostPermission) {
            console.log('   ✅ Has pages_manage_posts permission (can post!)\n');
        } else {
            console.log('   ⚠️  Missing pages_manage_posts permission (cannot post!)\n');
        }

        return hasPostPermission;
    } catch (error) {
        console.error('❌ Failed to check permissions');
        console.error(`   Error: ${error.response?.data?.error?.message || error.message}\n`);
        return false;
    }
}

// Test 4: Post to Facebook Page
async function testPost() {
    console.log('📤 Test 4: Posting to Facebook page...');
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}/feed`,
            {
                message: `🎉 Test Post from Rosie Pham Social Manager

This is an automated test post to verify the Facebook API integration is working correctly.

✅ Backend server is connected
✅ Access token is valid
✅ Posting permissions verified

Time: ${new Date().toLocaleString()}`,
                access_token: META_USER_ACCESS_TOKEN
            }
        );

        console.log('✅ Post created successfully!');
        console.log(`   Post ID: ${response.data.id}`);
        console.log(`   View at: https://facebook.com/${response.data.id}\n`);
        return true;
    } catch (error) {
        console.error('❌ Failed to create post');
        console.error(`   Error: ${error.response?.data?.error?.message || error.message}`);
        console.error(`   Code: ${error.response?.data?.error?.code}`);
        console.error(`   Type: ${error.response?.data?.error?.type}\n`);
        return false;
    }
}

// Test 5: Test via Backend API
async function testBackendAPI() {
    console.log('🔌 Test 5: Testing via backend API...');
    try {
        const response = await axios.post(
            'http://localhost:3001/api/socials/facebook/post',
            {
                content: `✨ Backend API Test Successful!

This post was sent through the Rosie Pham Social Manager backend API.

Your Facebook integration is fully operational! 🚀

Time: ${new Date().toLocaleString()}`
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
    console.log('Starting Facebook API tests...\n');

    const results = {
        tokenValidity: await testTokenValidity(),
        pageInfo: await testPageInfo(),
        permissions: await testPermissions(),
        post: false,
        backendAPI: false
    };

    // Only test posting if permissions are granted
    if (results.permissions) {
        results.post = await testPost();
        results.backendAPI = await testBackendAPI();
    } else {
        console.log('⚠️  Skipping post tests due to missing permissions\n');
    }

    console.log('============================');
    console.log('📊 Test Results Summary');
    console.log('============================');
    console.log(`Token Validity:    ${results.tokenValidity ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Page Info:         ${results.pageInfo ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Permissions:       ${results.permissions ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Direct Post:       ${results.post ? '✅ PASS' : results.permissions ? '❌ FAIL' : '⏭️  SKIP'}`);
    console.log(`Backend API:       ${results.backendAPI ? '✅ PASS' : results.permissions ? '❌ FAIL' : '⏭️  SKIP'}`);

    const totalTests = Object.keys(results).length;
    const totalPassed = Object.values(results).filter(r => r).length;

    console.log(`\n${totalPassed}/${totalTests} tests passed`);

    if (totalPassed === totalTests) {
        console.log('\n🎉 All tests passed! Your Facebook integration is working perfectly!');
    } else if (results.tokenValidity && results.pageInfo && results.permissions) {
        console.log('\n✅ Setup is correct! Some tests failed but credentials are valid.');
    } else {
        console.log('\n⚠️  Some tests failed. Check the errors above and see docs/FACEBOOK_SETUP.md');
    }
}

// Run the tests
runAllTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
