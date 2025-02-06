// This function is called when the popup is opened
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'encodeText') {
    // Update the popup with the encoded text
    document.getElementById('encodedText').value = message.encodedText;
  }
});

// Copy the encoded text to clipboard when the button is clicked
document.getElementById('copyButton').addEventListener('click', () => {
  const encodedText = document.getElementById('encodedText').value;
  navigator.clipboard.writeText(encodedText).then(() => {
    alert('Encoded text copied to clipboard!');
  });
});
