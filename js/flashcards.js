// Flashcard Mode Logic
const FlashcardMode = {
    currentIndex: 0,
    filteredCards: [],
    isFlipped: false,

    init() {
        this.filteredCards = [...slangData];
        this.setupEventListeners();
        this.populateCategoryFilter();
        this.updateCard();
    },

    setupEventListeners() {
        // Flip card
        document.getElementById('flashcard').addEventListener('click', (e) => {
            // Don't flip if clicking speak or favorite button
            if (e.target.closest('.speak-btn') || e.target.closest('.icon-btn')) return;
            this.flipCard();
        });
        document.getElementById('flip-card').addEventListener('click', () => this.flipCard());

        // Navigation
        document.getElementById('prev-card').addEventListener('click', () => this.prevCard());
        document.getElementById('next-card').addEventListener('click', () => this.nextCard());

        // Shuffle button
        document.getElementById('shuffle-cards').addEventListener('click', () => {
            this.shuffle();
            SoundEffects.play('click');
            Gamification.showNotification('Cards shuffled! 🔀');
        });

        // Favorite button
        document.getElementById('favorite-card').addEventListener('click', () => {
            this.toggleCurrentFavorite();
        });

        // Category filter
        document.getElementById('flashcard-category').addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Difficulty filter
        document.getElementById('flashcard-difficulty')?.addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('flashcards-mode').classList.contains('active')) {
                if (e.key === 'ArrowLeft') this.prevCard();
                if (e.key === 'ArrowRight') this.nextCard();
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    this.flipCard();
                }
                if (e.key === 'f' || e.key === 'F') {
                    this.toggleCurrentFavorite();
                }
                if (e.key === 's' || e.key === 'S') {
                    this.shuffle();
                    SoundEffects.play('click');
                }
            }
        });
    },

    populateCategoryFilter() {
        const select = document.getElementById('flashcard-category');
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = categoryNames[cat] || cat;
            select.appendChild(option);
        });

        // Add favorites option
        const favOption = document.createElement('option');
        favOption.value = 'favorites';
        favOption.textContent = '⭐ Favorites';
        select.appendChild(favOption);
    },

    filterByCategory(category) {
        if (category === 'all') {
            this.filteredCards = [...slangData];
        } else if (category === 'favorites') {
            this.filteredCards = slangData.filter(item =>
                Gamification.isFavorite(item.id)
            );
            if (this.filteredCards.length === 0) {
                Gamification.showNotification('No favorites yet! Add some first.');
                document.getElementById('flashcard-category').value = 'all';
                this.filteredCards = [...slangData];
            }
        } else {
            this.filteredCards = slangData.filter(item => item.category === category);
        }
        this.currentIndex = 0;
        this.updateCard();
    },

    applyFilters() {
        const category = document.getElementById('flashcard-category').value;
        const difficulty = document.getElementById('flashcard-difficulty')?.value || 'all';

        // Start with all cards
        let filtered = [...slangData];

        // Apply category filter
        if (category === 'favorites') {
            filtered = filtered.filter(item => Gamification.isFavorite(item.id));
            if (filtered.length === 0) {
                Gamification.showNotification('No favorites yet! Add some first.');
                document.getElementById('flashcard-category').value = 'all';
                filtered = [...slangData];
            }
        } else if (category !== 'all') {
            filtered = filtered.filter(item => item.category === category);
        }

        // Apply difficulty filter
        if (difficulty !== 'all') {
            filtered = filtered.filter(item => item.difficulty === difficulty);
        }

        if (filtered.length === 0) {
            Gamification.showNotification('No cards match these filters.');
            // Reset filters
            document.getElementById('flashcard-category').value = 'all';
            if (document.getElementById('flashcard-difficulty')) {
                document.getElementById('flashcard-difficulty').value = 'all';
            }
            filtered = [...slangData];
        }

        this.filteredCards = filtered;
        this.currentIndex = 0;
        this.updateCard();
    },

    flipCard() {
        const card = document.getElementById('flashcard');
        card.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;
        SoundEffects.play('flip');

        const flipBtn = document.getElementById('flip-card');
        flipBtn.textContent = this.isFlipped ? 'Show Term' : 'Flip Card';

        // Record card view for XP (only when revealing answer)
        if (this.isFlipped) {
            Gamification.recordCardView();
        }
    },

    nextCard() {
        if (this.filteredCards.length === 0) return;

        // Reset flip state
        if (this.isFlipped) {
            document.getElementById('flashcard').classList.remove('flipped');
            this.isFlipped = false;
            document.getElementById('flip-card').textContent = 'Flip Card';
        }

        // Reset voice practice feedback
        if (typeof VoicePractice !== 'undefined') {
            VoicePractice.resetFeedback();
        }

        this.currentIndex = (this.currentIndex + 1) % this.filteredCards.length;
        this.updateCard();
        SoundEffects.play('navigate');
    },

    prevCard() {
        if (this.filteredCards.length === 0) return;

        // Reset flip state
        if (this.isFlipped) {
            document.getElementById('flashcard').classList.remove('flipped');
            this.isFlipped = false;
            document.getElementById('flip-card').textContent = 'Flip Card';
        }

        // Reset voice practice feedback
        if (typeof VoicePractice !== 'undefined') {
            VoicePractice.resetFeedback();
        }

        this.currentIndex = (this.currentIndex - 1 + this.filteredCards.length) % this.filteredCards.length;
        this.updateCard();
        SoundEffects.play('navigate');
    },

    updateCard() {
        if (this.filteredCards.length === 0) {
            document.getElementById('flashcard-term').textContent = 'No cards available';
            document.getElementById('flashcard-meaning').textContent = '';
            document.getElementById('flashcard-example').textContent = '';
            document.getElementById('current-card').textContent = '0';
            document.getElementById('total-cards').textContent = '0';
            this.updateProgressBar();
            this.updateFavoriteButton();
            return;
        }

        const card = this.filteredCards[this.currentIndex];
        document.getElementById('flashcard-term').textContent = card.term;
        document.getElementById('flashcard-meaning').textContent = card.meaning;
        document.getElementById('flashcard-example').textContent = `"${card.example}"`;
        document.getElementById('current-card').textContent = this.currentIndex + 1;
        document.getElementById('total-cards').textContent = this.filteredCards.length;

        // Update difficulty badge
        const difficultyBadge = document.getElementById('card-difficulty');
        if (difficultyBadge && card.difficulty) {
            difficultyBadge.textContent = difficultyNames[card.difficulty] || card.difficulty;
            difficultyBadge.className = `difficulty-badge ${card.difficulty}`;
        }

        this.updateProgressBar();
        this.updateFavoriteButton();
    },

    updateProgressBar() {
        const progressBar = document.getElementById('flashcard-progress');
        if (this.filteredCards.length === 0) {
            progressBar.style.width = '0%';
        } else {
            const progress = ((this.currentIndex + 1) / this.filteredCards.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    },

    updateFavoriteButton() {
        const favBtn = document.getElementById('favorite-card');
        if (this.filteredCards.length === 0) {
            favBtn.textContent = '☆';
            favBtn.classList.remove('active');
            return;
        }

        const card = this.filteredCards[this.currentIndex];
        const isFav = Gamification.isFavorite(card.id);
        favBtn.textContent = isFav ? '★' : '☆';
        favBtn.classList.toggle('active', isFav);
    },

    toggleCurrentFavorite() {
        if (this.filteredCards.length === 0) return;

        const card = this.filteredCards[this.currentIndex];
        Gamification.toggleFavorite(card.id);
        SoundEffects.play('click');
        this.updateFavoriteButton();
    },

    shuffle() {
        // Fisher-Yates shuffle
        for (let i = this.filteredCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.filteredCards[i], this.filteredCards[j]] = [this.filteredCards[j], this.filteredCards[i]];
        }
        this.currentIndex = 0;
        this.updateCard();
    }
};
