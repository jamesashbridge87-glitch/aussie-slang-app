// Fill-in-the-Blank Quiz Mode
const FillBlankMode = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    userAnswer: '',

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('start-fillblank')?.addEventListener('click', () => this.startQuiz());
        document.getElementById('restart-fillblank')?.addEventListener('click', () => this.startQuiz());
        document.getElementById('submit-fillblank')?.addEventListener('click', () => this.submitAnswer());
        document.getElementById('next-fillblank')?.addEventListener('click', () => this.nextQuestion());

        // Handle Enter key on input
        document.getElementById('fillblank-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (document.getElementById('fillblank-feedback').classList.contains('hidden')) {
                    this.submitAnswer();
                } else {
                    this.nextQuestion();
                }
            }
        });

        // Difficulty filter
        document.getElementById('fillblank-difficulty')?.addEventListener('change', () => {
            // Reset when difficulty changes
        });
    },

    startQuiz() {
        this.score = 0;
        this.currentQuestion = 0;
        this.userAnswer = '';

        // Get difficulty setting
        const difficulty = document.getElementById('fillblank-difficulty')?.value || 'all';

        // Filter by difficulty if selected
        let availableTerms = difficulty === 'all'
            ? [...slangData]
            : slangData.filter(item => item.difficulty === difficulty);

        // Shuffle and select questions
        this.questions = this.shuffleArray(availableTerms).slice(0, this.totalQuestions);

        if (this.questions.length < 5) {
            Gamification.showNotification('Not enough terms for that level, mate!');
            return;
        }

        // Update totals
        document.getElementById('fillblank-total').textContent = this.questions.length;
        document.getElementById('fillblank-score').textContent = '0';

        this.showScreen('fillblank-game');
        this.loadQuestion();
        SoundEffects.play('start');
    },

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];

        // Update progress
        document.getElementById('fillblank-current').textContent = this.currentQuestion + 1;

        // Create the sentence with blank
        // Replace the slang term in the example with a blank
        const example = question.example;
        const term = question.term;

        // Find the term in the example (case-insensitive)
        const regex = new RegExp(this.escapeRegex(term), 'gi');
        const sentenceWithBlank = example.replace(regex, '_____');

        document.getElementById('fillblank-sentence').textContent = sentenceWithBlank;
        document.getElementById('fillblank-hint').textContent = `Meaning: ${question.meaning}`;

        // Reset input and feedback
        const input = document.getElementById('fillblank-input');
        input.value = '';
        input.disabled = false;
        input.focus();

        document.getElementById('fillblank-feedback').classList.add('hidden');
        document.getElementById('submit-fillblank').classList.remove('hidden');
        document.getElementById('next-fillblank').classList.add('hidden');
    },

    submitAnswer() {
        const input = document.getElementById('fillblank-input');
        const userAnswer = input.value.trim();

        if (!userAnswer) {
            Gamification.showNotification('Give it a go first, mate!');
            return;
        }

        const question = this.questions[this.currentQuestion];
        const correctAnswer = question.term.toLowerCase();
        const userAnswerLower = userAnswer.toLowerCase();

        // Check if answer is correct (allow minor variations)
        const isCorrect = this.checkAnswer(userAnswerLower, correctAnswer);

        const feedback = document.getElementById('fillblank-feedback');
        const feedbackText = document.getElementById('fillblank-feedback-text');

        input.disabled = true;

        if (isCorrect) {
            this.score++;
            document.getElementById('fillblank-score').textContent = this.score;
            input.classList.add('correct');
            feedbackText.textContent = "Spot on, legend!";
            feedback.className = 'fillblank-feedback correct';
            SoundEffects.play('correct');
            Gamification.recordQuizCorrect();
        } else {
            input.classList.add('incorrect');
            feedbackText.innerHTML = `Close! It was: <strong>${question.term}</strong>`;
            feedback.className = 'fillblank-feedback incorrect';
            SoundEffects.play('incorrect');
        }

        feedback.classList.remove('hidden');
        document.getElementById('submit-fillblank').classList.add('hidden');
        document.getElementById('next-fillblank').classList.remove('hidden');
        document.getElementById('next-fillblank').focus();
    },

    checkAnswer(userAnswer, correctAnswer) {
        // Exact match
        if (userAnswer === correctAnswer) return true;

        // Remove punctuation and compare
        const cleanUser = userAnswer.replace(/[^a-z0-9\s]/g, '').trim();
        const cleanCorrect = correctAnswer.replace(/[^a-z0-9\s]/g, '').trim();
        if (cleanUser === cleanCorrect) return true;

        // Check similarity (allow typos)
        const similarity = this.calculateSimilarity(cleanUser, cleanCorrect);
        if (similarity >= 85) return true;

        return false;
    },

    calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;

        if (len1 === 0) return len2 === 0 ? 100 : 0;
        if (len2 === 0) return 0;

        const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        const distance = matrix[len1][len2];
        const maxLen = Math.max(len1, len2);
        return Math.round((1 - distance / maxLen) * 100);
    },

    nextQuestion() {
        // Reset input styling
        const input = document.getElementById('fillblank-input');
        input.classList.remove('correct', 'incorrect');

        this.currentQuestion++;
        this.loadQuestion();
        SoundEffects.play('click');
    },

    showResults() {
        this.showScreen('fillblank-results');
        SoundEffects.play('success');

        document.getElementById('fillblank-final-score').textContent = this.score;
        document.getElementById('fillblank-final-total').textContent = this.questions.length;

        const percentage = (this.score / this.questions.length) * 100;
        const message = document.getElementById('fillblank-results-message');

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

        // Record completion
        Gamification.recordQuizComplete(this.score, this.questions.length);
    },

    showScreen(screenId) {
        ['fillblank-start', 'fillblank-game', 'fillblank-results'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        const target = document.getElementById(screenId);
        if (target) target.classList.remove('hidden');
    },

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
