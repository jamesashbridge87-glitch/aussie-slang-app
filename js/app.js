// Main App Logic
const App = {
    currentMode: 'flashcards',

    init() {
        this.setupModeSelector();
        this.setupSoundToggle();
        this.initializeModules();
    },

    setupModeSelector() {
        const modeButtons = document.querySelectorAll('.mode-btn');

        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
                SoundEffects.play('click');
            });
        });
    },

    setupSoundToggle() {
        const toggle = document.getElementById('sound-toggle');

        // Set initial state from saved preference
        if (!SoundEffects.enabled) {
            toggle.classList.add('muted');
        }

        toggle.addEventListener('click', () => {
            const enabled = SoundEffects.toggle();
            toggle.classList.toggle('muted', !enabled);
            if (enabled) {
                SoundEffects.play('click');
            }
        });
    },

    switchMode(mode) {
        // Check if there's an active game in progress
        if (this.hasActiveGame() && mode !== this.currentMode) {
            if (!confirm('You have a game in progress. Switching modes will lose your progress. Continue?')) {
                // Re-activate the current mode button
                document.querySelectorAll('.mode-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
                });
                return;
            }
        }

        this.currentMode = mode;

        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Update section visibility
        document.querySelectorAll('.mode-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${mode}-mode`).classList.add('active');

        // Refresh stats when switching to review mode
        if (mode === 'review') {
            SRSMode.updateStats();
        }
    },

    hasActiveGame() {
        // Check if quiz is in progress
        if (typeof QuizMode !== 'undefined' &&
            !document.getElementById('quiz-start').classList.contains('hidden') === false &&
            !document.getElementById('quiz-results').classList.contains('hidden') === false &&
            !document.getElementById('quiz-question').classList.contains('hidden')) {
            return true;
        }

        // Check if fill-in-the-blank is in progress
        if (typeof FillBlankMode !== 'undefined' &&
            !document.getElementById('fillblank-game').classList.contains('hidden')) {
            return true;
        }

        // Check if sentence builder is in progress
        if (typeof SentenceBuilder !== 'undefined' &&
            !document.getElementById('builder-game').classList.contains('hidden')) {
            return true;
        }

        // Check if SRS review is in progress
        if (typeof SRSMode !== 'undefined' &&
            !document.getElementById('review-card').classList.contains('hidden')) {
            return true;
        }

        return false;
    },

    initializeModules() {
        // Initialize dark mode first (affects whole UI)
        DarkMode.init();

        // Initialize gamification (other modules depend on it)
        Gamification.init();

        // Initialize all modes
        FlashcardMode.init();
        QuizMode.init();
        FillBlankMode.init();
        SentenceBuilder.init();
        SRSMode.init();
        Speech.init();
        VoicePractice.init();
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
