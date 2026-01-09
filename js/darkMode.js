// Dark Mode Toggle
const DarkMode = {
    STORAGE_KEY: 'aussie_slang_darkmode',
    enabled: false,

    init() {
        this.loadPreference();
        this.setupEventListener();
        this.applyTheme();
    },

    loadPreference() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved !== null) {
            this.enabled = saved === 'true';
        } else {
            // Check system preference
            this.enabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    },

    setupEventListener() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem(this.STORAGE_KEY) === null) {
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
        localStorage.setItem(this.STORAGE_KEY, this.enabled.toString());
    },

    applyTheme() {
        document.body.classList.toggle('dark-mode', this.enabled);

        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.classList.toggle('active', this.enabled);
            const icon = toggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = this.enabled ? '☀️' : '🌙';
            }
        }
    }
};
