const fs = require('fs');
const path = require('path');
const { applyPronunciation } = require('./pronunciation-dictionary');

const VOICE_ID = 'DYkrAHD8iwork3YSUBbs';
const API_KEY = '3b865a0a9812baa264a9b0468a036b5faa41f0f4d411ec5e386df17467ed3cc4';
const MODEL_ID = 'eleven_multilingual_v2';

// Test phrases - problematic ones from your feedback
const testPhrases = [
    { id: 'gday', text: "G'day mate, how ya going?" },
    { id: 'arvo', text: "I'll see you this arvo at the pub." },
    { id: 'tassie', text: "We're heading to Tassie for a holiday." },
    { id: 'woop-woop', text: "They live out in Woop Woop, hours from the city." },
    { id: 'ranga', text: "My mate's a ranga, got the brightest red hair you've ever seen." },
    { id: 'garbo', text: "The garbo comes every Tuesday." },
    { id: 'bevvies', text: "Let's grab some bevvies after work." },
    { id: 'choccy', text: "I could really go for some choccy right now." },
    { id: 'devo', text: "I was devo when they cancelled the concert." },
    { id: 'sook', text: "Stop being such a sook, mate!" },
];

async function generateAudio(text, outputPath) {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            model_id: MODEL_ID,
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                style: 0,
                speed: 0.90,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} - ${error}`);
    }

    // Get character count from headers
    const charCount = response.headers.get('x-character-count');
    console.log(`  Characters used: ${charCount}`);

    const audioBuffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
    return charCount;
}

async function runTest() {
    const outputDir = path.join(__dirname, '..', 'audio', 'test-elevenlabs');

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('='.repeat(60));
    console.log('ELEVENLABS TEST - Australian Slang Pronunciation');
    console.log('='.repeat(60));
    console.log(`Voice ID: ${VOICE_ID}`);
    console.log(`Model: ${MODEL_ID}`);
    console.log('');

    let totalChars = 0;

    for (const phrase of testPhrases) {
        const phonetic = applyPronunciation(phrase.text);
        console.log(`\nGenerating: ${phrase.id}`);
        console.log(`  Original: "${phrase.text}"`);
        console.log(`  Phonetic: "${phonetic}"`);

        try {
            const outputPath = path.join(outputDir, `${phrase.id}-test.mp3`);
            const chars = await generateAudio(phonetic, outputPath);
            totalChars += parseInt(chars || phrase.text.length);
            console.log(`  Saved: ${outputPath}`);
        } catch (error) {
            console.error(`  ERROR: ${error.message}`);
        }

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Total characters used: ~${totalChars}`);
    console.log(`Test files saved to: ${outputDir}`);
    console.log('='.repeat(60));
    console.log('\nPlease listen to the test files and let me know if the pronunciation is acceptable.');
}

runTest().catch(console.error);
