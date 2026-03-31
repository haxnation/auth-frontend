import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderForgotPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white border-4 border-[#0b0b0b] shadow-[12px_12px_0_0_#0b0b0b] p-8 rounded-none relative">
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#ff2a2a]">
                RECOVERY_MODULE
            </div>
            <h2 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-black pb-2 mb-4 mt-4">Reset_Key<span class="inline-block w-3 h-[1em] bg-[#ff2a2a] animate-pulse align-middle ml-1"></span></h2>
            <p class="font-mono text-xs text-gray-500 mb-8 uppercase">Dispatch recovery protocol</p>
            
            <form id="forgot-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-1 text-black">> TARGET_ID [EMAIL]</label>
                    <input type="email" name="email" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">EXECUTE_DISPATCH</button>
            </form>
            <p class="mt-8 border-t-2 border-black pt-6 text-left text-sm text-gray-600">
                <a href="/login" class="nav-link font-mono font-bold text-black hover:bg-black hover:text-[#5ce1e6] uppercase transition-colors duration-0">>> ABORT</a>
            </p>
        </div>
    </div>
    `;
}

export function attachForgotEvents() {
    document.getElementById('forgot-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const res = await apiCall('/forgot-password', 'POST', { email });
        Modal.alert('DISPATCHED', res.message || 'If an account exists, a reset link has been sent.');
        navigate('/login');
    });
}

export function renderResetPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white border-4 border-[#0b0b0b] shadow-[12px_12px_0_0_#0b0b0b] p-8 rounded-none relative">
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#ff2a2a]">
                KEY_REWRITE
            </div>
            <h2 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-black pb-2 mb-4 mt-4">Overwite_Key<span class="inline-block w-3 h-[1em] bg-[#ff2a2a] animate-pulse align-middle ml-1"></span></h2>
            
            <form id="reset-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-1 text-black">> NEW_SECURE_KEY</label>
                    <input type="password" name="password" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">COMMIT_OVERWRITE</button>
            </form>
        </div>
    </div>
    `;
}

export function attachResetEvents() {
    document.getElementById('reset-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const password = e.target.password.value;

        if (!token) return Modal.alert('FATAL', 'Invalid or missing reset token.', 'error');

        const res = await apiCall('/reset-password', 'POST', { token, password });
        if (res.success) {
            await Modal.alert('SUCCESS', 'Key overwritten successfully.');
            navigate('/login');
        } else {
            Modal.alert('ERROR', res.error, 'error');
        }
    });
}