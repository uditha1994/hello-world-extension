// this script is injected in to web Pages
// It can be used for more complex page manipulations

console.log('My extension loaded!!');

//listen for message from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "changeColor") {
        document.body.style.backgroundColor = request.color;
        document.body.style.backgroundImage = 'none';
        sendResponse({ success: true });
    } else if (request.action === "resetColor") {
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = '';
        sendResponse({ success: true });
    }
    return true;
});