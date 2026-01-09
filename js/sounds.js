// Sound Effects Module using Web Audio API
const SoundEffects = {
    audioContext: null,
    enabled: true,

    init() {
        // Create audio context on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });

        // Load saved preference
        const saved = localStorage.getItem('aussie_slang_sound');
        this.enabled = saved !== 'false';
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('aussie_slang_sound', this.enabled);
        return this.enabled;
    },

    play(type) {
        if (!this.enabled || !this.audioContext) return;

        switch(type) {
            case 'flip':
                this.playTone(800, 0.05, 'sine', 0.3);
                break;
            case 'click':
                this.playTone(600, 0.03, 'sine', 0.2);
                break;
            case 'correct':
                this.playChord([523, 659, 784], 0.15, 0.4); // C major chord
                break;
            case 'incorrect':
                this.playTone(200, 0.2, 'sawtooth', 0.3);
                setTimeout(() => this.playTone(150, 0.2, 'sawtooth', 0.3), 100);
                break;
            case 'success':
                // Victory fanfare
                this.playTone(523, 0.1, 'sine', 0.3); // C
                setTimeout(() => this.playTone(659, 0.1, 'sine', 0.3), 100); // E
                setTimeout(() => this.playTone(784, 0.1, 'sine', 0.3), 200); // G
                setTimeout(() => this.playTone(1047, 0.2, 'sine', 0.4), 300); // High C
                break;
            case 'navigate':
                this.playTone(400, 0.03, 'sine', 0.15);
                break;
            case 'start':
                this.playTone(440, 0.08, 'sine', 0.3);
                setTimeout(() => this.playTone(554, 0.08, 'sine', 0.3), 80);
                break;
            case 'rating':
                this.playTone(650, 0.05, 'triangle', 0.25);
                break;
        }
    },

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },

    playChord(frequencies, duration, volume = 0.3) {
        frequencies.forEach(freq => {
            this.playTone(freq, duration, 'sine', volume / frequencies.length);
        });
    }
};

// Initialize on load
SoundEffects.init();
