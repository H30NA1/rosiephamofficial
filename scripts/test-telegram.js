import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log('🤖 Telegram Bot Test Script');
console.log('============================\n');

// Check if credentials are set
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('❌ Error: Missing Telegram credentials!');
    console.error('\nPlease set the following in your .env file:');
    console.error('  TELEGRAM_BOT_TOKEN=your_bot_token');
    console.error('  TELEGRAM_CHAT_ID=your_chat_id');
    console.error('\nSee docs/TELEGRAM_SETUP.md for setup instructions.');
    process.exit(1);
}

console.log('✅ Credentials found');
console.log(`   Bot Token: ${TELEGRAM_BOT_TOKEN.substring(0, 20)}...`);
console.log(`   Chat ID: ${TELEGRAM_CHAT_ID}\n`);

// Test 1: Check bot info
async function testBotInfo() {
    console.log('📋 Test 1: Getting bot information...');
    try {
        const response = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
        );

        if (response.data.ok) {
            const bot = response.data.result;
            console.log('✅ Bot is valid!');
            console.log(`   Name: ${bot.first_name}`);
            console.log(`   Username: @${bot.username}`);
            console.log(`   ID: ${bot.id}\n`);
            return true;
        }
    } catch (error) {
        console.error('❌ Failed to get bot info');
        console.error(`   Error: ${error.response?.data?.description || error.message}\n`);
        return false;
    }
}

// Test 2: Send a simple text message
async function testSimpleMessage() {
    console.log('📤 Test 2: Sending simple text message...');
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHAT_ID,
                text: '🎉 Hello from Rosie Pham Bot!\n\nThis is a test message from your backend server.'
            }
        );

        if (response.data.ok) {
            console.log('✅ Message sent successfully!');
            console.log(`   Message ID: ${response.data.result.message_id}\n`);
            return true;
        }
    } catch (error) {
        console.error('❌ Failed to send message');
        console.error(`   Error: ${error.response?.data?.description || error.message}\n`);
        return false;
    }
}

// Test 3: Send a formatted message with HTML
async function testFormattedMessage() {
    console.log('📤 Test 3: Sending formatted message with HTML...');
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHAT_ID,
                text: `<b>📊 Trading Update</b>

<i>Gold Price Analysis</i>
Current: $2,050/oz
Trend: <b>Bullish</b> 📈

<code>Recommendation: BUY</code>

Visit: <a href="https://rosiephamofficial.lovable.app">Rosie Pham Official</a>`,
                parse_mode: 'HTML'
            }
        );

        if (response.data.ok) {
            console.log('✅ Formatted message sent successfully!');
            console.log(`   Message ID: ${response.data.result.message_id}\n`);
            return true;
        }
    } catch (error) {
        console.error('❌ Failed to send formatted message');
        console.error(`   Error: ${error.response?.data?.description || error.message}\n`);
        return false;
    }
}

// Test 4: Test via your backend API
async function testBackendAPI() {
    console.log('🔌 Test 4: Testing via backend API...');
    try {
        const response = await axios.post(
            'http://localhost:3001/api/socials/telegram/send',
            {
                content: '✨ This message was sent through the backend API!\n\nYour social media posting system is working correctly.'
            }
        );

        if (response.data.success) {
            console.log('✅ Backend API test successful!');
            console.log(`   Platform: ${response.data.platform}`);
            console.log(`   Action: ${response.data.action}\n`);
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
    console.log('Starting Telegram tests...\n');

    const results = {
        botInfo: await testBotInfo(),
        simpleMessage: await testSimpleMessage(),
        formattedMessage: await testFormattedMessage(),
        backendAPI: await testBackendAPI()
    };

    console.log('============================');
    console.log('📊 Test Results Summary');
    console.log('============================');
    console.log(`Bot Info:          ${results.botInfo ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Simple Message:    ${results.simpleMessage ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Formatted Message: ${results.formattedMessage ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Backend API:       ${results.backendAPI ? '✅ PASS' : '❌ FAIL'}`);

    const totalPassed = Object.values(results).filter(r => r).length;
    const totalTests = Object.keys(results).length;

    console.log(`\n${totalPassed}/${totalTests} tests passed`);

    if (totalPassed === totalTests) {
        console.log('\n🎉 All tests passed! Your Telegram integration is working perfectly!');
    } else {
        console.log('\n⚠️  Some tests failed. Check the errors above for details.');
    }
}

// Run the tests
runAllTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
