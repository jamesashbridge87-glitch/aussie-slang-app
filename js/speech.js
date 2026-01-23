// Text-to-Speech Module using Fish.audio via Backend API
const Speech = {
    // Configure this URL to your Railway deployment
    // Example: 'https://your-app.railway.app'
    API_BASE_URL: localStorage.getItem('aussie_slang_tts_url') || '',

    speaking: false,
    currentAudio: null,

    init() {
        this.setupEventListeners();
        this.setupConfigModal();
    },

    setupConfigModal() {
        // Create config button in header if it doesn't exist
        const header = document.querySelector('.header-stats');
        if (header && !document.getElementById('tts-config-btn')) {
            const configBtn = document.createElement('button');
            configBtn.id = 'tts-config-btn';
            configBtn.className = 'icon-btn';
            configBtn.title = 'Configure TTS Server';
            configBtn.innerHTML = '&#9881;'; // Gear icon
            configBtn.style.cssText = 'font-size: 1.2rem; margin-left: 10px;';
            configBtn.addEventListener('click', () => this.showConfigPrompt());
            header.appendChild(configBtn);
        }
    },

    showConfigPrompt() {
        const currentUrl = this.API_BASE_URL || '(not configured)';
        const newUrl = prompt(
            `Enter your TTS backend URL:\n\nCurrent: ${currentUrl}\n\nExample: https://your-app.railway.app`,
            this.API_BASE_URL
        );

        if (newUrl !== null) {
            // Remove trailing slash if present
            this.API_BASE_URL = newUrl.replace(/\/$/, '');
            localStorage.setItem('aussie_slang_tts_url', this.API_BASE_URL);
            alert(this.API_BASE_URL ? 'TTS server URL saved!' : 'TTS server URL cleared. Using browser speech.');
        }
    },

    setupEventListeners() {
        // Flashcard mode speak buttons
        document.getElementById('speak-term').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            const term = document.getElementById('flashcard-term').textContent;
            this.speak(term, e.target);
        });

        document.getElementById('speak-example').addEventListener('click', (e) => {
            e.stopPropagation();
            const example = document.getElementById('flashcard-example').textContent;
            // Remove quotes from example
            this.speak(example.replace(/^"|"$/g, ''), e.target);
        });

        // Review mode speak buttons
        document.getElementById('speak-review-term').addEventListener('click', (e) => {
            e.stopPropagation();
            const term = document.getElementById('review-term').textContent;
            this.speak(term, e.target);
        });

        document.getElementById('speak-review-example').addEventListener('click', (e) => {
            e.stopPropagation();
            const example = document.getElementById('review-example').textContent;
            this.speak(example.replace(/^"|"$/g, ''), e.target);
        });
    },

    async speak(text, button = null) {
        // Stop any ongoing speech
        this.stop();

        if (!text || text === 'Loading...') return;

        // Add speaking animation to button
        if (button) {
            button.classList.add('speaking');
        }

        this.speaking = true;

        // Use Fish.audio backend if configured, otherwise fall back to browser TTS
        if (this.API_BASE_URL) {
            await this.speakWithFishAudio(text, button);
        } else {
            this.speakWithBrowser(text, button);
        }
    },

    async speakWithFishAudio(text, button) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error(`TTS request failed: ${response.status}`);
            }

            // Get audio blob
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Play audio
            this.currentAudio = new Audio(audioUrl);

            this.currentAudio.onended = () => {
                this.cleanupAudio(button, audioUrl);
            };

            this.currentAudio.onerror = (e) => {
                console.error('Audio playback error:', e);
                this.cleanupAudio(button, audioUrl);
            };

            await this.currentAudio.play();

        } catch (error) {
            console.error('Fish.audio TTS error:', error);
            this.cleanupAudio(button);

            // Fall back to browser TTS on error
            console.log('Falling back to browser TTS...');
            this.speakWithBrowser(text, button);
        }
    },

    speakWithBrowser(text, button) {
        // Fallback to Web Speech API
        const synth = window.speechSynthesis;
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find Australian English voice
        const voices = synth.getVoices();
        const aussieVoice = voices.find(v => v.lang === 'en-AU') ||
                          voices.find(v => v.lang.startsWith('en-'));

        if (aussieVoice) {
            utterance.voice = aussieVoice;
        }

        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
            if (button) button.classList.remove('speaking');
            this.speaking = false;
        };

        utterance.onerror = () => {
            if (button) button.classList.remove('speaking');
            this.speaking = false;
        };

        synth.speak(utterance);
    },

    cleanupAudio(button, audioUrl = null) {
        if (button) button.classList.remove('speaking');
        this.speaking = false;
        this.currentAudio = null;
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
    },

    stop() {
        // Stop Fish.audio playback
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }

        // Stop browser TTS
        window.speechSynthesis.cancel();

        this.speaking = false;
        document.querySelectorAll('.speak-btn').forEach(btn => {
            btn.classList.remove('speaking');
        });
    }
};
