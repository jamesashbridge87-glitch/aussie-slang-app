#!/usr/bin/env node
/**
 * Batch Audio Generator for Aussie Slang App
 *
 * Generates MP3 files for all slang terms and examples using Fish.audio API.
 *
 * Usage:
 *   FISH_API_KEY=your_key node generate-audio.js
 *
 * Or set environment variables:
 *   export FISH_API_KEY=your_api_key
 *   export FISH_VOICE_ID=your_voice_id (optional, has default)
 *   node generate-audio.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const FISH_API_KEY = process.env.FISH_API_KEY;
const FISH_VOICE_ID = process.env.FISH_VOICE_ID || '94b6f023e35645a1a8f6be39955d29db';
const OUTPUT_DIR = path.join(__dirname, '..', 'audio');
const DELAY_BETWEEN_REQUESTS = 500; // ms - to avoid rate limiting

// Load slang data
const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract slangData array (simple parsing)
const slangDataMatch = dataContent.match(/const slangData = \[([\s\S]*?)\];/);
if (!slangDataMatch) {
    console.error('Could not parse slang data from data.js');
    process.exit(1);
}

// Parse the slang data including emotion tags and pronunciation hints
function parseSlangData(content) {
    const items = [];
    // Match each object in the slangData array
    const objectRegex = /\{\s*id:\s*"([^"]+)"[^}]+\}/g;
    let match;

    while ((match = objectRegex.exec(content)) !== null) {
        const obj = match[0];

        // Extract fields from the object
        const id = obj.match(/id:\s*"([^"]+)"/)?.[1] || '';
        const term = obj.match(/term:\s*"([^"]+)"/)?.[1] || '';
        const example = obj.match(/example:\s*"([^"]+)"/)?.[1] || '';
        const termPronunciation = obj.match(/termPronunciation:\s*"([^"]+)"/)?.[1] || '';

        if (id && term) {
            items.push({
                id,
                term,
                example,
                termPronunciation
            });
        }
    }

    return items;
}

const slangData = parseSlangData(dataContent);
console.log(`Found ${slangData.length} slang terms to process`);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
}

// Generate audio using Fish.audio API
async function generateAudio(text, filename) {
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
        console.log(`  Skipping (exists): ${filename}`);
        return { skipped: true };
    }

    // Process text to prevent cutoff and repetition issues
    let processedText = text.trim();

    // Add trailing punctuation if missing (helps prevent cutoff)
    if (!/[.!?]$/.test(processedText)) {
        processedText += '.';
    }

    try {
        const response = await fetch('https://api.fish.audio/v1/tts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FISH_API_KEY}`,
                'Content-Type': 'application/json',
                'model': 's1'
            },
            body: JSON.stringify({
                text: processedText,
                reference_id: FISH_VOICE_ID,
                format: 'mp3',
                mp3_bitrate: 128,
                normalize: true,
                latency: 'normal',
                chunk_length: 100  // Minimum chunk size to prevent repetition of short phrases
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error ${response.status}: ${errorText}`);
        }

        const audioBuffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(audioBuffer));
        console.log(`  Generated: ${filename} (${audioBuffer.byteLength} bytes)`);
        return { success: true, size: audioBuffer.byteLength };

    } catch (error) {
        console.error(`  ERROR: ${filename} - ${error.message}`);
        return { error: error.message };
    }
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Main generation function
async function generateAllAudio() {
    if (!FISH_API_KEY) {
        console.error('ERROR: FISH_API_KEY environment variable is required');
        console.error('Usage: FISH_API_KEY=your_key node generate-audio.js');
        process.exit(1);
    }

    console.log('\n=== Aussie Slang Audio Generator ===');
    console.log(`Voice ID: ${FISH_VOICE_ID}`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
    console.log(`Total items: ${slangData.length} terms + ${slangData.length} examples = ${slangData.length * 2} files\n`);

    const stats = {
        generated: 0,
        skipped: 0,
        errors: 0,
        totalBytes: 0
    };

    const startTime = Date.now();

    for (let i = 0; i < slangData.length; i++) {
        const item = slangData[i];
        const progress = `[${i + 1}/${slangData.length}]`;

        console.log(`${progress} Processing: ${item.term}`);

        // Generate term audio (use pronunciation hint if available)
        const termFilename = `${item.id}-term.mp3`;
        const termText = item.termPronunciation || item.term;
        const termResult = await generateAudio(termText, termFilename);

        if (termResult.skipped) stats.skipped++;
        else if (termResult.success) {
            stats.generated++;
            stats.totalBytes += termResult.size;
        }
        else stats.errors++;

        await sleep(DELAY_BETWEEN_REQUESTS);

        // Generate example audio
        const exampleFilename = `${item.id}-example.mp3`;
        const exampleResult = await generateAudio(item.example, exampleFilename);

        if (exampleResult.skipped) stats.skipped++;
        else if (exampleResult.success) {
            stats.generated++;
            stats.totalBytes += exampleResult.size;
        }
        else stats.errors++;

        await sleep(DELAY_BETWEEN_REQUESTS);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalMB = (stats.totalBytes / 1024 / 1024).toFixed(2);

    console.log('\n=== Generation Complete ===');
    console.log(`Time elapsed: ${elapsed}s`);
    console.log(`Generated: ${stats.generated} files (${totalMB} MB)`);
    console.log(`Skipped (already exist): ${stats.skipped} files`);
    console.log(`Errors: ${stats.errors} files`);
    console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

// Run
generateAllAudio().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
