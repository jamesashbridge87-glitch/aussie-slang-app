// Main App Logic
const App = {
    currentMode: 'flashcards',

    init() {
        this.setupModeSelector();
        this.initializeModules();
    },

    setupModeSelector() {
        const modeButtons = document.querySelectorAll('.mode-btn');

        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });
    },

    switchMode(mode) {
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

    initializeModules() {
        // Initialize all modes
        FlashcardMode.init();
        QuizMode.init();
        SRSMode.init();
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
