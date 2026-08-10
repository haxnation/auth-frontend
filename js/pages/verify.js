import { apiCall } from '../api.js';
import { navigate } from '../app.js';

export function renderVerifyEmail() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-ink p-6 md:p-12 shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] text-center rounded-none relative">
            <img src="https://haxnation.org/images/logo.png" alt="Haxnation Logo" class="h-12 md:h-16 mx-auto mb-6 object-contain">
            
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight border-b-2 border-ink pb-2 mb-6">Verify Email<span class="inline-block w-3 h-[1em] bg-cyan animate-pulse align-middle ml-1"></span></h2>
            <p id="verify-status" class="font-mono text-sm bg-ink text-cyan p-4 border-2 border-ink uppercase font-bold shadow-[4px_4px_0_0_#0b0b0b]">Verifying your email address...</p>
        </div>
    </div>
    `;
}

export async function handleVerification() {
    const hashSplit = window.location.hash.split('?');
    const queryString = hashSplit.length > 1 ? '?' + hashSplit[1] : window.location.search;
    const params = new URLSearchParams(queryString);
    const token = params.get('token');
    const statusEl = document.getElementById('verify-status');

    if (!token) {
        statusEl.textContent = 'Error: Invalid Token';
        statusEl.className = 'font-mono text-sm bg-danger text-white p-4 border-2 border-ink uppercase font-bold shadow-[4px_4px_0_0_#0b0b0b]';
        return;
    }

    const res = await apiCall('/verify-email', 'POST', { token });

    if (res.success) {
        statusEl.textContent = 'Email verified successfully. Redirecting to login...';
        statusEl.className = 'font-mono text-sm bg-cyan text-ink p-4 border-2 border-ink uppercase font-bold shadow-[4px_4px_0_0_#0b0b0b]';
        setTimeout(() => navigate('/login'), 2000);
    } else {
        statusEl.textContent = `Error: ${res.error || 'Link Expired'}`;
        statusEl.className = 'font-mono text-sm bg-danger text-white p-4 border-2 border-ink uppercase font-bold shadow-[4px_4px_0_0_#0b0b0b]';
    }
}
