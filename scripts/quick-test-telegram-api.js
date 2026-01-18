import axios from 'axios';

console.log('Testing Telegram API endpoint...\n');

async function testEndpoint() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/socials/telegram/send',
            {
                content: '✅ Backend API Test Successful!\n\nYour Telegram integration is fully working through the API endpoint.'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ SUCCESS!');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log('❌ FAILED');
        console.log('Status:', error.response?.status);
        console.log('Status Text:', error.response?.statusText);
        console.log('Error Data:', JSON.stringify(error.response?.data, null, 2));
        console.log('Error Message:', error.message);
    }
}

testEndpoint();
