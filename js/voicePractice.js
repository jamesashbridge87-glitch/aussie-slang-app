// Voice Practice Module - Sentence-Based Pronunciation Practice with Multi-Score Feedback
const VoicePractice = {
    recognition: null,
    isListening: false,
    targetSentence: '',
    targetTerm: '',
    startTime: null,

    // Phonetic alternatives map - how speech recognition might mishear Aussie slang
    // Maps slang term to array of likely misheard alternatives
    phoneticAlternatives: {
        // -o endings (very common in Aussie slang)
        "arvo": ["are voh", "are vo", "arvoh", "arv oh", "rv oh", "ah vo"],
        "servo": ["serve oh", "serv oh", "sur vo", "survey oh"],
        "bottle-o": ["bottle oh", "bottleo", "bottle o", "bottle of"],
        "smoko": ["smoke oh", "smoke o", "smoker"],
        "ambo": ["am bo", "amble", "amboh"],
        "garbo": ["gar bo", "garbage oh", "garb oh"],
        "postie": ["post e", "posty", "post ee"],
        "tradie": ["trade e", "tradey", "trade ee", "treaty"],
        "sparky": ["spark e", "sparkey"],
        "chippy": ["chip e", "chippie", "chipey"],
        "brickie": ["brick e", "brickey", "bricky"],
        "truckie": ["truck e", "truckey", "trucky"],
        "cabbie": ["cab e", "cabby", "cab ee"],
        "firey": ["fire e", "fiery", "fire ee"],
        "bushie": ["bush e", "bushy", "bush ee"],
        "muso": ["muse oh", "music oh", "mew so"],

        // -ie/-y endings
        "barbie": ["barby", "barb e", "bobby"],
        "brekkie": ["breaky", "break e", "breakfast"],
        "bikkie": ["bicky", "bik e", "big e"],
        "choccy": ["chocky", "chocolate", "chalky"],
        "prezzie": ["pressy", "prezzy", "present"],
        "chrissie": ["chrissy", "chris e", "christmas"],
        "rello": ["rel oh", "relative"],
        "sickie": ["sicky", "sick e"],
        "coldie": ["cold e", "coldy", "cold one"],
        "tinnie": ["tinny", "tin e", "tiny"],
        "stubby": ["stub e", "stuby"],
        "sunnies": ["sun ease", "sunny's", "sun knees"],
        "trackies": ["tracky's", "track ease"],
        "cossie": ["cozy", "cos e", "causie"],
        "mozzie": ["mozzy", "moz e", "mossy"],

        // Common slang
        "g'day": ["good day", "gday", "g day", "today", "hey"],
        "gday": ["good day", "g day", "today", "hey"],
        "mate": ["may", "might", "meet"],
        "no worries": ["no worries", "don't worry", "no worry"],
        "no wuckas": ["no workers", "no walk us", "no wakers", "no what cause"],
        "no dramas": ["no drama", "no drummas"],
        "yeah nah": ["yeah no", "yeah na", "yana"],
        "nah yeah": ["no yeah", "na yeah", "naya"],
        "reckon": ["recken", "wreckin", "recon"],
        "heaps": ["heeps", "hips", "helps"],
        "chook": ["chuk", "chuck", "shook"],
        "snag": ["snack", "snake"],
        "sanga": ["sang a", "sanger", "sang ah", "sandwich"],
        "cuppa": ["cup a", "cupper", "cup of"],
        "esky": ["es key", "es ke", "husky"],
        "ute": ["you", "oot", "youth", "yute"],
        "dunny": ["donny", "done e", "dun e"],
        "loo": ["lou", "lew", "lieu"],
        "thongs": ["tongs", "thong", "songs"],
        "daks": ["dax", "docs", "ducks", "tax"],
        "bogan": ["bow gun", "bogon", "bogen"],
        "drongo": ["drone go", "drang go"],
        "dag": ["dog", "dug", "tag"],
        "yobbo": ["yo bo", "yobo"],
        "hoon": ["hune", "hewn", "who in"],
        "sook": ["suk", "sue k", "souk"],
        "bludger": ["bludge er", "blood ger", "blunder"],
        "larrikin": ["lara kin", "larkin", "larry kin"],
        "stickybeak": ["sticky beak", "sticky big"],
        "ratbag": ["rat bag"],
        "bloke": ["block", "broke"],
        "sheila": ["she la", "shela"],
        "legend": ["ledge end"],
        "ripper": ["rip a", "reaper"],
        "bonzer": ["bonser", "bons a"],
        "strewth": ["s truth", "true th"],
        "crikey": ["cry key", "cry ke"],

        // Actions and phrases
        "chuck a u-ey": ["chuck a u e", "chuck a uy", "chuck a you we", "chuck a uey"],
        "chuck a sickie": ["chuck a sicky", "chuck a sick e"],
        "chuck a wobbly": ["chuck a wobbley", "chuck a wobblie"],
        "skull": ["school", "scull"],
        "yarn": ["yawn", "yearn"],
        "squiz": ["squeeze", "quiz", "squid"],
        "walkabout": ["walk about"],
        "whinge": ["winge", "whinch", "winch"],
        "piss": ["piece", "peace"],
        "arcing up": ["arking up", "arc in up"],
        "rack off": ["rack of", "wrack off"],
        "yakka": ["yak a", "yakker", "yacker"],
        "footy": ["foot e", "foodie", "foody"],
        "shout": ["shaut", "shot"],

        // Food and drink
        "parmi": ["parmy", "par me", "army"],
        "schnitty": ["schnitzy", "schnity", "snitty"],
        "spag bol": ["spag bowl", "spag ball", "spaghetti bolognese"],
        "goon": ["gune", "gun", "gone"],
        "grog": ["grock", "grawg"],
        "plonk": ["plunk", "plonc"],
        "bevvies": ["bevies", "bev ease", "bevys"],
        "tucker": ["tuck a", "tuker"],
        "avo": ["av oh", "avoh", "have oh"],
        "lollies": ["lolly's", "lol ease"],
        "icy pole": ["icy poll", "ice e pole"],

        // Places
        "maccas": ["mac as", "makers", "marcus"],
        "woolies": ["woolly's", "wool ease", "will ease"],
        "bunnings": ["bun ings", "bunning's", "bonnings"],
        "tassie": ["tassy", "tas e", "tasty"],
        "brissy": ["brisy", "bris e", "busy"],
        "goldie": ["gold e", "goldy"],
        "woop woop": ["woop woop", "whoop whoop", "woo woo"],
        "outback": ["out back"],
        "billabong": ["bill a bong", "billy bong"],

        // States and expressions
        "knackered": ["nackered", "knack ered"],
        "stuffed": ["stuft"],
        "wrecked": ["rekt", "wreckt"],
        "pissed": ["pieced", "peaced"],
        "buggered": ["buggerd", "bugered"],
        "dodgy": ["dodge e", "dodgey"],
        "suss": ["sus", "sauce"],
        "bodgy": ["bodgey", "bodge e"],
        "wonky": ["wonkey", "wanky"],
        "daggy": ["daggey", "dag e"],
        "aggro": ["ag ro", "agro"],
        "devo": ["dev oh", "devoh"],
        "stoked": ["stoke d", "stoaked"],
        "chockers": ["chock ers", "chocolates"],
        "slammed": ["slam d"],
        "spewin": ["spewing", "spew in"],

        // Money
        "bucks": ["bux", "box"],
        "pineapple": ["pine apple"],
        "lobster": ["lob star"],

        // Animals
        "roo": ["rue", "roux", "ru"],
        "cocky": ["cock e", "cockie"],
        "croc": ["crock", "krock"],
        "drop bear": ["drop bare", "dropbear"]
    },

    // Check if speech recognition is supported
    isSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    init() {
        if (!this.isSupported()) {
            console.log('Speech recognition not supported in this browser');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        // Configure for sentence recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-AU';
        this.recognition.maxAlternatives = 5;

        this.setupEventListeners();
        this.setupRecognitionHandlers();
    },

    setupEventListeners() {
        const practiceBtn = document.getElementById('practice-speaking');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => this.toggleListening());
        }

        // Voice feedback action buttons
        const tryAgainBtn = document.getElementById('voice-try-again');
        if (tryAgainBtn) {
            tryAgainBtn.addEventListener('click', () => {
                this.resetFeedback();
                this.startListening();
            });
        }

        const nextCardBtn = document.getElementById('voice-next-card');
        if (nextCardBtn) {
            nextCardBtn.addEventListener('click', () => {
                this.resetFeedback();
                // Trigger next card in flashcard mode
                if (typeof FlashcardMode !== 'undefined' && FlashcardMode.nextCard) {
                    FlashcardMode.nextCard();
                }
            });
        }
    },

    setupRecognitionHandlers() {
        if (!this.recognition) return;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.startTime = Date.now();
            this.updateUI('listening');
            this.showSoundWave(true);
            SoundEffects.play('click');
        };

        this.recognition.onresult = (event) => {
            const results = event.results[0];
            const transcript = results[0].transcript;
            const isFinal = results.isFinal;

            if (isFinal) {
                this.showSoundWave(false);
                const speakingTime = (Date.now() - this.startTime) / 1000;
                this.evaluatePronunciation(transcript, results, speakingTime);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
            this.showSoundWave(false);

            let message = 'Error occurred. Please try again.';
            if (event.error === 'no-speech') {
                message = "Didn't hear anything. Try again!";
            } else if (event.error === 'audio-capture') {
                message = 'No microphone found. Check your settings.';
            } else if (event.error === 'not-allowed') {
                message = 'Microphone access denied. Please allow access.';
            }

            this.showError(message);
            this.updateUI('idle');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.showSoundWave(false);
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
        // Get current card data
        const card = this.getCurrentCard();
        if (!card) {
            Gamification.showNotification('No sentence to practice!');
            return;
        }

        this.targetSentence = card.example;
        this.targetTerm = card.term;

        // Show the target sentence
        this.showTargetSentence();

        try {
            this.recognition.start();
        } catch (e) {
            console.error('Failed to start recognition:', e);
            // If already running, stop and retry with longer delay
            try {
                this.recognition.stop();
            } catch (stopError) {
                // Ignore stop errors
            }
            setTimeout(() => {
                try {
                    if (!this.isListening) {
                        this.recognition.start();
                    }
                } catch (retryError) {
                    console.error('Retry failed:', retryError);
                    this.showError('Speech recognition busy. Please try again.');
                }
            }, 300);
        }
    },

    getCurrentCard() {
        // Try flashcard mode first
        if (typeof FlashcardMode !== 'undefined' && FlashcardMode.filteredCards) {
            return FlashcardMode.filteredCards[FlashcardMode.currentIndex];
        }
        // Try SRS review mode
        if (typeof SRSMode !== 'undefined' && SRSMode.currentCard) {
            return SRSMode.currentCard;
        }
        return null;
    },

    showTargetSentence() {
        const targetEl = document.getElementById('voice-target-sentence');
        if (targetEl) {
            // Highlight the slang term in the sentence
            const highlighted = this.targetSentence.replace(
                new RegExp(`(${this.escapeRegex(this.targetTerm)})`, 'gi'),
                '<strong class="slang-highlight">$1</strong>'
            );
            targetEl.innerHTML = `Say: "${highlighted}"`;
        }
    },

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

    evaluatePronunciation(transcript, results, speakingTime) {
        // Collect all alternatives with confidence scores
        const alternatives = [];
        for (let i = 0; i < results.length; i++) {
            alternatives.push({
                text: results[i].transcript,
                confidence: results[i].confidence
            });
        }

        // Calculate multi-dimensional scores
        const scores = this.calculateScores(transcript, alternatives, speakingTime);

        // Display the scores
        this.showScoreFeedback(scores);

        // Award XP based on overall score
        if (scores.overall >= 70) {
            Gamification.addXP(3, 'speaking');
        } else if (scores.overall >= 50) {
            Gamification.addXP(1, 'speaking');
        }
    },

    calculateScores(transcript, alternatives, speakingTime) {
        const normalizedTarget = this.normalizeString(this.targetSentence);
        const normalizedSpoken = this.normalizeString(transcript);
        const bestConfidence = alternatives[0]?.confidence || 0;

        // 1. Word Accuracy Score (with phonetic matching)
        const wordAccuracy = this.calculateWordAccuracy(normalizedTarget, normalizedSpoken);

        // 2. Recognition Confidence Score
        const confidence = Math.round(bestConfidence * 100);

        // 3. Slang Recognition Score - Did it understand the Aussie term?
        const slangRecognition = this.calculateSlangRecognition(transcript, alternatives);

        // 4. Fluency Score - Based on speaking pace and completeness
        const fluency = this.calculateFluency(normalizedTarget, normalizedSpoken, speakingTime);

        // 5. Overall Score - Weighted combination
        const overall = Math.round(
            (wordAccuracy * 0.35) +
            (confidence * 0.20) +
            (slangRecognition * 0.30) +
            (fluency * 0.15)
        );

        return {
            wordAccuracy,
            confidence,
            slangRecognition,
            fluency,
            overall,
            transcript: transcript
        };
    },

    calculateWordAccuracy(target, spoken) {
        const targetWords = target.split(/\s+/).filter(w => w.length > 0);
        const spokenWords = spoken.split(/\s+/).filter(w => w.length > 0);

        if (targetWords.length === 0) return 0;

        let matchedWords = 0;
        const usedIndices = new Set();

        for (const targetWord of targetWords) {
            let bestMatch = 0;
            let bestIndex = -1;

            for (let i = 0; i < spokenWords.length; i++) {
                if (usedIndices.has(i)) continue;

                // Check direct similarity
                let similarity = this.wordSimilarity(targetWord, spokenWords[i]);

                // Check phonetic alternatives for this word
                const phoneticScore = this.checkPhoneticMatch(targetWord, spokenWords, i);
                similarity = Math.max(similarity, phoneticScore);

                if (similarity > bestMatch) {
                    bestMatch = similarity;
                    bestIndex = i;
                }
            }

            if (bestMatch >= 0.8 && bestIndex !== -1) {
                matchedWords += bestMatch;
                usedIndices.add(bestIndex);
            } else if (bestMatch >= 0.6 && bestIndex !== -1) {
                matchedWords += bestMatch * 0.7;
                usedIndices.add(bestIndex);
            }
        }

        return Math.round((matchedWords / targetWords.length) * 100);
    },

    // Check if spoken words match any phonetic alternatives
    checkPhoneticMatch(targetWord, spokenWords, startIndex) {
        const lowerTarget = targetWord.toLowerCase();

        // Check if this word has phonetic alternatives
        const alternatives = this.phoneticAlternatives[lowerTarget];
        if (!alternatives) return 0;

        let bestScore = 0;

        for (const alt of alternatives) {
            const altWords = alt.toLowerCase().split(/\s+/);

            // Single word alternative
            if (altWords.length === 1) {
                const similarity = this.wordSimilarity(altWords[0], spokenWords[startIndex]);
                bestScore = Math.max(bestScore, similarity);
            }
            // Multi-word alternative (e.g., "are voh" for "arvo")
            else if (startIndex + altWords.length <= spokenWords.length) {
                let allMatch = true;
                let totalSimilarity = 0;

                for (let j = 0; j < altWords.length; j++) {
                    const sim = this.wordSimilarity(altWords[j], spokenWords[startIndex + j]);
                    if (sim < 0.7) {
                        allMatch = false;
                        break;
                    }
                    totalSimilarity += sim;
                }

                if (allMatch) {
                    const avgSimilarity = totalSimilarity / altWords.length;
                    // Give a high score for matching phonetic alternatives
                    bestScore = Math.max(bestScore, avgSimilarity * 0.95);
                }
            }
        }

        return bestScore;
    },

    wordSimilarity(word1, word2) {
        if (word1 === word2) return 1;

        const len1 = word1.length;
        const len2 = word2.length;

        if (len1 === 0 || len2 === 0) return 0;

        // Quick check for very short words
        if (len1 <= 2 || len2 <= 2) {
            return word1 === word2 ? 1 : 0;
        }

        // Levenshtein distance
        const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        const distance = matrix[len1][len2];
        return 1 - (distance / Math.max(len1, len2));
    },

    calculateSlangRecognition(transcript, alternatives) {
        const normalizedTerm = this.normalizeString(this.targetTerm);
        const termLower = this.targetTerm.toLowerCase();

        // Check all alternatives from speech recognition
        for (const alt of alternatives) {
            const normalizedAlt = this.normalizeString(alt.text);

            // Exact match of slang term
            if (normalizedAlt.includes(normalizedTerm)) {
                return 100;
            }
        }

        // Check if any phonetic alternative was recognized
        const phoneticAlts = this.phoneticAlternatives[termLower] || [];
        for (const alt of alternatives) {
            const normalizedAlt = this.normalizeString(alt.text);

            for (const phoneticAlt of phoneticAlts) {
                const normalizedPhonetic = this.normalizeString(phoneticAlt);
                if (normalizedAlt.includes(normalizedPhonetic)) {
                    return 95; // High score for phonetic match
                }
            }
        }

        // Check for partial phonetic matches
        const normalizedTranscript = this.normalizeString(transcript);
        const transcriptWords = normalizedTranscript.split(/\s+/);
        const termWords = normalizedTerm.split(/\s+/);

        // Direct word matching
        let bestDirectMatch = 0;
        for (const spokenWord of transcriptWords) {
            for (const termWord of termWords) {
                const similarity = this.wordSimilarity(termWord, spokenWord);
                bestDirectMatch = Math.max(bestDirectMatch, similarity);
            }
        }

        // Phonetic alternative matching
        let bestPhoneticMatch = 0;
        for (const phoneticAlt of phoneticAlts) {
            const phoneticWords = this.normalizeString(phoneticAlt).split(/\s+/);

            for (const phoneticWord of phoneticWords) {
                for (const spokenWord of transcriptWords) {
                    const similarity = this.wordSimilarity(phoneticWord, spokenWord);
                    bestPhoneticMatch = Math.max(bestPhoneticMatch, similarity);
                }
            }
        }

        const bestMatch = Math.max(bestDirectMatch, bestPhoneticMatch);

        // Score based on best match
        if (bestMatch >= 0.9) return 90;
        if (bestMatch >= 0.8) return 80;
        if (bestMatch >= 0.7) return 70;
        if (bestMatch >= 0.6) return 55;
        if (bestMatch >= 0.5) return 40;

        return 25; // Base score for attempting
    },

    calculateFluency(target, spoken, speakingTime) {
        const targetWords = target.split(/\s+/).length;
        const spokenWords = spoken.split(/\s+/).length;

        // Expected speaking rate: ~2.5 words per second for natural speech
        const expectedTime = targetWords / 2.5;
        const timeDiff = Math.abs(speakingTime - expectedTime);

        // Penalize if too fast or too slow
        let paceScore = 100;
        if (timeDiff > expectedTime * 0.5) {
            paceScore = Math.max(50, 100 - (timeDiff / expectedTime) * 30);
        }

        // Completeness - did they say roughly the right number of words?
        const wordRatio = spokenWords / targetWords;
        let completenessScore = 100;
        if (wordRatio < 0.7) {
            completenessScore = wordRatio * 100;
        } else if (wordRatio > 1.5) {
            completenessScore = Math.max(60, 100 - (wordRatio - 1) * 40);
        }

        return Math.round((paceScore * 0.4) + (completenessScore * 0.6));
    },

    normalizeString(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/['']/g, "'")
            .replace(/[^a-z0-9\s']/g, '')
            .replace(/\s+/g, ' ');
    },

    showScoreFeedback(scores) {
        const container = document.getElementById('voice-practice-feedback');
        if (container) {
            container.classList.remove('hidden');
        }

        // Update individual scores
        this.updateScoreDisplay('word-accuracy', scores.wordAccuracy);
        this.updateScoreDisplay('confidence', scores.confidence);
        this.updateScoreDisplay('slang-recognition', scores.slangRecognition);
        this.updateScoreDisplay('fluency', scores.fluency);

        // Update overall score with appropriate styling and message
        const overallEl = document.getElementById('overall-score');
        const messageEl = document.getElementById('voice-message');

        if (overallEl) {
            overallEl.textContent = `${scores.overall}%`;
            overallEl.className = 'overall-score ' + this.getScoreClass(scores.overall);
        }

        if (messageEl) {
            const feedback = this.getFeedbackMessage(scores);
            messageEl.textContent = feedback.message;
            messageEl.className = 'voice-message ' + feedback.class;

            // Play appropriate sound
            if (scores.overall >= 80) {
                SoundEffects.play('correct');
            } else if (scores.overall >= 50) {
                SoundEffects.play('click');
            } else {
                SoundEffects.play('incorrect');
            }
        }
    },

    updateScoreDisplay(id, score) {
        const el = document.getElementById(`score-${id}`);
        const barEl = document.getElementById(`bar-${id}`);

        if (el) {
            el.textContent = `${score}%`;
        }
        if (barEl) {
            barEl.style.width = `${score}%`;
            barEl.className = 'score-bar-fill ' + this.getScoreClass(score);
        }
    },

    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 50) return 'fair';
        return 'needs-work';
    },

    getFeedbackMessage(scores) {
        const overall = scores.overall;

        if (overall >= 90) {
            return { message: "Ripper! You're sounding like a true blue Aussie, mate!", class: 'excellent' };
        }
        if (overall >= 80) {
            return { message: "Bloody beautiful! You've nearly got it down pat!", class: 'good' };
        }
        if (overall >= 70) {
            return { message: "Good on ya! Keep at it and you'll nail it!", class: 'good' };
        }
        if (overall >= 60) {
            return { message: "No worries, you're getting there! Give the slang a bit more oomph.", class: 'fair' };
        }
        if (overall >= 50) {
            return { message: "Not bad at all! Have another crack after listening to the audio.", class: 'fair' };
        }
        if (scores.slangRecognition < 50) {
            return { message: "The slang didn't quite come through - give it more emphasis, mate!", class: 'needs-work' };
        }
        return { message: "No dramas! Have another go - you've got this!", class: 'needs-work' };
    },

    showError(message) {
        const container = document.getElementById('voice-practice-feedback');
        const messageEl = document.getElementById('voice-message');

        if (container) {
            container.classList.remove('hidden');
        }
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = 'voice-message error';
        }
    },

    updateUI(state) {
        const btn = document.getElementById('practice-speaking');
        const indicator = document.getElementById('recording-indicator');
        const targetEl = document.getElementById('voice-target-sentence');

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

        if (targetEl && state !== 'listening') {
            targetEl.innerHTML = '';
        }
    },

    resetFeedback() {
        const container = document.getElementById('voice-practice-feedback');
        const transcriptEl = document.getElementById('voice-transcript');
        const targetEl = document.getElementById('voice-target-sentence');

        if (container) container.classList.add('hidden');
        if (transcriptEl) transcriptEl.textContent = '';
        if (targetEl) targetEl.innerHTML = '';

        // Reset all score displays
        ['word-accuracy', 'confidence', 'slang-recognition', 'fluency'].forEach(id => {
            const el = document.getElementById(`score-${id}`);
            const barEl = document.getElementById(`bar-${id}`);
            if (el) el.textContent = '0%';
            if (barEl) {
                barEl.style.width = '0%';
                barEl.className = 'score-bar-fill';
            }
        });

        const overallEl = document.getElementById('overall-score');
        const messageEl = document.getElementById('voice-message');
        if (overallEl) overallEl.textContent = '';
        if (messageEl) messageEl.textContent = '';

        this.stopListening();
    },

    showSoundWave(show) {
        const container = document.getElementById('sound-wave-container');
        if (container) {
            container.classList.toggle('hidden', !show);
        }
    }
};
