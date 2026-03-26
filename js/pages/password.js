import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderForgotPassword() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-xl font-bold mb-2 text-center">Reset password</h2>
            <p class="text-sm text-gray-500 text-center mb-8">Enter your email for a recovery link</p>
            
            <form id="forgot-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" name="email" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" required>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">Send Link</button>
            </form>
            <p class="mt-6 text-center text-sm text-gray-600">
                <a href="/login" class="nav-link font-bold text-black hover:underline">Back to login</a>
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
        Modal.alert('Check your inbox', res.message || 'If an account exists, a reset link has been sent.');
        navigate('/login');
    });
}

export function renderResetPassword() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-xl font-bold mb-2 text-center">New password</h2>
            <p class="text-sm text-gray-500 text-center mb-8">Choose a strong password</p>
            
            <form id="reset-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <input type="password" name="password" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" required>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">Update Password</button>
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
            await Modal.alert('Success', 'Password reset successfully!');
            navigate('/login');
        } else {
            Modal.alert('Error', res.error, 'error');
        }
    });
}