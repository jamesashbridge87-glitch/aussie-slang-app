const fs = require('fs');
const path = require('path');
const { applyPronunciation } = require('./pronunciation-dictionary');

const VOICE_ID = 'DYkrAHD8iwork3YSUBbs';
const API_KEY = '3b865a0a9812baa264a9b0468a036b5faa41f0f4d411ec5e386df17467ed3cc4';
const MODEL_ID = 'eleven_multilingual_v2';
const SPEED = 0.90;

// Load slang data
const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Parse slang data
const entries = [];
const regex = /\{\s*id:\s*"([^"]*)",\s*term:\s*"([^"]*)",\s*meaning:\s*"([^"]*)",\s*example:\s*"([^"]*)"/g;
let match;
while ((match = regex.exec(dataContent)) !== null) {
    entries.push({
        id: match[1],
        term: match[2],
        meaning: match[3],
        example: match[4]
    });
}

console.log(`Found ${entries.length} phrases to generate\n`);

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
                speed: SPEED,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} - ${error}`);
    }

    const audioBuffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));

    return text.length;
}

async function generateAll() {
    const audioDir = path.join(__dirname, '..', 'audio');

    console.log('='.repeat(60));
    console.log('ELEVENLABS AUDIO GENERATION - All Phrases');
    console.log('='.repeat(60));
    console.log(`Voice ID: ${VOICE_ID}`);
    console.log(`Model: ${MODEL_ID}`);
    console.log(`Speed: ${SPEED}`);
    console.log(`Total phrases: ${entries.length}`);
    console.log('='.repeat(60));

    let totalChars = 0;
    let completed = 0;
    let failed = 0;
    const errors = [];

    for (const entry of entries) {
        const phonetic = applyPronunciation(entry.example);
        const outputPath = path.join(audioDir, `${entry.id}-example.mp3`);

        process.stdout.write(`[${completed + 1}/${entries.length}] ${entry.id}... `);

        try {
            const chars = await generateAudio(phonetic, outputPath);
            totalChars += chars;
            completed++;
            console.log('✓');
        } catch (error) {
            failed++;
            errors.push({ id: entry.id, error: error.message });
            console.log(`✗ ${error.message}`);
        }

        // Rate limiting - small delay between requests
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('\n' + '='.repeat(60));
    console.log('COMPLETE');
    console.log('='.repeat(60));
    console.log(`Generated: ${completed}/${entries.length}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total characters used: ~${totalChars}`);
    console.log('='.repeat(60));

    if (errors.length > 0) {
        console.log('\nErrors:');
        errors.forEach(e => console.log(`  - ${e.id}: ${e.error}`));
    }
}

generateAll().catch(console.error);
