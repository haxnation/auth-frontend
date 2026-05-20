import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderForgotPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl card relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-ink bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b]">
                ACCOUNT RECOVERY
            </div>
            
            <div class="text-left mb-8 mt-4 border-b-2 border-ink pb-4">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-10 md:h-12 mb-6 object-contain">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Forgot Password</h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Enter your email to receive a reset link</p>
            </div>
            
            <form id="forgot-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-2 text-ink" for="forgot-email">Email Address</label>
                    <input type="email" id="forgot-email" name="email" class="input w-full" required>
                </div>
                <button type="submit" class="w-full btn-danger mt-4">
                    Send Reset Link
                </button>
            </form>
            
            <div class="mt-8 border-t-2 border-ink pt-6 text-left">
                <a href="/login" class="nav-link font-mono text-xs font-bold text-ink hover:bg-ink hover:text-cyan uppercase transition-colors duration-0 p-1 inline-block">
                    << Back to Login
                </a>
            </div>
        </div>
    </div>
    `;
}

export function attachForgotEvents() {
    document.getElementById('forgot-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'SENDING...';
        btn.disabled = true;

        const res = await apiCall('/forgot-password', 'POST', { email });
        
        btn.innerText = originalText;
        btn.disabled = false;
        
        Modal.alert('Email Sent', res.message || 'If an account exists, a reset link has been sent to your email.');
        navigate('/login');
    });
}

export function renderResetPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl card relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-ink bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b]">
                RESET PASSWORD
            </div>
            
            <div class="text-left mb-8 mt-4 border-b-2 border-ink pb-4">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-10 md:h-12 mb-6 object-contain">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Create New Password</h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Enter your new secure password below</p>
            </div>
            
            <form id="reset-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-2 text-ink" for="reset-password">New Password</label>
                    <div class="relative">
                        <input type="password" id="reset-password" name="password" class="input w-full pr-10" required>
                        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink hover:text-cyan focus:outline-none" aria-label="Toggle password visibility" onclick="const p=document.getElementById('reset-password'); p.type=p.type==='password'?'text':'password'; this.innerHTML=p.type==='password'?'<i class=\\'fas fa-eye\\'></i>':'<i class=\\'fas fa-eye-slash\\'></i>';">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <p class="font-mono text-[10px] text-gray-500 mt-2 uppercase border-l-2 border-danger pl-2">Requirements: At least 8 characters, an uppercase letter, a number, and a symbol.</p>
                </div>
                <button type="submit" class="w-full btn-danger mt-4">
                    Update Password
                </button>
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

        if (!token) return Modal.alert('Error', 'Invalid or missing reset token.', 'error');

        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'UPDATING...';
        btn.disabled = true;

        const res = await apiCall('/reset-password', 'POST', { token, password });
        
        btn.innerText = originalText;
        btn.disabled = false;
        
        if (res.success) {
            await Modal.alert('Success', 'Your password has been updated successfully.');
            navigate('/login');
        } else {
            Modal.alert('Error', res.error, 'error');
        }
    });
}
