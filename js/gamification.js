// Gamification System - XP, Levels, Streaks, Achievements, Favorites
// Your Aussie Uncle - friendly, casual, encouraging
const Gamification = {
    STORAGE_KEY: 'your_aussie_uncle_progress',

    // Safe localStorage helpers (prevents crashes in private browsing)
    safeGetItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('localStorage unavailable:', e.message);
            return null;
        }
    },

    safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn('localStorage unavailable:', e.message);
            return false;
        }
    },

    // XP rewards
    XP_REWARDS: {
        flashcardView: 1,
        quizCorrect: 10,
        quizComplete: 25,
        perfectQuiz: 50,
        reviewComplete: 30,
        dailyChallenge: 50,
        streakBonus: 20
    },

    // Level thresholds
    LEVEL_XP: [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000],

    // Achievement definitions - with friendly Aussie uncle vibes
    ACHIEVEMENTS: [
        { id: 'first_flip', name: 'First Flip', desc: 'Checked out your first card, legend!', icon: '🎴', condition: (s) => s.cardsViewed >= 1 },
        { id: 'ten_cards', name: 'Getting Started', desc: 'Seen 10 cards - you\'re on your way!', icon: '📚', condition: (s) => s.cardsViewed >= 10 },
        { id: 'fifty_cards', name: 'Keen Learner', desc: 'Smashed through 50 cards!', icon: '📖', condition: (s) => s.cardsViewed >= 50 },
        { id: 'hundred_cards', name: 'Card Legend', desc: '100 cards! You\'re fair dinkum committed!', icon: '🎓', condition: (s) => s.cardsViewed >= 100 },
        { id: 'first_quiz', name: 'Quiz Rookie', desc: 'Had a crack at your first quiz!', icon: '✅', condition: (s) => s.quizzesCompleted >= 1 },
        { id: 'five_quizzes', name: 'Quiz Regular', desc: '5 quizzes done - good on ya!', icon: '🏅', condition: (s) => s.quizzesCompleted >= 5 },
        { id: 'perfect_score', name: 'Nailed It!', desc: 'Got 100% - absolute ripper!', icon: '💯', condition: (s) => s.perfectQuizzes >= 1 },
        { id: 'three_perfect', name: 'Perfectionist', desc: '3 perfect scores - you beauty!', icon: '🌟', condition: (s) => s.perfectQuizzes >= 3 },
        { id: 'streak_3', name: 'On Fire', desc: '3 days in a row - keep it up!', icon: '🔥', condition: (s) => s.maxStreak >= 3 },
        { id: 'streak_7', name: 'Week Legend', desc: '7 day streak - you\'re unstoppable!', icon: '💪', condition: (s) => s.maxStreak >= 7 },
        { id: 'streak_30', name: 'Monthly Champion', desc: '30 days! Absolute champion!', icon: '👑', condition: (s) => s.maxStreak >= 30 },
        { id: 'level_5', name: 'Rising Star', desc: 'Level 5 - looking good, mate!', icon: '⭐', condition: (s) => s.level >= 5 },
        { id: 'level_10', name: 'Slang Expert', desc: 'Level 10 - you\'re practically Aussie now!', icon: '🏆', condition: (s) => s.level >= 10 },
        { id: 'first_favorite', name: 'Collector', desc: 'Saved your first fave!', icon: '❤️', condition: (s) => s.favorites.length >= 1 },
        { id: 'daily_done', name: 'Daily Legend', desc: 'Smashed a daily challenge!', icon: '📅', condition: (s) => s.dailyChallengesCompleted >= 1 }
    ],

    // Default state
    defaultState: {
        xp: 0,
        level: 1,
        streak: 0,
        maxStreak: 0,
        lastActivity: null,
        cardsViewed: 0,
        quizzesCompleted: 0,
        perfectQuizzes: 0,
        highScore: 0,
        dailyChallengesCompleted: 0,
        lastDailyChallenge: null,
        todaysDailyTerm: null,
        favorites: [],
        unlockedAchievements: [],
        searchHistory: []
    },

    state: null,

    init() {
        this.loadState();
        this.checkStreak();
        this.setupDailyChallenge();
        this.updateUI();
        this.renderAchievements();
        this.renderFavorites();
        this.setupSearch();
    },

    loadState() {
        const saved = this.safeGetItem(this.STORAGE_KEY);
        if (saved) {
            try {
                this.state = { ...this.defaultState, ...JSON.parse(saved) };
            } catch (e) {
                console.warn('Failed to parse saved state:', e.message);
                this.state = { ...this.defaultState };
            }
        } else {
            this.state = { ...this.defaultState };
        }
    },

    saveState() {
        this.safeSetItem(this.STORAGE_KEY, JSON.stringify(this.state));
    },

    // XP and Leveling
    addXP(amount, reason = '') {
        this.state.xp += amount;

        // Check for level up
        const newLevel = this.calculateLevel(this.state.xp);
        if (newLevel > this.state.level) {
            this.state.level = newLevel;
            this.showNotification(`Bloody ripper! You've hit Level ${newLevel}! 🎉`);
            SoundEffects.play('success');
        }

        this.saveState();
        this.updateUI();
        this.checkAchievements();
    },

    calculateLevel(xp) {
        for (let i = this.LEVEL_XP.length - 1; i >= 0; i--) {
            if (xp >= this.LEVEL_XP[i]) {
                return i + 1;
            }
        }
        return 1;
    },

    getXPForNextLevel() {
        const nextLevelIndex = Math.min(this.state.level, this.LEVEL_XP.length - 1);
        return this.LEVEL_XP[nextLevelIndex];
    },

    getXPProgress() {
        const currentLevelXP = this.LEVEL_XP[this.state.level - 1] || 0;
        const nextLevelXP = this.getXPForNextLevel();
        const progress = this.state.xp - currentLevelXP;
        const needed = nextLevelXP - currentLevelXP;
        const percentage = needed > 0 ? (progress / needed) * 100 : 100;
        return { progress, needed, percentage };
    },

    // Streak Management
    checkStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.state.lastActivity;

        if (!lastActivity) {
            // First time user
            this.state.streak = 0;
        } else if (lastActivity === today) {
            // Already logged today
            return;
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastActivity === yesterday.toDateString()) {
                // Consecutive day - increase streak
                this.state.streak++;
                if (this.state.streak > this.state.maxStreak) {
                    this.state.maxStreak = this.state.streak;
                }
                if (this.state.streak > 1) {
                    this.addXP(this.XP_REWARDS.streakBonus, 'streak');
                    this.showNotification(`${this.state.streak} days in a row, legend! +${this.XP_REWARDS.streakBonus} XP 🔥`);
                }
            } else {
                // Streak broken
                if (this.state.streak > 0) {
                    this.showNotification('No worries mate, streaks happen! Start fresh today.');
                }
                this.state.streak = 0;
            }
        }

        this.state.lastActivity = today;
        this.saveState();
    },

    recordActivity() {
        const today = new Date().toDateString();
        if (this.state.lastActivity !== today) {
            this.state.lastActivity = today;
            this.state.streak++;
            if (this.state.streak > this.state.maxStreak) {
                this.state.maxStreak = this.state.streak;
            }
            this.saveState();
            this.updateUI();
        }
    },

    // Daily Challenge
    setupDailyChallenge() {
        const today = new Date().toDateString();

        if (this.state.lastDailyChallenge !== today) {
            // Pick a new random term for today
            const randomIndex = Math.floor(Math.random() * slangData.length);
            this.state.todaysDailyTerm = slangData[randomIndex].id;
            this.state.lastDailyChallenge = today;
            this.saveState();
        }

        this.renderDailyChallenge();
    },

    renderDailyChallenge() {
        const termId = this.state.todaysDailyTerm;
        const term = slangData.find(t => t.id === termId);

        const termEl = document.getElementById('challenge-term');
        if (term && termEl) {
            termEl.textContent = term.term;
        }

        // Only add listener once (check for existing handler)
        const learnBtn = document.getElementById('learn-challenge');
        if (learnBtn && !learnBtn.dataset.listenerAttached) {
            learnBtn.dataset.listenerAttached = 'true';
            learnBtn.addEventListener('click', () => {
                this.completeDailyChallenge();
            });
        }
    },

    completeDailyChallenge() {
        const today = new Date().toDateString();

        // Only reward once per day
        if (!this.state.dailyChallengeCompletedToday) {
            this.state.dailyChallengesCompleted++;
            this.state.dailyChallengeCompletedToday = today;
            this.addXP(this.XP_REWARDS.dailyChallenge, 'daily');
            this.showNotification(`Good on ya! Daily done! +${this.XP_REWARDS.dailyChallenge} XP 📅`);
            this.saveState();
        }

        // Navigate to the term in flashcards
        const termId = this.state.todaysDailyTerm;
        const termIndex = slangData.findIndex(t => t.id === termId);

        if (termIndex !== -1) {
            App.switchMode('flashcards');
            FlashcardMode.currentIndex = termIndex;
            FlashcardMode.filteredCards = [...slangData];
            FlashcardMode.updateCard();
        }
    },

    // Favorites
    toggleFavorite(termId) {
        const index = this.state.favorites.indexOf(termId);

        if (index === -1) {
            this.state.favorites.push(termId);
            this.showNotification('Beauty! Added to your faves! ⭐');
        } else {
            this.state.favorites.splice(index, 1);
            this.showNotification('No worries, removed from faves');
        }

        this.saveState();
        this.renderFavorites();
        this.checkAchievements();
        return index === -1; // Returns true if added
    },

    isFavorite(termId) {
        return this.state.favorites.includes(termId);
    },

    renderFavorites() {
        const list = document.getElementById('favorites-list');
        const count = document.getElementById('favorites-count');

        if (!list) return;
        if (count) count.textContent = this.state.favorites.length;

        if (this.state.favorites.length === 0) {
            list.innerHTML = '<p class="no-favorites">No faves yet, mate! Hit the ☆ on any card to save it here.</p>';
            return;
        }

        list.innerHTML = this.state.favorites.map(termId => {
            const term = slangData.find(t => t.id === termId);
            if (!term) return '';
            return `
                <div class="favorite-item" data-id="${termId}">
                    <span class="fav-term">${term.term}</span>
                    <span class="fav-meaning">${term.meaning}</span>
                    <button class="remove-fav" data-id="${termId}">✕</button>
                </div>
            `;
        }).join('');

        // Add click handlers
        list.querySelectorAll('.favorite-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-fav')) {
                    this.toggleFavorite(e.target.dataset.id);
                } else {
                    // Navigate to this card
                    const termIndex = slangData.findIndex(t => t.id === item.dataset.id);
                    if (termIndex !== -1) {
                        App.switchMode('flashcards');
                        FlashcardMode.currentIndex = termIndex;
                        FlashcardMode.filteredCards = [...slangData];
                        FlashcardMode.updateCard();
                    }
                }
            });
        });
    },

    // Search
    setupSearch() {
        const input = document.getElementById('search-input');
        const clearBtn = document.getElementById('search-clear');

        if (!input || !clearBtn) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            clearBtn.classList.toggle('hidden', !query);

            if (query.length >= 2) {
                this.performSearch(query);
            } else if (query.length === 0) {
                this.clearSearch();
            }
        });

        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.classList.add('hidden');
            this.clearSearch();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                input.value = '';
                clearBtn.classList.add('hidden');
                this.clearSearch();
            }
        });
    },

    performSearch(query) {
        const results = slangData.filter(term =>
            term.term.toLowerCase().includes(query) ||
            term.meaning.toLowerCase().includes(query) ||
            term.example.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            // Switch to flashcards with filtered results
            App.switchMode('flashcards');
            FlashcardMode.filteredCards = results;
            FlashcardMode.currentIndex = 0;
            FlashcardMode.updateCard();

            // Update category dropdown
            document.getElementById('flashcard-category').value = 'all';
        }
    },

    clearSearch() {
        FlashcardMode.filteredCards = [...slangData];
        FlashcardMode.currentIndex = 0;
        FlashcardMode.updateCard();
    },

    // Achievements
    checkAchievements() {
        let newUnlocks = [];

        this.ACHIEVEMENTS.forEach(achievement => {
            if (!this.state.unlockedAchievements.includes(achievement.id)) {
                if (achievement.condition(this.state)) {
                    this.state.unlockedAchievements.push(achievement.id);
                    newUnlocks.push(achievement);
                }
            }
        });

        if (newUnlocks.length > 0) {
            this.saveState();
            newUnlocks.forEach(a => {
                this.showNotification(`Achievement Unlocked: ${a.name} ${a.icon}`);
            });
            this.renderAchievements();
        }
    },

    renderAchievements() {
        const grid = document.getElementById('badges-grid');
        if (!grid) return;

        grid.innerHTML = this.ACHIEVEMENTS.map(achievement => {
            const unlocked = this.state.unlockedAchievements.includes(achievement.id);
            return `
                <div class="badge ${unlocked ? 'unlocked' : 'locked'}">
                    <span class="badge-icon">${unlocked ? achievement.icon : '🔒'}</span>
                    <span class="badge-name">${achievement.name}</span>
                    <span class="badge-desc">${achievement.desc}</span>
                </div>
            `;
        }).join('');
    },

    // Stats tracking
    recordCardView() {
        this.state.cardsViewed++;
        this.addXP(this.XP_REWARDS.flashcardView, 'card');
        this.recordActivity();
        this.checkAchievements();
    },

    recordQuizComplete(score, total) {
        this.state.quizzesCompleted++;
        this.addXP(this.XP_REWARDS.quizComplete, 'quiz');

        if (score === total) {
            this.state.perfectQuizzes++;
            this.addXP(this.XP_REWARDS.perfectQuiz, 'perfect');
        }

        if (score > this.state.highScore) {
            this.state.highScore = score;
        }

        this.recordActivity();
        this.saveState();
        this.checkAchievements();
        this.updateUI();
    },

    recordQuizCorrect() {
        this.addXP(this.XP_REWARDS.quizCorrect, 'correct');
    },

    recordReviewComplete() {
        this.addXP(this.XP_REWARDS.reviewComplete, 'review');
        this.recordActivity();
        this.checkAchievements();
    },

    // UI Updates
    updateUI() {
        // Helper for safe element updates
        const setTextContent = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        setTextContent('streak-count', this.state.streak);
        setTextContent('xp-count', this.state.xp);
        setTextContent('level-count', this.state.level);
        setTextContent('high-score', this.state.highScore);

        // Level progress bar
        const xpProgress = this.getXPProgress();
        const progressBar = document.getElementById('level-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(xpProgress.percentage, 100)}%`;
        }

        setTextContent('xp-current', xpProgress.progress);
        setTextContent('xp-needed', xpProgress.needed);
        setTextContent('next-level', this.state.level + 1);
    },

    // Notifications
    showNotification(message) {
        // Create notification element
        const notif = document.createElement('div');
        notif.className = 'game-notification';
        notif.setAttribute('role', 'alert');
        notif.setAttribute('aria-live', 'polite');
        notif.textContent = message;
        document.body.appendChild(notif);

        // Animate in
        setTimeout(() => notif.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
};
