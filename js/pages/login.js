import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderLogin() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="text-center mb-8">
                <div class="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-4">HN</div>
                <h1 class="text-2xl font-bold mb-1">Welcome back</h1>
                <p class="text-sm text-gray-500">Sign in to manage your professional profile</p>
            </div>
            
            <form id="login-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" name="email" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" placeholder="you@example.com" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input type="password" name="password" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" placeholder="••••••••" required>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">Sign in</button>
            </form>
            
            <div class="relative my-8">
                <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
                <div class="relative flex justify-center text-sm"><span class="px-4 bg-white text-gray-500">or continue with</span></div>
            </div>
            
            <a href="https://api.haxnation.org/auth/google" class="flex items-center justify-center w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                <i class="fab fa-google mr-2 text-gray-600"></i> Google
            </a>
            
            <div class="mt-8 text-center space-y-3">
                <a href="/forgot-password" class="nav-link block text-sm text-gray-500 hover:text-black transition-colors">Forgot password?</a>
                <p class="text-sm text-gray-600">Don't have an account? <a href="/register" class="nav-link font-bold text-black hover:underline">Sign up</a></p>
            </div>
        </div>
    </div>
    `;
}

export function attachLoginEvents() {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const res = await apiCall('/login', 'POST', { email, password });
        
        if (res.success) {
            if (res.data.oidc_flow) {
                // --- NEW CHECK: Did they already consent? ---
                if (res.data.has_consented) {
                    // Bypass the consent screen and go straight to the backend to generate the token
                    window.location.href = 'https://api.haxnation.org/auth/oidc/continue';
                } else {
                    // Show the consent screen as usual
                    navigate(`/consent?client_name=${encodeURIComponent(res.data.client_name || 'Application')}`);
                }
            } else {
                navigate('/dashboard');
            }
        } else {
            Modal.alert('Login Failed', res.error || 'Invalid credentials', 'error');
        }
    });
}
