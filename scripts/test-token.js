const ACCESS_TOKEN = 'hiY2L5r5f0Akm8DMNKkg1gR4WrzIL_5PnPsfJsvf_MB_-OipJMdW4U2ZfJ5YNO09repdNMzWX4d1gQK5QcxvLSssWmHlUSWcnRAI26beoJ7mXA0PGGx3D_FzuMz09ALiiVt6LJfsicIB-l9yVoItBVBGmnO0MeengQ-j1WLs_GIV_fW1AHNc8PZ2eNae6k1rcD2G9puTzo75ygGVPGduISh4dqPQEjH2z_69R4GjsMxVmwfjI0hjJUh5k4rTFfeRgj7YI1WxomJgyfK6JYArAhdjoGPBFUagqCkoVbWixqUkyh8IBWRh0vlVjr0gKUzwgi6uBrrDxWNIchej94FXADQveGHDM_W6v8cvBdTQzms1h84gBq7T7CEz4M5PMw81';

async function test() {
    console.log("Testing Zalo Token...");
    try {
        const res = await fetch('https://openapi.zalo.me/v2.0/oa/getoa', {
            headers: { 'access_token': ACCESS_TOKEN }
        });
        const data = await res.json();
        console.log("OA Info:", data);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

test();
