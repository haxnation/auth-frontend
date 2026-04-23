import { apiCall } from '../api.js';
import { navigate } from '../app.js';

export function renderVerifyEmail() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-black p-6 md:p-12 shadow-[4px_4px_0_0_#5ce1e6] md:shadow-[12px_12px_0_0_#5ce1e6] text-center rounded-none relative">
            <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-12 md:h-16 mx-auto mb-6 object-contain">
            
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight border-b-2 border-black pb-2 mb-6">Verify Email<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></h2>
            <p id="verify-status" class="font-mono text-sm bg-black text-[#5ce1e6] p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]">Verifying your email address...</p>
        </div>
    </div>
    `;
}

export async function handleVerification() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const statusEl = document.getElementById('verify-status');

    if (!token) {
        statusEl.textContent = 'Error: Invalid Token';
        statusEl.className = 'font-mono text-sm bg-[#ff2a2a] text-white p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
        return;
    }

    const res = await apiCall('/verify-email', 'POST', { token });

    if (res.success) {
        statusEl.textContent = 'Email verified successfully. Redirecting to login...';
        statusEl.className = 'font-mono text-sm bg-[#5ce1e6] text-black p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
        setTimeout(() => navigate('/login'), 2000);
    } else {
        statusEl.textContent = `Error: ${res.error || 'Link Expired'}`;
        statusEl.className = 'font-mono text-sm bg-[#ff2a2a] text-white p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
    }
}
