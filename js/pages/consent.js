import { navigate } from '../app.js';
const API_BASE_URL = 'https://api.haxnation.org'; 

export function renderConsent() {
    const params = new URLSearchParams(window.location.search);
    const clientName = params.get('client_name') || 'EXTERNAL_APPLICATION';
    
    return `
        <div class="min-h-[80vh] flex items-center justify-center p-4">
            <div class="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#5ce1e6] text-center rounded-none relative">
                
                <div class="absolute -top-4 -right-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#ff2a2a]">
                    DATA_BRIDGE_REQ
                </div>

                <div class="w-16 h-16 bg-black text-[#5ce1e6] border-2 border-black flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-network-wired text-3xl"></i>
                </div>
                
                <h2 class="text-2xl font-bold uppercase tracking-tight mb-2">AUTH_GRANT<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></h2>
                <p class="font-mono text-sm text-black mb-4 border-y-2 border-black py-4 uppercase font-bold">
                    <span class="bg-[#5ce1e6] px-1">${clientName}</span> requests node access.
                </p>
                <p class="font-mono text-[10px] text-gray-500 mb-8 uppercase text-left bg-[#fafafa] p-2 border-2 border-black">
                    > PERMISSION_SCOPE: READ_PUBLIC_DATA, READ_COM_LINK
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <button id="deny-btn" 
                        class="flex-1 font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                        DENY
                    </button>
                    <a href="${API_BASE_URL}/auth/oidc/continue" 
                        class="flex-1 font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 block">
                        GRANT
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