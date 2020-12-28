function loadSettings(name) {
    return "http://localhost:8080/cookies";
}


function updateCookie(domain, cookie) {
    let serverUrl = loadSettings("serverUrl")
    let token = loadSettings("token")
    $.ajax({
        url: serverUrl,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authentication": token,
        },
        data: JSON.stringify({
            "cookie": cookie,
            "domain": domain
        }),
        success: (data) => {
            console.log("Update cookie success: " + data)
        },
        error: (xhr, status, err) => {
            console.error("Update cookie failed,  status: " + status + " err: " + err);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.cookies.getAll({"domain": request.domain}, function (cookies) {
        let cookie = cookies.map((item) => {
            return parseNeedCookie(item)
        }).filter(value => value !== "").join(";");

        updateCookie(request.domain, cookie)
    });
    sendResponse("Save cookie completed");
});

let keyWhiteList = [
    "ssoid",
    "com.sankuai.it.ead.citadel_ssoid",
]

function parseNeedCookie(cookie) {
    if (keyWhiteList.indexOf(cookie.name) !== -1) {
        return cookie.name + "=" + cookie.value
    } else {
        return "";
    }
}
