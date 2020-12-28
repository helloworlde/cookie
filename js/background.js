function updateCookie(cookie) {
    $.post("http://localhost:8080/cookies", {
        cookie: cookie
    }, function (resp) {
        console.log("Save cookie response: " + resp);
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.cookies.getAll({ "domain": request.domain }, function (cookies) {
        let cookie = cookies.map((item) => {
            return parseNeedCookie(item)
        }).filter(value => value != "").join(";");

        updateCookie(cookie)
    });

    sendResponse("Save cookie completed");
});

let keyWhiteList = [
    "ssoid",
    "com.sankuai.it.ead.citadel_ssoid",
]

function parseNeedCookie(cookie) {
    if (keyWhiteList.indexOf(cookie.name) != -1) {
        return cookie.name + "=" + cookie.value
    } else {
        return "";
    }
}