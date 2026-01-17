const ACCESS_TOKEN = 'nbdU38rePN36KTyEZMPhTCvLtmU2UXOxl3Ug0BSEG0UYMQG9u2jdACb9lJJtS6uommUz4Fn1PJxT3w01rcf2U-bIedN2AHXKZt_VHeSNDN-ULSDcds0SMAKan4c8IYbnj7xCUOm8SrcVQx5mbobRNw1EY4MvU3DvgIlgNE5-5tF25lDHmtWlNCyOatdoGMvxw1QHIjyYLKUMP-4wtXCN4lrMmnhq0Nu7k4kwF8O8JowsEQmoz4rr3_fzpIhUFGLJdMRgNwaID57YLVnghmD8G9Cod3w1Ho0Wc0JT2B1DDogv5lOnzNqf2_Otq1hiNmOefndEDOPR2alF0knjsKWLTCSlh5VwUH9RxY3qNEDnGNRAAQ1b_WLQIqn7Um6CIubsOtC';

async function testEndpoint(name, url) {
    console.log(`Testing ${name}: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'access_token': ACCESS_TOKEN }
        });
        const data = await response.json();
        console.log(`${name} Response:`, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`${name} failed:`, e.message);
    }
}

async function start() {
    // 1. Check OA Info (Basic)
    await testEndpoint("Get OA Info (v2.0)", "https://openapi.zalo.me/v2.0/oa/getoa");

    // 2. Check Groups (GMF)
    await testEndpoint("Get Groups (v2.0)", "https://openapi.zalo.me/v2.0/oa/group/getgroups?offset=0&count=10");
    await testEndpoint("Get Groups (v3.0)", "https://openapi.zalo.me/v3.0/oa/group/getgroups?offset=0&count=10");

    // 3. User Info (Optional)
    await testEndpoint("Get OA Details (v2.0)", "https://openapi.zalo.me/v2.0/oa/getoa");
}

start();
