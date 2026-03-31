import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderLogin() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white border-4 border-[#0b0b0b] shadow-[12px_12px_0_0_#0b0b0b] p-8 rounded-none relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#5ce1e6] flex items-center gap-2">
                <div class="w-2 h-2 bg-[#5ce1e6] animate-pulse rounded-none"></div>
                AUTH_MODULE_ACTIVE
            </div>

            <div class="text-left mb-8 mt-4 border-b-2 border-black pb-4">
                <h1 class="text-2xl font-bold uppercase tracking-tight">System_Login<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></h1>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Initialize User Session</p>
            </div>
            
            <form id="login-form" class="space-y-6">
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-1 block text-black">> USER_ID [EMAIL]</label>
                    <input type="email" name="email" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-1 block text-black">> ACCESS_KEY [PASSWORD]</label>
                    <input type="password" name="password" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                    EXECUTE_LOGIN
                </button>
            </form>
            
            <div class="my-8 border-t-2 border-black relative">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 font-mono text-[10px] uppercase font-bold text-black border-2 border-black shadow-[2px_2px_0_0_#000]">EXTERNAL_OAUTH</span>
            </div>
            
            <a href="https://api.haxnation.org/auth/google" class="flex items-center justify-center w-full font-mono uppercase tracking-widest font-bold bg-white text-black border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                <i class="fab fa-google border-2 border-black p-1 bg-[#fafafa] mr-3"></i> GOOGLE_AUTH
            </a>
            
            <div class="mt-8 pt-6 border-t-2 border-black text-left space-y-4">
                <a href="/forgot-password" class="nav-link block font-mono text-xs uppercase hover:bg-black hover:text-[#5ce1e6] inline-block p-1 border border-transparent transition-colors duration-0">>> RECOVER_ACCESS</a>
                <p class="font-mono text-xs uppercase text-gray-500">NO_RECORD_FOUND? <a href="/register" class="nav-link font-bold text-black border-b-2 border-black hover:bg-[#5ce1e6] transition-colors duration-0 ml-1">CREATE_RECORD</a></p>
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
                if (res.data.has_consented) {
                    window.location.href = 'https://api.haxnation.org/auth/oidc/continue';
                } else {
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