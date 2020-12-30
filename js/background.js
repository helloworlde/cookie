function uploadCookies(domain, cookie) {
    chrome.storage.sync.get(["serverAddress"], function (result) {
        console.log("serverAddress: " + JSON.stringify(result));
        if (result.serverAddress === undefined) {
            return;
        }

        let serverUrl = result.serverAddress;
        chrome.storage.sync.get(["token"], function (result) {
            console.log("token: " + JSON.stringify(result));
            if (result.token === undefined) {
                result.token = "";
            }
            let token = result.token;

            chrome.storage.sync.get(["extraBody"], function (result) {
                console.log("extraBody: " + JSON.stringify(result));
                if (result.extraBody === undefined) {
                    result.extraBody = {};
                }
                let extraBody = JSON.parse(result.extraBody);
                $.ajax({
                    url: serverUrl,
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    headers: {
                        "Authentication": token,
                    },
                    data: JSON.stringify(Object.assign({
                            "cookie": cookie,
                            "domain": domain
                        }, extraBody)
                    ),
                    success: (data) => {
                        console.log("Update cookie success: " + data)
                    },
                    error: (xhr, status, err) => {
                        console.error("Update cookie failed,  status: " + status + " err: " + err);
                    }
                });
            });
        })
    })
}

function parseRootDomain(domain) {
    return domain.split(".").reverse().splice(0, 2).reverse().join(".")
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.storage.sync.get(["cookieNames"], function (result) {
        if (result.cookieNames === undefined) {
            result.cookieNames = "";
        }
        let cookieNames = result.cookieNames.split(",");

        chrome.storage.sync.get(["rootDomain"], function (result) {
            console.log("rootDomain: " + JSON.stringify(result));
            if (result.rootDomain === undefined) {
                result.rootDomain = "false";
            }
            let domain = request.domain
            let rootDomain = result.rootDomain === "true";
            if (rootDomain) {
                domain = parseRootDomain(domain)
            }

            chrome.cookies.getAll({"domain": domain}, function (cookies) {
                let cookie = cookies.map((item) => {
                    return parseNeedCookie(cookieNames, item)
                }).filter(value => value !== "").join(";");

                uploadCookies(request.domain, cookie)
            });
        });
    })

    sendResponse("Save cookie completed");
});


function parseNeedCookie(cookieNames, cookie) {
    console.log(cookieNames)
    if (cookieNames.length > 0) {
        if (cookieNames[0] === "*") {
            return cookie.name + "=" + cookie.value;
        } else if (cookieNames.indexOf(cookie.name) !== -1) {
            return cookie.name + "=" + cookie.value;
        }
    }
    return "";
}
