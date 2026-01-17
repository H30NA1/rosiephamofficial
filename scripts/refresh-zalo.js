const APP_ID = '1400770865068182887';
const APP_SECRET = '4OQ82mQ7PU0t1HvjtWSG';
const REFRESH_TOKEN = 'oYW2DevhbKxA80CqZcMRIi8a0ps1USmWs4vQA9eCi0JO5NaDoW-NDCSuS2I50AObd4TiM9v2g2w2HbijhsBE9RHt1WE8CU8gbZ88Df4UqWtGB2jmw1xWMCCr2dY5SPbxetDOSAvCobdgVYH6tsplFCL75XBzJCOhq5uX8OaLprcn23XWjqd_0lff5nMuHTWMXdqN0wL-vHsKLnDgjHVc4P8J9H-k0UGIbX1tBu4pkm6Q67ejkLpf6ezE7mh9KVvotrGsMveLvtww9HG6b6xn98qa9p-X8keaf001ChiooXAGTGGHWbAHPu5r0NUDCUXseJWHVxHwntBrNonpzaNx2yfcOY2CHvGtbGTJDNPgT7EWJufraqq';

async function refreshToken() {
    console.log("Attempting to refresh Zalo access token...");
    try {
        const response = await fetch('https://oauth.zaloapp.com/v4/oa/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'secret_key': APP_SECRET
            },
            body: new URLSearchParams({
                'refresh_token': REFRESH_TOKEN,
                'app_id': APP_ID,
                'grant_type': 'refresh_token'
            })
        });

        const data = await response.json();
        console.log("Zalo Refresh Response:", data);
        return data;
    } catch (error) {
        console.error("Failed to refresh token:", error);
    }
}

async function testZaloGroups(token) {
    console.log("Fetching Zalo Groups with token:", token.substring(0, 10) + "...");
    try {
        const response = await fetch('https://openapi.zalo.me/v2.0/oa/group/getgroups?offset=0&count=10', {
            method: 'GET',
            headers: {
                'access_token': token
            }
        });
        const data = await response.json();
        console.log("Groups Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Failed to fetch groups:", error);
    }
}

async function start() {
    const refreshData = await refreshToken();
    if (refreshData && refreshData.access_token) {
        await testZaloGroups(refreshData.access_token);
    } else {
        // Try with the static access token provided by user if refresh fails
        const staticToken = 'nbdU38rePN36KTyEZMPhTCvLtmU2UXOxl3Ug0BSEG0UYMQG9u2jdACb9lJJtS6uommUz4Fn1PJxT3w01rcf2U-bIedN2AHXKZt_VHeSNDN-ULSDcds0SMAKan4c8IYbnj7xCUOm8SrcVQx5mbobRNw1EY4MvU3DvgIlgNE5-5tF25lDHmtWlNCyOatdoGMvxw1QHIjyYLKUMP-4wtXCN4lrMmnhq0Nu7k4kwF8O8JowsEQmoz4rr3_fzpIhUFGLJdMRgNwaID57YLVnghmD8G9Cod3w1Ho0Wc0JT2B1DDogv5lOnzNqf2_Otq1hiNmOefndEDOPR2alF0knjsKWLTCSlh5VwUH9RxY3qNEDnGNRAAQ1b_WLQIqn7Um6CIubsOtC';
        console.log("Using static token instead...");
        await testZaloGroups(staticToken);
    }
}

start();
