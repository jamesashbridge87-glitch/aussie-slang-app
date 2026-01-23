// Text-to-Speech Module using Pre-recorded Audio Files
const Speech = {
    speaking: false,
    currentAudio: null,

    // Base path for audio files
    audioBasePath: 'audio/',

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Flashcard mode speak buttons
        document.getElementById('speak-term').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            const card = this.getCurrentFlashcard();
            if (card) {
                this.playAudio(card.id, 'term', card.term, e.target);
            }
        });

        document.getElementById('speak-example').addEventListener('click', (e) => {
            e.stopPropagation();
            const card = this.getCurrentFlashcard();
            if (card) {
                this.playAudio(card.id, 'example', card.example, e.target);
            }
        });

        // Review mode speak buttons
        document.getElementById('speak-review-term').addEventListener('click', (e) => {
            e.stopPropagation();
            const card = this.getCurrentReviewCard();
            if (card) {
                this.playAudio(card.id, 'term', card.term, e.target);
            }
        });

        document.getElementById('speak-review-example').addEventListener('click', (e) => {
            e.stopPropagation();
            const card = this.getCurrentReviewCard();
            if (card) {
                this.playAudio(card.id, 'example', card.example, e.target);
            }
        });
    },

    // Get current flashcard from FlashcardMode
    getCurrentFlashcard() {
        if (typeof FlashcardMode !== 'undefined' && FlashcardMode.filteredCards) {
            return FlashcardMode.filteredCards[FlashcardMode.currentIndex];
        }
        return null;
    },

    // Get current review card from SRS
    getCurrentReviewCard() {
        if (typeof SRS !== 'undefined' && SRS.currentCard) {
            return SRS.currentCard;
        }
        return null;
    },

    // Play pre-recorded audio file
    async playAudio(id, type, fallbackText, button = null) {
        // Stop any ongoing speech
        this.stop();

        // Add speaking animation to button
        if (button) {
            button.classList.add('speaking');
        }

        this.speaking = true;

        // Construct audio file path
        const audioPath = `${this.audioBasePath}${id}-${type}.mp3`;

        try {
            // Create audio element
            this.currentAudio = new Audio(audioPath);

            // Set up event handlers
            this.currentAudio.onended = () => {
                this.cleanupAudio(button);
            };

            this.currentAudio.onerror = () => {
                console.warn(`Audio file not found: ${audioPath}, falling back to browser TTS`);
                this.cleanupAudio(button);
                // Fall back to browser TTS
                this.speakWithBrowser(fallbackText, button);
            };

            // Try to play
            await this.currentAudio.play();

        } catch (error) {
            console.error('Audio playback error:', error);
            this.cleanupAudio(button);
            // Fall back to browser TTS
            this.speakWithBrowser(fallbackText, button);
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

    cleanupAudio(button) {
        if (button) button.classList.remove('speaking');
        this.speaking = false;
        this.currentAudio = null;
    },

    stop() {
        // Stop pre-recorded audio playback
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
