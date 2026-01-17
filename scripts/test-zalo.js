import axios from 'axios';

const ACCESS_TOKEN = 'hiY2L5r5f0Akm8DMNKkg1gR4WrzIL_5PnPsfJsvf_MB_-OipJMdW4U2ZfJ5YNO09repdNMzWX4d1gQK5QcxvLSssWmHlUSWcnRAI26beoJ7mXA0PGGx3D_FzuMz09ALiiVt6LJfsicIB-l9yVoItBVBGmnO0MeengQ-j1WLs_GIV_fW1AHNc8PZ2eNae6k1rcD2G9puTzo75ygGVPGduISh4dqPQEjH2z_69R4GjsMxVmwfjI0hjJUh5k4rTFfeRgj7YI1WxomJgyfK6JYArAhdjoGPBFUagqCkoVbWixqUkyh8IBWRh0vlVjr0gKUzwgi6uBrrDxWNIchej94FXADQveGHDM_W6v8cvBdTQzms1h84gBq7T7CEz4M5PMw81';

async function testZalo() {
    try {
        console.log("Fetching Zalo Groups...");
        const response = await axios.get('https://openapi.zalo.me/v2.0/oa/group/getgroups', {
            headers: {
                'access_token': ACCESS_TOKEN
            },
            params: {
                offset: 0,
                count: 10
            }
        });

        console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error fetching Zalo groups:", error.response ? error.response.data : error.message);
    }
}

testZalo();
