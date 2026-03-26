import { apiCall } from '../api.js';
import { navigate } from '../app.js';

export function renderVerifyEmail() {
    return `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-envelope-open-text text-2xl text-gray-400"></i>
        </div>
        <h2 class="text-xl font-semibold mb-2">Verifying your email</h2>
        <p id="verify-status" class="text-sm text-gray-500">Please wait while we verify your account...</p>
    </div>
    `;
}

export async function handleVerification() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const statusEl = document.getElementById('verify-status');

    if (!token) {
        statusEl.textContent = 'Error: Invalid verification link.';
        statusEl.classList.add('text-red-600');
        return;
    }

    const res = await apiCall('/verify-email', 'POST', { token });

    if (res.success) {
        statusEl.textContent = 'Email verified successfully! Redirecting to login...';
        statusEl.classList.add('text-green-600');
        setTimeout(() => navigate('/login'), 2000);
    } else {
        statusEl.textContent = res.error || 'Verification failed. Link may have expired.';
        statusEl.classList.add('text-red-600');
    }
}