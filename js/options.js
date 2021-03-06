function saveSettings() {
    let serverAddress = document.getElementById("serverAddress").value;
    let cookieNames = document.getElementById("cookieNames").value;
    let token = document.getElementById("token").value;
    let extraBody = document.getElementById("extraBody").value;
    let rootDomain = document.getElementById("rootDomain").value;

    chrome.storage.sync.set({
        "serverAddress": serverAddress
    }, function () {
        console.log("Save serverAddress completed")
    });
    chrome.storage.sync.set({
        "cookieNames": cookieNames
    }, function () {
        console.log("Save cookieNames completed")
    });
    chrome.storage.sync.set({
        "token": token
    }, function () {
        console.log("Save token completed")
    });
    chrome.storage.sync.set({
        "extraBody": extraBody
    }, function () {
        console.log("Save token completed")
    });

    chrome.storage.sync.set({
        "rootDomain": rootDomain
    }, function () {
        console.log("Save rootDomain completed")
    });
}

function resetSettings() {

    chrome.storage.sync.remove("serverAddress", function () {
        document.getElementById("serverAddress").value = "";
        console.log("Remove serverAddress completed")
    });
    chrome.storage.sync.remove("cookieNames", function () {
        document.getElementById("cookieNames").value = "";
        console.log("Remove cookieNames completed")
    });
    chrome.storage.sync.remove("token", function () {
        document.getElementById("token").value = "";
        console.log("Remove token completed")
    });
    chrome.storage.sync.remove("extraBody", function () {
        document.getElementById("extraBody").value = "";
        console.log("Remove extraBody completed")
    });
    chrome.storage.sync.remove("rootDomain", function () {
        document.getElementById("rootDomain").value = "false";
        console.log("Remove extraBody completed")
    });
}

function loadSettings() {
    chrome.storage.sync.get(["serverAddress"], function (result) {
        console.log(result);

        if (result.serverAddress === undefined) {
            result.serverAddress = "";
        }
        document.getElementById("serverAddress").value = result.serverAddress;
    })

    chrome.storage.sync.get(["cookieNames"], function (result) {
        console.log(result);
        if (result.cookieNames === undefined) {
            result.cookieNames = "";
        }
        document.getElementById("cookieNames").value = result.cookieNames;
    })
    chrome.storage.sync.get(["token"], function (result) {
        console.log(result);
        if (result.token === undefined) {
            result.token = "";
        }
        document.getElementById("token").value = result.token;
    })
    chrome.storage.sync.get(["extraBody"], function (result) {
        console.log(result);
        if (result.extraBody === undefined) {
            result.extraBody = "";
        }
        document.getElementById("extraBody").value = result.extraBody;
    })
    chrome.storage.sync.get(["rootDomain"], function (result) {
        console.log(result);
        if (result.rootDomain === undefined) {
            result.rootDomain = "false";
        }
        document.getElementById("rootDomain").value = result.rootDomain;
    })
}

document.addEventListener("DOMContentLoaded", loadSettings);
document.getElementById("saveButton").addEventListener("click", saveSettings);
document.getElementById("resetButton").addEventListener("click", resetSettings);
