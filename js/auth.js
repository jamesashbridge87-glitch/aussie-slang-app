// Simple Password Protection
const Auth = {
    // Change this hash to set your password
    // To generate a new hash, run in browser console: Auth.generateHash('your-password')
    PASSWORD_HASH: 'b989b1829d070ffbbb1c5baef05728cee71bc06a8fbb0be07ec0da4e73df9466', // Password: "aussie101"

    STORAGE_KEY: 'aussie_slang_auth',
    SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds

    init() {
        if (this.isAuthenticated()) {
            this.showApp();
        } else {
            this.showLoginScreen();
        }
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('auth-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('auth-password')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.logout();
        });
    },

    async handleLogin() {
        const passwordInput = document.getElementById('auth-password');
        const password = passwordInput.value;
        const errorEl = document.getElementById('auth-error');

        if (!password) {
            errorEl.textContent = 'Please enter the access code';
            errorEl.classList.remove('hidden');
            return;
        }

        const hash = await this.hashPassword(password);

        if (hash === this.PASSWORD_HASH) {
            this.saveSession();
            this.showApp();
            errorEl.classList.add('hidden');
        } else {
            errorEl.textContent = 'Invalid access code. Please try again.';
            errorEl.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
        }
    },

    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // Helper function to generate hash for a new password
    async generateHash(password) {
        const hash = await this.hashPassword(password);
        console.log(`Password hash for "${password}":`);
        console.log(hash);
        console.log('Copy this hash and replace PASSWORD_HASH in auth.js');
        return hash;
    },

    saveSession() {
        const session = {
            authenticated: true,
            expires: Date.now() + this.SESSION_DURATION
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    },

    isAuthenticated() {
        const sessionData = localStorage.getItem(this.STORAGE_KEY);
        if (!sessionData) return false;

        try {
            const session = JSON.parse(sessionData);
            if (session.authenticated && session.expires > Date.now()) {
                return true;
            }
        } catch (e) {
            // Invalid session data
        }

        // Clear expired/invalid session
        localStorage.removeItem(this.STORAGE_KEY);
        return false;
    },

    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.showLoginScreen();
    },

    showLoginScreen() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('app-container').classList.add('hidden');
        document.getElementById('auth-password')?.focus();
    },

    showApp() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
    }
};

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
