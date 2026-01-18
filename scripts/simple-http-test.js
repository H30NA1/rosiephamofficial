import http from 'http';

const data = JSON.stringify({
    content: '✅ Testing from simple HTTP request'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/socials/telegram/send',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing endpoint:', `http://${options.hostname}:${options.port}${options.path}`);

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);

    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        console.log('Response:', body);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
