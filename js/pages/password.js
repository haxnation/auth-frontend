import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderForgotPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-[#0b0b0b] shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] p-6 md:p-12 rounded-none relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#ff2a2a]">
                ACCOUNT RECOVERY
            </div>
            
            <div class="text-left mb-8 mt-4 border-b-2 border-black pb-4">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-10 md:h-12 mb-6 object-contain">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Forgot Password</h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Enter your email to receive a reset link</p>
            </div>
            
            <form id="forgot-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-2 text-black">Email Address</label>
                    <input type="email" name="email" class="w-full border-2 border-black bg-[#fafafa] p-4 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 mt-4">
                    Send Reset Link
                </button>
            </form>
            
            <div class="mt-8 border-t-2 border-black pt-6 text-left">
                <a href="/login" class="nav-link font-mono text-xs font-bold text-black hover:bg-black hover:text-[#5ce1e6] uppercase transition-colors duration-0 p-1 inline-block">
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
        const res = await apiCall('/forgot-password', 'POST', { email });
        Modal.alert('Email Sent', res.message || 'If an account exists, a reset link has been sent to your email.');
        navigate('/login');
    });
}

export function renderResetPassword() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-[#0b0b0b] shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] p-6 md:p-12 rounded-none relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#ff2a2a]">
                RESET PASSWORD
            </div>
            
            <div class="text-left mb-8 mt-4 border-b-2 border-black pb-4">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-10 md:h-12 mb-6 object-contain">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Create New Password</h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Enter your new secure password below</p>
            </div>
            
            <form id="reset-form" class="space-y-6">
                <div>
                    <label class="block font-mono text-xs font-bold uppercase mb-2 text-black">New Password</label>
                    <input type="password" name="password" class="w-full border-2 border-black bg-[#fafafa] p-4 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                    <p class="font-mono text-[10px] text-gray-500 mt-2 uppercase border-l-2 border-[#ff2a2a] pl-2">Requirements: At least 8 characters, an uppercase letter, a number, and a symbol.</p>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 mt-4">
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

        const res = await apiCall('/reset-password', 'POST', { token, password });
        if (res.success) {
            await Modal.alert('Success', 'Your password has been updated successfully.');
            navigate('/login');
        } else {
            Modal.alert('Error', res.error, 'error');
        }
    });
}
