// Voice Practice Module - Speech Recognition for Pronunciation Practice
const VoicePractice = {
    recognition: null,
    isListening: false,
    targetWord: '',

    // Check if speech recognition is supported
    isSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    init() {
        if (!this.isSupported()) {
            console.log('Speech recognition not supported in this browser');
            return;
        }

        // Create speech recognition instance
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        // Configure recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-AU'; // Australian English
        this.recognition.maxAlternatives = 3;

        this.setupEventListeners();
        this.setupRecognitionHandlers();
    },

    setupEventListeners() {
        // Practice button on flashcards
        const practiceBtn = document.getElementById('practice-speaking');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => this.toggleListening());
        }
    },

    setupRecognitionHandlers() {
        if (!this.recognition) return;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI('listening');
            SoundEffects.play('click');
        };

        this.recognition.onresult = (event) => {
            const results = event.results[0];
            const transcript = results[0].transcript.toLowerCase().trim();
            const isFinal = results.isFinal;

            // Show what was heard in real-time
            this.showTranscript(transcript, isFinal);

            if (isFinal) {
                this.evaluatePronunciation(transcript, results);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;

            let message = 'Error occurred. Please try again.';
            if (event.error === 'no-speech') {
                message = "Didn't hear anything. Try again!";
            } else if (event.error === 'audio-capture') {
                message = 'No microphone found. Check your settings.';
            } else if (event.error === 'not-allowed') {
                message = 'Microphone access denied. Please allow access.';
            }

            this.showFeedback(message, 'error');
            this.updateUI('idle');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI('idle');
        };
    },

    toggleListening() {
        if (!this.isSupported()) {
            Gamification.showNotification('Speech recognition not supported in your browser. Try Chrome or Edge.');
            return;
        }

        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    },

    startListening() {
        // Get the current term from the flashcard
        const termElement = document.getElementById('flashcard-term');
        if (!termElement) return;

        this.targetWord = termElement.textContent.toLowerCase().trim();

        if (!this.targetWord || this.targetWord === 'loading...' || this.targetWord === 'no cards available') {
            Gamification.showNotification('No term to practice!');
            return;
        }

        // Reset feedback display
        this.showFeedback('', 'listening');

        try {
            this.recognition.start();
        } catch (e) {
            console.error('Failed to start recognition:', e);
            // Recognition might already be running
            this.recognition.stop();
            setTimeout(() => this.recognition.start(), 100);
        }
    },

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    },

    showTranscript(text, isFinal) {
        const transcriptEl = document.getElementById('voice-transcript');
        if (transcriptEl) {
            transcriptEl.textContent = `"${text}"`;
            transcriptEl.classList.toggle('final', isFinal);
        }
    },

    evaluatePronunciation(transcript, results) {
        // Get all alternatives from recognition
        const alternatives = [];
        for (let i = 0; i < results.length; i++) {
            alternatives.push(results[i].transcript.toLowerCase().trim());
        }

        // Calculate match score
        const matchResult = this.calculateMatch(this.targetWord, transcript, alternatives);

        // Show feedback based on score
        this.showMatchFeedback(matchResult);

        // Award XP for practice
        if (matchResult.score >= 50) {
            Gamification.addXP(2, 'speaking');
        }
    },

    calculateMatch(target, spoken, alternatives) {
        // Normalize strings for comparison
        const normalizedTarget = this.normalizeString(target);
        const normalizedSpoken = this.normalizeString(spoken);

        // Check for exact match first
        if (normalizedTarget === normalizedSpoken) {
            return { score: 100, feedback: 'perfect' };
        }

        // Check alternatives
        for (const alt of alternatives) {
            if (this.normalizeString(alt) === normalizedTarget) {
                return { score: 95, feedback: 'excellent' };
            }
        }

        // Calculate similarity score
        const similarity = this.calculateSimilarity(normalizedTarget, normalizedSpoken);

        // Check if spoken text contains the target word
        if (normalizedSpoken.includes(normalizedTarget)) {
            return { score: Math.max(similarity, 85), feedback: 'good' };
        }

        // Check if target contains spoken (partial match)
        if (normalizedTarget.includes(normalizedSpoken) && normalizedSpoken.length > 2) {
            return { score: Math.max(similarity, 70), feedback: 'partial' };
        }

        // Return similarity score
        if (similarity >= 80) {
            return { score: similarity, feedback: 'good' };
        } else if (similarity >= 60) {
            return { score: similarity, feedback: 'close' };
        } else if (similarity >= 40) {
            return { score: similarity, feedback: 'tryagain' };
        } else {
            return { score: similarity, feedback: 'different' };
        }
    },

    normalizeString(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s]/g, '') // Remove punctuation
            .replace(/\s+/g, ' ');        // Normalize spaces
    },

    // Levenshtein distance based similarity
    calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;

        if (len1 === 0) return len2 === 0 ? 100 : 0;
        if (len2 === 0) return 0;

        // Create distance matrix
        const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,      // Deletion
                    matrix[i][j - 1] + 1,      // Insertion
                    matrix[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        const distance = matrix[len1][len2];
        const maxLen = Math.max(len1, len2);
        return Math.round((1 - distance / maxLen) * 100);
    },

    showMatchFeedback(result) {
        const feedbackEl = document.getElementById('voice-feedback');
        const scoreEl = document.getElementById('voice-score');

        let message = '';
        let className = '';
        let emoji = '';

        switch (result.feedback) {
            case 'perfect':
                message = "Perfect! You nailed it!";
                className = 'excellent';
                emoji = '🎉';
                SoundEffects.play('correct');
                break;
            case 'excellent':
                message = "Excellent pronunciation!";
                className = 'excellent';
                emoji = '⭐';
                SoundEffects.play('correct');
                break;
            case 'good':
                message = "Good job! Well done!";
                className = 'good';
                emoji = '👍';
                SoundEffects.play('correct');
                break;
            case 'close':
                message = "Close! Try emphasizing the sounds more.";
                className = 'close';
                emoji = '👌';
                SoundEffects.play('click');
                break;
            case 'partial':
                message = "Partially correct. Keep practicing!";
                className = 'partial';
                emoji = '🔄';
                SoundEffects.play('click');
                break;
            case 'tryagain':
                message = "Not quite. Listen and try again!";
                className = 'tryagain';
                emoji = '🎯';
                SoundEffects.play('incorrect');
                break;
            case 'different':
                message = "That sounded different. Give it another go!";
                className = 'different';
                emoji = '💪';
                SoundEffects.play('incorrect');
                break;
        }

        if (feedbackEl) {
            feedbackEl.textContent = `${emoji} ${message}`;
            feedbackEl.className = `voice-feedback ${className}`;
        }

        if (scoreEl) {
            scoreEl.textContent = `${result.score}%`;
            scoreEl.className = `voice-score ${className}`;
        }

        // Show the feedback container
        const container = document.getElementById('voice-practice-feedback');
        if (container) {
            container.classList.remove('hidden');
        }
    },

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('voice-feedback');
        const scoreEl = document.getElementById('voice-score');
        const transcriptEl = document.getElementById('voice-transcript');

        if (transcriptEl) {
            transcriptEl.textContent = '';
        }

        if (feedbackEl) {
            feedbackEl.textContent = message;
            feedbackEl.className = `voice-feedback ${type}`;
        }

        if (scoreEl) {
            scoreEl.textContent = type === 'error' ? '⚠️' : '';
            scoreEl.className = type === 'error' ? 'voice-score' : '';
        }

        const container = document.getElementById('voice-practice-feedback');
        if (container) {
            // Show container for both listening and error states
            if (type === 'listening' || type === 'error') {
                container.classList.remove('hidden');
            }
        }
    },

    updateUI(state) {
        const btn = document.getElementById('practice-speaking');
        const indicator = document.getElementById('recording-indicator');

        if (btn) {
            if (state === 'listening') {
                btn.classList.add('recording');
                btn.setAttribute('title', 'Stop Recording');
            } else {
                btn.classList.remove('recording');
                btn.setAttribute('title', 'Practice Speaking');
            }
        }

        if (indicator) {
            indicator.classList.toggle('active', state === 'listening');
        }
    },

    // Reset feedback when changing cards
    resetFeedback() {
        const container = document.getElementById('voice-practice-feedback');
        const transcriptEl = document.getElementById('voice-transcript');
        const feedbackEl = document.getElementById('voice-feedback');
        const scoreEl = document.getElementById('voice-score');

        if (container) container.classList.add('hidden');
        if (transcriptEl) transcriptEl.textContent = '';
        if (feedbackEl) feedbackEl.textContent = '';
        if (scoreEl) scoreEl.textContent = '';

        this.stopListening();
    }
};
