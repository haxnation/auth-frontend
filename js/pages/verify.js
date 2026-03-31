import { apiCall } from '../api.js';
import { navigate } from '../app.js';

export function renderVerifyEmail() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#5ce1e6] text-center rounded-none relative">
            <div class="w-16 h-16 bg-black text-[#5ce1e6] border-2 border-black flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-satellite-dish text-2xl animate-pulse"></i>
            </div>
            <h2 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-black pb-2 mb-4">Validate_Protocol<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></h2>
            <p id="verify-status" class="font-mono text-sm bg-black text-[#5ce1e6] p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]">EXECUTING_HANDSHAKE...</p>
        </div>
    </div>
    `;
}

export async function handleVerification() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const statusEl = document.getElementById('verify-status');

    if (!token) {
        statusEl.textContent = 'ERR: INVALID_TOKEN';
        statusEl.className = 'font-mono text-sm bg-[#ff2a2a] text-white p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
        return;
    }

    const res = await apiCall('/verify-email', 'POST', { token });

    if (res.success) {
        statusEl.textContent = 'VALIDATION_SUCCESS. REDIRECTING...';
        statusEl.className = 'font-mono text-sm bg-[#5ce1e6] text-black p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
        setTimeout(() => navigate('/login'), 2000);
    } else {
        statusEl.textContent = `ERR: ${res.error || 'EXP_TOKEN'}`;
        statusEl.className = 'font-mono text-sm bg-[#ff2a2a] text-white p-4 border-2 border-black uppercase font-bold shadow-[4px_4px_0_0_#000]';
    }
}