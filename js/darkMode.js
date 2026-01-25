// Dark Mode Toggle
const DarkMode = {
    STORAGE_KEY: 'aussie_slang_darkmode',
    enabled: true, // Default to dark mode (matches brand colors)

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

    init() {
        this.loadPreference();
        this.setupEventListener();
        this.applyTheme();
    },

    loadPreference() {
        const saved = this.safeGetItem(this.STORAGE_KEY);
        if (saved !== null) {
            this.enabled = saved === 'true';
        } else {
            // Default to dark mode, or check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            // Only switch to light if explicitly preferred, otherwise stay dark
            this.enabled = prefersLight ? false : true;
        }
    },

    setupEventListener() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.safeGetItem(this.STORAGE_KEY) === null) {
                this.enabled = e.matches;
                this.applyTheme();
            }
        });
    },

    toggle() {
        this.enabled = !this.enabled;
        this.savePreference();
        this.applyTheme();
        SoundEffects.play('click');
    },

    savePreference() {
        this.safeSetItem(this.STORAGE_KEY, this.enabled.toString());
    },

    applyTheme() {
        // CSS uses body.light-mode for light theme, dark is default
        document.body.classList.toggle('light-mode', !this.enabled);

        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.classList.toggle('active', this.enabled);
            const icon = toggle.querySelector('.theme-icon');
            if (icon) {
                // Show sun when dark (to switch to light), moon when light (to switch to dark)
                icon.textContent = this.enabled ? '☀️' : '🌙';
            }
        }
    }
};
