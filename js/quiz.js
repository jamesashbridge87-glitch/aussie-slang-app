// Quiz Mode Logic
const QuizMode = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    direction: 'term-to-meaning',
    answered: false,

    init() {
        this.setupEventListeners();
        this.populateCategoryFilter();
    },

    setupEventListeners() {
        document.getElementById('start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('restart-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());

        document.getElementById('quiz-category').addEventListener('change', () => {
            // Reset to start screen when category changes
            this.showScreen('quiz-start');
        });

        document.getElementById('quiz-direction').addEventListener('change', (e) => {
            this.direction = e.target.value;
        });
    },

    populateCategoryFilter() {
        const select = document.getElementById('quiz-category');
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = categoryNames[cat] || cat;
            select.appendChild(option);
        });
    },

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;

        // Filter cards by category
        const category = document.getElementById('quiz-category').value;
        let availableCards = category === 'all'
            ? [...slangData]
            : slangData.filter(item => item.category === category);

        // Shuffle and limit questions
        this.questions = this.shuffleArray(availableCards).slice(0, this.totalQuestions);

        if (this.questions.length < 4) {
            alert('Not enough terms in this category for a quiz. Please select a different category.');
            return;
        }

        // Update totals
        document.getElementById('quiz-total').textContent = this.questions.length;
        document.getElementById('quiz-score').textContent = '0';

        this.showScreen('quiz-question');
        this.displayQuestion();
    },

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('answer-options');

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Set question text based on direction
        if (this.direction === 'term-to-meaning') {
            questionText.textContent = `What does "${question.term}" mean?`;
        } else {
            questionText.textContent = `Which slang term means "${question.meaning}"?`;
        }

        // Generate options (1 correct + 3 wrong)
        const options = this.generateOptions(question);

        // Create option buttons
        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = this.direction === 'term-to-meaning' ? option.meaning : option.term;
            btn.dataset.correct = option.id === question.id ? 'true' : 'false';
            btn.addEventListener('click', (e) => this.selectAnswer(e.target));
            optionsContainer.appendChild(btn);
        });

        // Update progress
        document.getElementById('quiz-current').textContent = this.currentQuestion + 1;

        // Hide feedback
        document.getElementById('quiz-feedback').classList.add('hidden');
        this.answered = false;
    },

    generateOptions(correctAnswer) {
        // Get 3 random wrong answers
        const wrongAnswers = slangData
            .filter(item => item.id !== correctAnswer.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        // Combine and shuffle
        return this.shuffleArray([correctAnswer, ...wrongAnswers]);
    },

    selectAnswer(button) {
        if (this.answered) return;
        this.answered = true;

        const isCorrect = button.dataset.correct === 'true';
        const feedback = document.getElementById('quiz-feedback');
        const feedbackText = document.getElementById('feedback-text');

        // Mark all buttons
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.classList.add('disabled');
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            this.score++;
            document.getElementById('quiz-score').textContent = this.score;
            button.classList.add('correct');
            feedback.className = 'feedback correct';
            feedbackText.textContent = "Correct! Good on ya!";
        } else {
            button.classList.add('incorrect');
            feedback.className = 'feedback incorrect';
            const correctAnswer = this.questions[this.currentQuestion];
            feedbackText.textContent = `Wrong! The answer was: ${correctAnswer.meaning}`;
        }

        feedback.classList.remove('hidden');

        // Update next button text
        const nextBtn = document.getElementById('next-question');
        nextBtn.textContent = this.currentQuestion < this.questions.length - 1
            ? 'Next Question'
            : 'See Results';
    },

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
        } else {
            this.displayQuestion();
        }
    },

    showResults() {
        this.showScreen('quiz-results');

        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-total').textContent = this.questions.length;

        // Generate message based on score
        const percentage = (this.score / this.questions.length) * 100;
        const message = document.getElementById('results-message');

        if (percentage === 100) {
            message.textContent = "Strewth! You're a true blue Aussie!";
        } else if (percentage >= 80) {
            message.textContent = "Ripper! You're almost fluent in Aussie!";
        } else if (percentage >= 60) {
            message.textContent = "Not bad, mate! Keep practicing!";
        } else if (percentage >= 40) {
            message.textContent = "She'll be right, mate. Give it another go!";
        } else {
            message.textContent = "No worries, mate. Practice makes perfect!";
        }
    },

    showScreen(screenId) {
        ['quiz-start', 'quiz-question', 'quiz-results'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
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
