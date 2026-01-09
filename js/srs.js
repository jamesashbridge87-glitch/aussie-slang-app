// Spaced Repetition System (SRS) Logic
// Based on a simplified SM-2 algorithm

const SRSMode = {
    STORAGE_KEY: 'aussie_slang_srs',
    reviewQueue: [],
    currentCard: null,
    isFlipped: false,

    // Default card state
    defaultCardState: {
        easeFactor: 2.5,  // Multiplier for interval
        interval: 1,       // Days until next review
        repetitions: 0,    // Number of successful reviews
        nextReview: null,  // Date of next review
        lastReview: null   // Date of last review
    },

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.updateStats();
    },

    setupEventListeners() {
        document.getElementById('start-review').addEventListener('click', () => this.startReview());
        document.getElementById('reset-progress').addEventListener('click', () => this.resetProgress());
        document.getElementById('flip-review').addEventListener('click', () => this.flipCard());
        document.getElementById('back-to-stats').addEventListener('click', () => this.showScreen('review-stats'));

        // Rating buttons
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.rateCard(rating);
            });
        });

        // Keyboard shortcut for flip
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('review-mode').classList.contains('active') &&
                !document.getElementById('review-card').classList.contains('hidden')) {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    if (!this.isFlipped) {
                        this.flipCard();
                    }
                }
                // Number keys for rating
                if (this.isFlipped && e.key >= '1' && e.key <= '5') {
                    this.rateCard(parseInt(e.key));
                }
            }
        });
    },

    loadProgress() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.cardStates = JSON.parse(stored);
        } else {
            // Initialize all cards with default state
            this.cardStates = {};
            slangData.forEach(card => {
                this.cardStates[card.id] = {
                    ...this.defaultCardState,
                    nextReview: new Date().toISOString()
                };
            });
            this.saveProgress();
        }
    },

    saveProgress() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cardStates));
    },

    updateStats() {
        const now = new Date();
        let dueToday = 0;
        let totalLearned = 0;
        let mastered = 0;

        Object.entries(this.cardStates).forEach(([id, state]) => {
            if (state.repetitions > 0) {
                totalLearned++;
            }
            if (state.interval >= 21) { // Consider "mastered" after 21+ day interval
                mastered++;
            }
            if (new Date(state.nextReview) <= now) {
                dueToday++;
            }
        });

        document.getElementById('due-today').textContent = dueToday;
        document.getElementById('total-learned').textContent = totalLearned;
        document.getElementById('mastered-count').textContent = mastered;

        // Update start button state
        const startBtn = document.getElementById('start-review');
        if (dueToday === 0) {
            startBtn.textContent = 'No Cards Due';
            startBtn.disabled = true;
        } else {
            startBtn.textContent = `Start Review (${dueToday})`;
            startBtn.disabled = false;
        }
    },

    getCardsForReview() {
        const now = new Date();
        return slangData.filter(card => {
            const state = this.cardStates[card.id];
            return new Date(state.nextReview) <= now;
        });
    },

    startReview() {
        this.reviewQueue = this.getCardsForReview();

        if (this.reviewQueue.length === 0) {
            alert('No cards due for review! Come back later.');
            return;
        }

        // Shuffle the review queue
        for (let i = this.reviewQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.reviewQueue[i], this.reviewQueue[j]] = [this.reviewQueue[j], this.reviewQueue[i]];
        }

        this.showScreen('review-card');
        this.showNextCard();
    },

    showNextCard() {
        if (this.reviewQueue.length === 0) {
            this.showScreen('review-complete');
            this.updateStats();
            return;
        }

        this.currentCard = this.reviewQueue.shift();
        this.isFlipped = false;

        // Reset card display
        document.getElementById('review-flashcard').classList.remove('flipped');
        document.getElementById('rating-buttons').classList.add('hidden');
        document.getElementById('flip-review').classList.remove('hidden');
        document.getElementById('flip-review').textContent = 'Show Answer';

        // Update card content
        document.getElementById('review-term').textContent = this.currentCard.term;
        document.getElementById('review-meaning').textContent = this.currentCard.meaning;
        document.getElementById('review-example').textContent = `"${this.currentCard.example}"`;
        document.getElementById('review-remaining').textContent = this.reviewQueue.length + 1;
    },

    flipCard() {
        const card = document.getElementById('review-flashcard');
        card.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;

        if (this.isFlipped) {
            document.getElementById('flip-review').classList.add('hidden');
            document.getElementById('rating-buttons').classList.remove('hidden');
        }
    },

    rateCard(rating) {
        const state = this.cardStates[this.currentCard.id];

        // SM-2 algorithm (simplified)
        if (rating < 3) {
            // Failed - reset progress
            state.repetitions = 0;
            state.interval = 1;
        } else {
            // Passed
            if (state.repetitions === 0) {
                state.interval = 1;
            } else if (state.repetitions === 1) {
                state.interval = 6;
            } else {
                state.interval = Math.round(state.interval * state.easeFactor);
            }
            state.repetitions++;
        }

        // Adjust ease factor based on rating
        state.easeFactor = Math.max(1.3,
            state.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
        );

        // Set next review date
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + state.interval);
        state.nextReview = nextReview.toISOString();
        state.lastReview = new Date().toISOString();

        this.saveProgress();
        this.showNextCard();
    },

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(this.STORAGE_KEY);
            this.loadProgress();
            this.updateStats();
            this.showScreen('review-stats');
        }
    },

    showScreen(screenId) {
        ['review-stats', 'review-card', 'review-complete'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }
};
