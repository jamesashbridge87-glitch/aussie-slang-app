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
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
        document.getElementById('flip-card').addEventListener('click', () => this.flipCard());

        // Navigation
        document.getElementById('prev-card').addEventListener('click', () => this.prevCard());
        document.getElementById('next-card').addEventListener('click', () => this.nextCard());

        // Category filter
        document.getElementById('flashcard-category').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
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
    },

    filterByCategory(category) {
        if (category === 'all') {
            this.filteredCards = [...slangData];
        } else {
            this.filteredCards = slangData.filter(item => item.category === category);
        }
        this.currentIndex = 0;
        this.updateCard();
    },

    flipCard() {
        const card = document.getElementById('flashcard');
        card.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;

        const flipBtn = document.getElementById('flip-card');
        flipBtn.textContent = this.isFlipped ? 'Show Term' : 'Flip Card';
    },

    nextCard() {
        if (this.filteredCards.length === 0) return;

        // Reset flip state
        if (this.isFlipped) {
            document.getElementById('flashcard').classList.remove('flipped');
            this.isFlipped = false;
            document.getElementById('flip-card').textContent = 'Flip Card';
        }

        this.currentIndex = (this.currentIndex + 1) % this.filteredCards.length;
        this.updateCard();
    },

    prevCard() {
        if (this.filteredCards.length === 0) return;

        // Reset flip state
        if (this.isFlipped) {
            document.getElementById('flashcard').classList.remove('flipped');
            this.isFlipped = false;
            document.getElementById('flip-card').textContent = 'Flip Card';
        }

        this.currentIndex = (this.currentIndex - 1 + this.filteredCards.length) % this.filteredCards.length;
        this.updateCard();
    },

    updateCard() {
        if (this.filteredCards.length === 0) {
            document.getElementById('flashcard-term').textContent = 'No cards available';
            document.getElementById('flashcard-meaning').textContent = '';
            document.getElementById('flashcard-example').textContent = '';
            document.getElementById('current-card').textContent = '0';
            document.getElementById('total-cards').textContent = '0';
            return;
        }

        const card = this.filteredCards[this.currentIndex];
        document.getElementById('flashcard-term').textContent = card.term;
        document.getElementById('flashcard-meaning').textContent = card.meaning;
        document.getElementById('flashcard-example').textContent = `"${card.example}"`;
        document.getElementById('current-card').textContent = this.currentIndex + 1;
        document.getElementById('total-cards').textContent = this.filteredCards.length;
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
