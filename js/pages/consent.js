import { navigate } from '../app.js';
const API_BASE_URL = 'https://api.haxnation.org';

// 1. Add a helper function to escape HTML characters
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}

export function renderConsent() {
    const params = new URLSearchParams(window.location.search);
    // 2. Escape the client_name parameter before using it
    const rawClientName = params.get('client_name') || 'Application';
    const clientName = escapeHTML(rawClientName);
         
    return `
        <div class="min-h-[80vh] flex items-center justify-center p-4">
            <div class="w-full max-w-3xl lg:max-w-4xl bg-white border-4 border-ink p-6 md:p-12 shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] text-center rounded-none relative">
                
                <div class="absolute -top-4 -right-4 border-2 border-ink bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b]">
                    AUTHORIZATION REQUEST
                </div>
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-12 md:h-16 mx-auto mb-6 object-contain">
                
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">Authorize Access<span class="inline-block w-3 h-[1em] bg-cyan animate-pulse align-middle ml-1"></span></h2>
                
                <p class="font-mono text-sm text-ink mb-4 border-y-2 border-ink py-4 font-bold">
                    <span class="bg-cyan px-1">${clientName}</span> is requesting access to your account.
                </p>
                <p class="font-mono text-[10px] text-gray-500 mb-8 uppercase text-left bg-canvas p-4 border-2 border-ink">
                    Permissions Requested: View your public profile and email address.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <button id="deny-btn" 
                        class="flex-1 btn-danger">
                        Cancel
                    </button>
                    <a href="${API_BASE_URL}/auth/oidc/continue" 
                        class="flex-1 btn-primary block">
                        Authorize
                    </a>
                </div>
            </div>
        </div>
    `;
}

export function attachConsentEvents() {
    document.getElementById('deny-btn').addEventListener('click', () => {
        navigate('/login');
    });
}
