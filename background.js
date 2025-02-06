let bip39Words = new Set();

async function fetchBIP39Words() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt");
        const text = await response.text();
        bip39Words = new Set(text.split('\n'));
    } catch (error) {
        console.error("Failed to fetch BIP39 words:", error);
    }
}

fetchBIP39Words();

function fibonacciSequence(n) {
    const sequence = [1, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}

function extractHiddenMessage(text, mode = 'ramiel', significantInterval = 5, wordLength = 4) {
    const words = text.match(/\b\w+\b/g); // Tokenize the text into words
    let significantIndices = [];

    switch (mode) {
        case 'ramiel':
            significantIndices = Array.from({ length: Math.floor(words.length / significantInterval) }, (_, i) => i * significantInterval);
            break;
        case 'asiriel':
            significantIndices = words.filter((_, index) => index % 2 === 0);
            break;
        case 'luciel':
            significantIndices = words.filter(word => word.length === wordLength);
            break;
        case 'gabriel':
            significantIndices = words.filter(word => word[0].toUpperCase() === word[0]);
            break;
        case 'raphael':
            const fibIndices = fibonacciSequence(words.length);
            significantIndices = fibIndices.map(fib => words[fib - 1]);
            break;
        case 'uriel':
            // Placeholder logic for uriel mode
            break;
        default:
            throw new Error("Unknown mode: " + mode);
    }

    // Filter out words that are not in the BIP39 word list
    const filteredWords = significantIndices.filter(word => bip39Words.has(word.toLowerCase()));

    return filteredWords.join(" ");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'encodeText') {
        const encodedText = extractHiddenMessage(message.text);
        console.log("Encoded Text in Background Script:", encodedText); // Debug log
        sendResponse({ encodedText });
    }
    return true;
});

