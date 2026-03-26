// public/js/app.js
import { apiCall } from './api.js';

const app = document.getElementById('app');

// Helper to show a loading spinner during network fetches
function showLoading() {
    app.innerHTML = `
        <div class="flex items-center justify-center min-h-[50vh]">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>`;
}

async function router() {
    const path = window.location.pathname;
    
    try {
        // --- 1. Public Routes ---

        if (path.startsWith('/u/')) {
            const userId = path.split('/u/')[1];
            if (userId) {
                showLoading();
                // Dynamically import public profile module
                const { renderPublicProfile } = await import('./pages/public.js');
                app.innerHTML = await renderPublicProfile(userId);
                return;
            }
        }

        if (path === '/login') {
            showLoading();
            const { renderLogin, attachLoginEvents } = await import('./pages/login.js');
            app.innerHTML = renderLogin();
            attachLoginEvents();
            return;
        }

        if (path === '/register') {
            showLoading();
            const { renderRegister, attachRegisterEvents } = await import('./pages/register.js');
            app.innerHTML = renderRegister();
            attachRegisterEvents();
            return;
        }

        if (path === '/forgot-password') {
            showLoading();
            const { renderForgotPassword, attachForgotEvents } = await import('./pages/password.js');
            app.innerHTML = renderForgotPassword();
            attachForgotEvents();
            return;
        }

        if (path === '/reset-password') {
            showLoading();
            const { renderResetPassword, attachResetEvents } = await import('./pages/password.js');
            app.innerHTML = renderResetPassword();
            attachResetEvents();
            return;
        }

        if (path === '/verify-email') {
            showLoading();
            const { renderVerifyEmail, handleVerification } = await import('./pages/verify.js');
            app.innerHTML = renderVerifyEmail();
            handleVerification(); // This is async but we don't block render
            return;
        }

        // --- 2. Protected Routes (Auth Check Required) ---
        
        // We check auth first. If valid, we load the dashboard code.
        // This saves fetching dashboard.js for unauthenticated users.
        const profileRes = await apiCall('/users/profile');
        const isAuthenticated = profileRes.success;

        if (path === '/consent') {
            if (!isAuthenticated) {
                navigate('/login'); 
                return;
            }
            showLoading();
            const { renderConsent, attachConsentEvents } = await import('./pages/consent.js');
            app.innerHTML = renderConsent();
            attachConsentEvents();
            return;
        }

        // Root / Dashboard Logic
        if (path === '/' || path === '/dashboard') {
            if (isAuthenticated) {
                if (path === '/') window.history.replaceState({}, '', '/dashboard');
                
                showLoading();
                const { renderDashboard, attachDashboardEvents } = await import('./pages/dashboard.js');
                
                // Pass user data to avoid re-fetching
                app.innerHTML = await renderDashboard(profileRes.data);
                attachDashboardEvents(profileRes.data);
            } else {
                navigate('/login');
            }
            return;
        }

        // 404 Fallback
        app.innerHTML = `
            <div class="text-center mt-10">
                <h2 class="text-xl font-semibold">404 - Page Not Found</h2>
                <a href="/" class="text-blue-600 hover:underline">Go Home</a>
            </div>`;

    } catch (error) {
        console.error("Routing error:", error);
        app.innerHTML = `<div class="text-center text-red-600 mt-10">Error loading content. Please refresh.</div>`;
    }
}

// Global Navigation Helper
export function navigate(url) {
    window.history.pushState({}, '', url);
    router();
}

// Handle browser Back/Forward buttons
window.addEventListener('popstate', router);

// Handle standard <a> links
document.addEventListener('click', e => {
    // Traverse up to find the anchor tag in case icon is clicked
    const link = e.target.closest('a');
    if (link && link.matches('a.nav-link')) {
        e.preventDefault();
        navigate(link.getAttribute('href'));
    }
});

// Initial Load
document.addEventListener('DOMContentLoaded', router);