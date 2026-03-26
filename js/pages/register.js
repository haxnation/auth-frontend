import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderRegister() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 class="text-2xl font-bold mb-2 text-center">Create account</h2>
            <p class="text-sm text-gray-500 text-center mb-8">Join the professional network</p>
            
            <form id="register-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                    <input type="text" name="name" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" placeholder="John Doe" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" name="email" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" placeholder="you@example.com" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input type="password" name="password" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors" placeholder="••••••••" required>
                    <p class="text-xs text-gray-500 mt-1.5">Min 8 chars, uppercase, number & symbol required</p>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">Create account</button>
            </form>
            
            <p class="mt-8 text-center text-sm text-gray-600">
                Already have an account? <a href="/login" class="nav-link font-bold text-black hover:underline">Sign in</a>
            </p>
        </div>
    </div>
    `;
}

export function attachRegisterEvents() {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await apiCall('/register', 'POST', { name, email, password });
        
        if (res.success) {
            await Modal.alert('Account Created', 'Registration successful! Please check your email to verify your account.');
            navigate('/login');
        } else {
            Modal.alert('Registration Failed', res.error, 'error');
        }
    });
}