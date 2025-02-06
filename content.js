document.addEventListener('mouseup', function () {
    let selectedText = window.getSelection().toString();
    console.log("Selected Text:", selectedText); // Debug log
    if (selectedText) {
        chrome.runtime.sendMessage({ action: 'encodeText', text: selectedText }, function (response) {
            console.log("Encoded Text:", response.encodedText); // Debug log to see encoded result
        });
    }
});
