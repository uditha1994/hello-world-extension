document.addEventListener('DOMContentLoaded', function () {

    const colorBtns = document.querySelectorAll('.color-btn');
    const randomBtn = document.getElementById('random-btn');
    const resetBtn = document.getElementById('reset-btn');
    const statusDiv = document.getElementById('status');

    function showStatus(message, isError = false) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${isError ? 'error' : 'success'}`;

        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }

    function changeBackground(color) {
        //get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                //execute content scripting to change background color
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: setBackgroundColor,
                    args: [color]
                }).then(() => {
                    showStatus(`Background changed to ${color}!`);
                }).catch((error) => {
                    showStatus('Error: Cannot change background on this page', true);
                    console.error("error:", error);
                });
            }
        });
    }

    function setBackgroundColor(color) {
        if (color === 'reset') {
            document.body.style.backgroundColor = '';
            document.body.style.backgroundImage = '';
        } else {
            document.body.style.backgroundColor = color;
            document.body.style.backgroundImage = 'none';
        }
    }

    colorBtns.forEach(button => {
        button.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            changeBackground(color);
        });
    });

    randomBtn.addEventListener('click', function () {
        const randomColor = '#' + Math.floor(Math.random() * 16777215)
            .toString(16);
        changeBackground(randomColor);
    });

    resetBtn.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: setBackgroundColor,
                    args: ['reset']
                }).then(() => {
                    showStatus('Background reset to default');
                }).catch((error) => {
                    showStatus('Error: cannot reset background on thi page', true);
                    console.error("error:", error);
                });
            }
        })
    });

});