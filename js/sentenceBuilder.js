// Sentence Builder Game - Drag and drop words to complete sentences
const SentenceBuilder = {
    currentSentence: null,
    currentIndex: 0,
    score: 0,
    totalQuestions: 10,
    sentences: [],
    selectedWord: null,
    isComplete: false,

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('start-builder')?.addEventListener('click', () => this.startGame());
        document.getElementById('restart-builder')?.addEventListener('click', () => this.startGame());
        document.getElementById('skip-sentence')?.addEventListener('click', () => this.skipSentence());
        document.getElementById('hint-btn')?.addEventListener('click', () => this.showHint());
    },

    startGame() {
        this.score = 0;
        this.currentIndex = 0;
        this.isComplete = false;

        // Shuffle and select sentences
        this.sentences = this.shuffleArray([...sentenceTemplates]).slice(0, this.totalQuestions);

        if (this.sentences.length < 5) {
            Gamification.showNotification('Not enough sentences ready, mate!');
            return;
        }

        // Update UI
        document.getElementById('builder-score').textContent = '0';
        document.getElementById('builder-total').textContent = this.sentences.length;

        this.showScreen('builder-game');
        this.loadSentence();
        SoundEffects.play('start');
    },

    loadSentence() {
        if (this.currentIndex >= this.sentences.length) {
            this.showResults();
            return;
        }

        this.currentSentence = this.sentences[this.currentIndex];
        this.selectedWord = null;
        this.isComplete = false;

        // Update progress
        document.getElementById('builder-current').textContent = this.currentIndex + 1;

        // Display sentence with blank
        const sentenceDisplay = document.getElementById('sentence-display');
        const parts = this.currentSentence.sentence.split('___');
        sentenceDisplay.innerHTML = `
            <span class="sentence-part">${parts[0]}</span>
            <span class="word-blank" id="word-blank">???</span>
            <span class="sentence-part">${parts[1] || ''}</span>
        `;

        // Generate word options (correct + distractors)
        this.generateWordOptions();

        // Reset hint
        document.getElementById('hint-text').textContent = '';
        document.getElementById('hint-text').classList.add('hidden');

        // Hide feedback
        document.getElementById('builder-feedback').classList.add('hidden');
    },

    generateWordOptions() {
        const wordBank = document.getElementById('word-bank');
        wordBank.innerHTML = '';

        // Get the correct answer
        const correctAnswer = this.currentSentence.answer;

        // Get distractors (other answers from the templates)
        let distractors = sentenceTemplates
            .filter(t => t.answer !== correctAnswer)
            .map(t => t.answer);
        distractors = this.shuffleArray(distractors).slice(0, 5);

        // Combine and shuffle all options
        const allOptions = this.shuffleArray([correctAnswer, ...distractors]);

        // Create draggable word elements
        allOptions.forEach(word => {
            const wordEl = document.createElement('div');
            wordEl.className = 'draggable-word';
            wordEl.textContent = word;
            wordEl.draggable = true;
            wordEl.dataset.word = word;

            // Drag events
            wordEl.addEventListener('dragstart', (e) => this.handleDragStart(e));
            wordEl.addEventListener('dragend', (e) => this.handleDragEnd(e));

            // Click/tap for mobile
            wordEl.addEventListener('click', (e) => this.handleWordClick(e));

            wordBank.appendChild(wordEl);
        });

        // Setup drop zone
        const blank = document.getElementById('word-blank');
        blank.addEventListener('dragover', (e) => this.handleDragOver(e));
        blank.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        blank.addEventListener('drop', (e) => this.handleDrop(e));
        blank.addEventListener('click', () => this.handleBlankClick());
    },

    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.word);
        e.dataTransfer.effectAllowed = 'move';
    },

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    },

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        document.getElementById('word-blank').classList.add('drag-over');
    },

    handleDragLeave(e) {
        document.getElementById('word-blank').classList.remove('drag-over');
    },

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('word-blank').classList.remove('drag-over');

        const word = e.dataTransfer.getData('text/plain');
        this.checkAnswer(word);
    },

    handleWordClick(e) {
        if (this.isComplete) return;

        // Remove selection from other words
        document.querySelectorAll('.draggable-word').forEach(w => w.classList.remove('selected'));

        // Select this word
        e.target.classList.add('selected');
        this.selectedWord = e.target.dataset.word;

        // Update blank to show selected word
        const blank = document.getElementById('word-blank');
        blank.textContent = this.selectedWord;
        blank.classList.add('filled');
    },

    handleBlankClick() {
        if (this.isComplete) return;

        if (this.selectedWord) {
            this.checkAnswer(this.selectedWord);
        }
    },

    checkAnswer(word) {
        if (this.isComplete) return;
        this.isComplete = true;

        const blank = document.getElementById('word-blank');
        blank.textContent = word;
        blank.classList.add('filled');

        const isCorrect = word.toLowerCase() === this.currentSentence.answer.toLowerCase();
        const feedback = document.getElementById('builder-feedback');
        const feedbackText = document.getElementById('builder-feedback-text');

        // Highlight the selected word
        document.querySelectorAll('.draggable-word').forEach(w => {
            w.classList.remove('selected');
            if (w.dataset.word.toLowerCase() === this.currentSentence.answer.toLowerCase()) {
                w.classList.add('correct-word');
            }
            if (w.dataset.word === word && !isCorrect) {
                w.classList.add('incorrect-word');
            }
            w.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            this.score++;
            document.getElementById('builder-score').textContent = this.score;
            blank.classList.add('correct');
            feedbackText.textContent = "Spot on, legend!";
            feedback.className = 'builder-feedback correct';
            SoundEffects.play('correct');
            Gamification.addXP(5, 'builder');
            Gamification.recordQuizCorrect();
        } else {
            blank.classList.add('incorrect');
            feedbackText.textContent = `Close! It was "${this.currentSentence.answer}"`;
            feedback.className = 'builder-feedback incorrect';
            SoundEffects.play('incorrect');
        }

        feedback.classList.remove('hidden');

        // Auto-advance after delay
        setTimeout(() => {
            this.currentIndex++;
            this.loadSentence();
        }, 2000);
    },

    skipSentence() {
        if (this.isComplete) return;
        this.currentIndex++;
        this.loadSentence();
        SoundEffects.play('click');
    },

    showHint() {
        const hintText = document.getElementById('hint-text');
        hintText.textContent = `Hint: ${this.currentSentence.hint}`;
        hintText.classList.remove('hidden');
        SoundEffects.play('click');
    },

    showResults() {
        this.showScreen('builder-results');
        SoundEffects.play('success');

        document.getElementById('builder-final-score').textContent = this.score;
        document.getElementById('builder-final-total').textContent = this.sentences.length;

        const percentage = (this.score / this.sentences.length) * 100;
        const message = document.getElementById('builder-results-message');

        if (percentage === 100) {
            message.textContent = "You absolute legend! Perfect score! 🏆";
        } else if (percentage >= 80) {
            message.textContent = "Ripper effort! You're getting the hang of it!";
        } else if (percentage >= 60) {
            message.textContent = "Good on ya, mate! Keep at it!";
        } else if (percentage >= 40) {
            message.textContent = "No worries! Have another crack at it!";
        } else {
            message.textContent = "She'll be right! Practice makes perfect, mate!";
        }

        // Record completion for gamification
        Gamification.recordQuizComplete(this.score, this.sentences.length);
    },

    showScreen(screenId) {
        ['builder-start', 'builder-game', 'builder-results'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        const target = document.getElementById(screenId);
        if (target) target.classList.remove('hidden');
    },

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};
