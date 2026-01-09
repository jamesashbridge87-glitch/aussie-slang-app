// Text-to-Speech Module with Australian Accent
const Speech = {
    synth: window.speechSynthesis,
    aussieVoice: null,
    speaking: false,

    init() {
        // Wait for voices to load
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.findAussieVoice();
        }
        // Try immediately as well (some browsers load voices synchronously)
        this.findAussieVoice();
        this.setupEventListeners();
    },

    findAussieVoice() {
        const voices = this.synth.getVoices();

        // Try to find Australian English voice
        this.aussieVoice = voices.find(voice =>
            voice.lang === 'en-AU'
        );

        // Fallback to any English voice if no Australian available
        if (!this.aussieVoice) {
            this.aussieVoice = voices.find(voice =>
                voice.lang.startsWith('en-')
            );
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

    speak(text, button = null) {
        // Cancel any ongoing speech
        this.synth.cancel();

        if (!text || text === 'Loading...') return;

        const utterance = new SpeechSynthesisUtterance(text);

        // Set Australian voice if available
        if (this.aussieVoice) {
            utterance.voice = this.aussieVoice;
        }

        // Adjust speech settings for natural sound
        utterance.rate = 0.9;  // Slightly slower
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Add speaking animation to button
        if (button) {
            button.classList.add('speaking');
            utterance.onend = () => {
                button.classList.remove('speaking');
                this.speaking = false;
            };
            utterance.onerror = () => {
                button.classList.remove('speaking');
                this.speaking = false;
            };
        }

        this.speaking = true;
        this.synth.speak(utterance);
    },

    stop() {
        this.synth.cancel();
        this.speaking = false;
        document.querySelectorAll('.speak-btn').forEach(btn => {
            btn.classList.remove('speaking');
        });
    }
};
