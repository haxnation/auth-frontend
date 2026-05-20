import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderLogin() {
    // 1. Grab the returnTo parameter if it exists
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get('returnTo');
    
    // 2. Dynamically build the links to carry the parameter forward
    const registerLink = returnTo ? `/register?returnTo=${encodeURIComponent(returnTo)}` : '/register';
    const forgotLink = returnTo ? `/forgot-password?returnTo=${encodeURIComponent(returnTo)}` : '/forgot-password';
    const googleLink = returnTo ? `https://api.haxnation.org/auth/google?returnTo=${encodeURIComponent(returnTo)}` : 'https://api.haxnation.org/auth/google';

    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-3xl lg:max-w-4xl card relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-ink bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b] flex items-center gap-2">
                <div class="w-2 h-2 bg-cyan animate-pulse rounded-none"></div>
                SECURE LOGIN
            </div>

            <div class="text-left mb-8 mt-4 border-b-2 border-ink pb-4">
                <div class="bg-ink border-2 border-ink p-2 mb-6 inline-block shadow-[4px_4px_0_0_#5ce1e6]">
                    <img src="https://haxnation.org/images/logo_wt.png" alt="HaxNation Logo" class="h-8 md:h-10 object-contain">
                </div>
                <h1 class="text-2xl md:text-3xl font-bold uppercase tracking-tight">Welcome Back</h1>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Sign in to your account</p>
            </div>
            
            <form id="login-form" class="space-y-6">
                <div>
                    <label class="label" for="login-email">Email Address</label>
                    <input type="email" id="login-email" name="email" class="input w-full" required>
                </div>
                <div>
                    <label class="label" for="login-password">Password</label>
                    <div class="relative">
                        <input type="password" id="login-password" name="password" class="input w-full pr-10" required>
                        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink hover:text-cyan focus:outline-none" aria-label="Toggle password visibility" onclick="const p=document.getElementById('login-password'); p.type=p.type==='password'?'text':'password'; this.innerHTML=p.type==='password'?'<i class=\\'fas fa-eye\\'></i>':'<i class=\\'fas fa-eye-slash\\'></i>';">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <button type="submit" class="btn-primary w-full mt-4">
                    Sign In
                </button>
            </form>
            
            <div class="my-8 border-t-2 border-ink relative">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 whitespace-nowrap font-mono text-[10px] uppercase font-bold text-ink border-2 border-ink shadow-[2px_2px_0_0_#0b0b0b]">Or continue with</span>
            </div>
            
            <a href="${googleLink}" class="flex items-center justify-center w-full bg-white text-[#3c4043] border-2 border-ink px-6 py-4 shadow-[4px_4px_0_0_#0b0b0b] hover:bg-[#f8fafc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0b0b0b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 mb-8" style="font-family: 'Roboto', arial, sans-serif; font-weight: 500; font-size: 16px; letter-spacing: 0.25px;">
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
            
            <div class="pt-6 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <a href="${forgotLink}" class="nav-link font-mono text-xs uppercase hover:bg-ink hover:text-cyan inline-block p-1 border border-transparent transition-colors duration-0">Forgot Password?</a>
                <p class="font-mono text-xs uppercase text-gray-500">Don't have an account? <a href="${registerLink}" class="nav-link font-bold text-ink border-b-2 border-ink hover:bg-cyan transition-colors duration-0 ml-1">REGISTER</a></p>
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
        
        // 3. Grab the returnTo parameter to send to the backend API
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('returnTo');
        
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'AUTHENTICATING...';
        btn.disabled = true;

        const payload = { email, password };
        if (returnTo) payload.returnTo = returnTo;

        const res = await apiCall('/login', 'POST', payload);
        
        btn.innerText = originalText;
        btn.disabled = false;
        
        if (res.success) {
            if (res.data.oidc_flow) {
                if (res.data.has_consented) {
                    window.location.href = 'https://api.haxnation.org/auth/oidc/continue';
                } else {
                    navigate(`/consent?client_name=${encodeURIComponent(res.data.client_name || 'Application')}`);
                }
            } else {
                // 4. Navigate using the backend's provided return path!
                navigate(res.data.redirect_to || '/dashboard');
            }
        } else {
            Modal.alert('Login Failed', res.error || 'Invalid credentials.', 'error');
        }
    });
}
