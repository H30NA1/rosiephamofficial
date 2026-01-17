const ACCESS_TOKEN = 'nbdU38rePN36KTyEZMPhTCvLtmU2UXOxl3Ug0BSEG0UYMQG9u2jdACb9lJJtS6uommUz4Fn1PJxT3w01rcf2U-bIedN2AHXKZt_VHeSNDN-ULSDcds0SMAKan4c8IYbnj7xCUOm8SrcVQx5mbobRNw1EY4MvU3DvgIlgNE5-5tF25lDHmtWlNCyOatdoGMvxw1QHIjyYLKUMP-4wtXCN4lrMmnhq0Nu7k4kwF8O8JowsEQmoz4rr3_fzpIhUFGLJdMRgNwaID57YLVnghmD8G9Cod3w1Ho0Wc0JT2B1DDogv5lOnzNqf2_Otq1hiNmOefndEDOPR2alF0knjsKWLTCSlh5VwUH9RxY3qNEDnGNRAAQ1b_WLQIqn7Um6CIubsOtC';

async function testV3() {
    console.log("Testing Zalo v3.0 Endpoints with provided token...");

    // 1. Try List Groups (v3.0)
    const url = 'https://openapi.zalo.me/v3.0/oa/group/getgroupsofoa?offset=0&count=10';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'access_token': ACCESS_TOKEN }
        });
        const data = await response.json();
        console.log("V3 Groups Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("V3 fetch failed:", e.message);
    }

    // 2. Try User Profile (Social API) to confirm token validity
    try {
        const profileResponse = await fetch('https://graph.zalo.me/v2.0/me?fields=id,name,picture', {
            headers: { 'access_token': ACCESS_TOKEN }
        });
        const profileData = await profileResponse.json();
        console.log("User Profile Response:", JSON.stringify(profileData, null, 2));
    } catch (e) {
        console.error("Profile fetch failed:", e.message);
    }
}

testV3();
