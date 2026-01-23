const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables (set these in Railway)
const FISH_API_KEY = process.env.FISH_API_KEY;
const FISH_VOICE_ID = process.env.FISH_VOICE_ID || '94b6f023e35645a1a8f6be39955d29db';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// TTS endpoint
app.post('/api/tts', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (!FISH_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
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
                text: text,
                reference_id: FISH_VOICE_ID,
                format: 'mp3',
                mp3_bitrate: 128,
                normalize: true,
                latency: 'balanced'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Fish.audio API error:', response.status, errorText);
            return res.status(response.status).json({
                error: 'TTS generation failed',
                details: errorText
            });
        }

        // Get audio buffer and send it back
        const audioBuffer = await response.arrayBuffer();

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.byteLength
        });

        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('TTS error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`TTS Backend running on port ${PORT}`);
    console.log(`Voice ID: ${FISH_VOICE_ID}`);
    if (!FISH_API_KEY) {
        console.warn('WARNING: FISH_API_KEY environment variable not set!');
    }
});
