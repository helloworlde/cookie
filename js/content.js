window.addEventListener("load", loadEvent, false);

function getCookies(domain) {
    chrome.runtime.sendMessage({ domain: domain }, async function (response) {
        console.log(response);
    });
}

function loadEvent(evt) {
    console.log("Start save cookies");
    getCookies(window.location.hostname)
}
