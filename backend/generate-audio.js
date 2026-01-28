#!/usr/bin/env node
/**
 * Batch Audio Generator for Aussie Slang App
 *
 * Generates MP3 files for all slang examples using Fish.audio API.
 * Uses the s1 model (highest quality) for natural Australian pronunciation.
 *
 * Usage:
 *   FISH_API_KEY=your_key node generate-audio.js [options]
 *
 * Options:
 *   --force         Regenerate all files, even if they exist
 *   --single=ID     Generate audio for a single term by ID
 *   --dry-run       Show what would be generated without making API calls
 *
 * Environment variables:
 *   FISH_API_KEY    Required - Your Fish.audio API key
 *   FISH_VOICE_ID   Optional - Voice ID (default: 94b6f023e35645a1a8f6be39955d29db)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const FISH_API_KEY = process.env.FISH_API_KEY;
const FISH_VOICE_ID = process.env.FISH_VOICE_ID || '94b6f023e35645a1a8f6be39955d29db';
const OUTPUT_DIR = path.join(__dirname, '..', 'audio');
const DELAY_BETWEEN_REQUESTS = 600; // ms - to avoid rate limiting
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // ms

// Parse command line arguments
const args = process.argv.slice(2);
const FORCE_REGENERATE = args.includes('--force');
const DRY_RUN = args.includes('--dry-run');
const SINGLE_ID = args.find(a => a.startsWith('--single='))?.split('=')[1];

// Load slang data
const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Parse the slang data
function parseSlangData(content) {
    const items = [];
    const objectRegex = /\{\s*id:\s*"([^"]+)"[^}]+\}/g;
    let match;

    while ((match = objectRegex.exec(content)) !== null) {
        const obj = match[0];

        const id = obj.match(/id:\s*"([^"]+)"/)?.[1] || '';
        const term = obj.match(/term:\s*"([^"]+)"/)?.[1] || '';
        const example = obj.match(/example:\s*"([^"]+)"/)?.[1] || '';

        if (id && term) {
            items.push({ id, term, example });
        }
    }

    return items;
}

const slangData = parseSlangData(dataContent);
console.log(`Found ${slangData.length} slang terms`);

// Filter to single ID if specified
const itemsToProcess = SINGLE_ID
    ? slangData.filter(item => item.id === SINGLE_ID)
    : slangData;

if (SINGLE_ID && itemsToProcess.length === 0) {
    console.error(`ERROR: No term found with ID "${SINGLE_ID}"`);
    process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate audio using Fish.audio API with retry logic
async function generateAudio(text, filename, retryCount = 0) {
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if file already exists (unless force regenerate)
    if (!FORCE_REGENERATE && fs.existsSync(filepath)) {
        return { skipped: true };
    }

    if (DRY_RUN) {
        console.log(`  [DRY RUN] Would generate: ${filename}`);
        return { dryRun: true };
    }

    // Process text - ensure proper punctuation
    let processedText = text.trim();
    if (!/[.!?]$/.test(processedText)) {
        processedText += '.';
    }

    try {
        const response = await fetch('https://api.fish.audio/v1/tts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FISH_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: processedText,
                reference_id: FISH_VOICE_ID,
                model: 's1',           // Highest quality model
                format: 'mp3',
                mp3_bitrate: 128,
                normalize: true,
                latency: 'normal'      // Best quality, not optimized for streaming
            })
        });

        if (!response.ok) {
            const errorText = await response.text();

            // Retry on rate limiting or server errors
            if ((response.status === 429 || response.status >= 500) && retryCount < MAX_RETRIES) {
                console.log(`  Retry ${retryCount + 1}/${MAX_RETRIES} for ${filename} (status ${response.status})`);
                await sleep(RETRY_DELAY * (retryCount + 1));
                return generateAudio(text, filename, retryCount + 1);
            }

            throw new Error(`API error ${response.status}: ${errorText}`);
        }

        const audioBuffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(audioBuffer));
        console.log(`  Generated: ${filename} (${(audioBuffer.byteLength / 1024).toFixed(1)} KB)`);
        return { success: true, size: audioBuffer.byteLength };

    } catch (error) {
        // Retry on network errors
        if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
            if (retryCount < MAX_RETRIES) {
                console.log(`  Retry ${retryCount + 1}/${MAX_RETRIES} for ${filename} (network error)`);
                await sleep(RETRY_DELAY * (retryCount + 1));
                return generateAudio(text, filename, retryCount + 1);
            }
        }

        console.error(`  ERROR: ${filename} - ${error.message}`);
        return { error: error.message };
    }
}

// Main generation function
async function generateAllAudio() {
    if (!FISH_API_KEY && !DRY_RUN) {
        console.error('ERROR: FISH_API_KEY environment variable is required');
        console.error('Usage: FISH_API_KEY=your_key node generate-audio.js');
        process.exit(1);
    }

    console.log('\n=== Aussie Slang Audio Generator ===');
    console.log(`Model: s1 (highest quality)`);
    console.log(`Voice ID: ${FISH_VOICE_ID}`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
    console.log(`Items to process: ${itemsToProcess.length}`);
    if (FORCE_REGENERATE) console.log(`Mode: FORCE REGENERATE (overwriting existing files)`);
    if (DRY_RUN) console.log(`Mode: DRY RUN (no API calls)`);
    console.log('');

    const stats = {
        generated: 0,
        skipped: 0,
        errors: 0,
        totalBytes: 0
    };

    const startTime = Date.now();
    const failedItems = [];

    for (let i = 0; i < itemsToProcess.length; i++) {
        const item = itemsToProcess[i];
        const progress = `[${i + 1}/${itemsToProcess.length}]`;

        console.log(`${progress} ${item.term}`);

        // Generate example audio only (used for both term and example buttons)
        const exampleFilename = `${item.id}-example.mp3`;
        const exampleResult = await generateAudio(item.example, exampleFilename);

        if (exampleResult.skipped) {
            stats.skipped++;
            console.log(`  Skipped (exists): ${exampleFilename}`);
        } else if (exampleResult.success) {
            stats.generated++;
            stats.totalBytes += exampleResult.size;
        } else if (exampleResult.dryRun) {
            // Do nothing for dry run
        } else {
            stats.errors++;
            failedItems.push({ id: item.id, term: item.term, error: exampleResult.error });
        }

        // Delay between requests to avoid rate limiting
        if (i < itemsToProcess.length - 1 && !DRY_RUN) {
            await sleep(DELAY_BETWEEN_REQUESTS);
        }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalMB = (stats.totalBytes / 1024 / 1024).toFixed(2);

    console.log('\n=== Generation Complete ===');
    console.log(`Time elapsed: ${elapsed}s`);
    console.log(`Generated: ${stats.generated} files (${totalMB} MB)`);
    console.log(`Skipped (already exist): ${stats.skipped} files`);
    console.log(`Errors: ${stats.errors} files`);

    if (failedItems.length > 0) {
        console.log('\n=== Failed Items ===');
        failedItems.forEach(item => {
            console.log(`  ${item.id}: ${item.term} - ${item.error}`);
        });
        console.log('\nTo retry failed items, run with --force flag');
    }

    console.log(`\nAudio files saved to: ${OUTPUT_DIR}`);
}

// Run
generateAllAudio().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
