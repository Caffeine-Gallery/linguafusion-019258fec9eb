import { backend } from 'declarations/backend';

const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const languageSelect = document.getElementById('language-select');
const speakButton = document.getElementById('speak-button');

let translationTimeout;

async function translateText() {
    const text = inputText.value;
    const targetLang = languageSelect.value;

    if (text.trim() === '') {
        outputText.value = '';
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        outputText.value = data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        outputText.value = 'Error occurred during translation.';
    }
}

function debounceTranslation() {
    clearTimeout(translationTimeout);
    translationTimeout = setTimeout(translateText, 300);
}

function speakTranslation() {
    const text = outputText.value;
    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect.value;
    speechSynthesis.speak(utterance);
}

inputText.addEventListener('input', debounceTranslation);
languageSelect.addEventListener('change', translateText);
speakButton.addEventListener('click', speakTranslation);

// Health check
async function performHealthCheck() {
    try {
        const response = await backend.healthcheck();
        console.log('Backend health check:', response);
    } catch (error) {
        console.error('Backend health check failed:', error);
    }
}

performHealthCheck();
