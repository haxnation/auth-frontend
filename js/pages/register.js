import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderRegister() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-[#0b0b0b] shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] p-6 md:p-12 rounded-none relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#5ce1e6] flex items-center gap-2">
                <div class="w-2 h-2 bg-[#5ce1e6] animate-pulse rounded-none"></div>
                NEW ACCOUNT
            </div>

            <div class="text-left mb-8 mt-4 border-b-2 border-black pb-4">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-10 md:h-12 mb-6 object-contain">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Create Account</h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Sign up for a new account</p>
            </div>
            
            <form id="register-form" class="space-y-6">
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-2 block text-black">Full Name</label>
                    <input type="text" name="name" class="w-full border-2 border-black bg-[#fafafa] p-4 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-2 block text-black">Email Address</label>
                    <input type="email" name="email" class="w-full border-2 border-black bg-[#fafafa] p-4 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-2 block text-black">Password</label>
                    <input type="password" name="password" class="w-full border-2 border-black bg-[#fafafa] p-4 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                    <p class="font-mono text-[10px] text-gray-500 mt-2 uppercase border-l-2 border-[#ff2a2a] pl-2">Requirements: At least 8 characters, an uppercase letter, a number, and a symbol.</p>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 mt-4">
                    Sign Up
                </button>
            </form>
            
            <div class="my-8 border-t-2 border-black relative">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 font-mono text-[10px] uppercase font-bold text-black border-2 border-black shadow-[2px_2px_0_0_#000]">Or continue with</span>
            </div>
            
            <a href="https://api.haxnation.org/auth/google" class="flex items-center justify-center w-full bg-white text-[#3c4043] border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:bg-[#f8fafc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 mb-8" style="font-family: 'Roboto', arial, sans-serif; font-weight: 500; font-size: 16px; letter-spacing: 0.25px;">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6 h-6 mr-3">
                    <g>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </g>
                </svg>
                Sign in with Google
            </a>
            
            <div class="pt-6 border-t-2 border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p class="font-mono text-xs uppercase text-gray-500">
                    Already have an account? <a href="/login" class="nav-link font-bold text-black border-b-2 border-black hover:bg-[#5ce1e6] transition-colors duration-0 ml-1">LOG IN</a>
                </p>
            </div>
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
            await Modal.alert('Success', 'Account created. Please check your email to verify your account.');
            navigate('/login');
        } else {
            Modal.alert('Registration Failed', res.error, 'error');
        }
    });
}
