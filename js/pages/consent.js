import { navigate } from '../app.js';
const API_BASE_URL = 'https://api.haxnation.org'; 

export function renderConsent() {
    const params = new URLSearchParams(window.location.search);
    const clientName = params.get('client_name') || 'this application';
    
    return `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-shield-alt text-2xl text-gray-600"></i>
            </div>
            <h2 class="text-xl font-semibold mb-2">Authorize Application</h2>
            <p class="text-sm text-gray-600 mb-2">
                <strong>${clientName}</strong> is requesting access to your HaxNation account
            </p>
            <p class="text-xs text-gray-500 mb-8">
                This will allow them to view your public profile and email address
            </p>
            
            <div class="flex gap-3">
                <a href="${API_BASE_URL}/auth/oidc/continue" 
                    class="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors inline-block text-center">
                    Allow
                </a>
                <button id="deny-btn" 
                    class="flex-1 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Deny
                </button>
            </div>
        </div>
    `;
}

export function attachConsentEvents() {
    document.getElementById('deny-btn').addEventListener('click', () => {
        navigate('/login');
    });
}