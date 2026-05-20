import { apiCall } from './api.js';

const app = document.getElementById('app');

function showLoading() {
    app.innerHTML = `
        <div class="flex items-center justify-center min-h-[50vh]">
            <div class="w-12 h-12 bg-ink border-4 border-cyan shadow-[4px_4px_0_0_#0b0b0b] animate-[spin_1s_steps(4)_infinite]"></div>
        </div>`;
}

async function router() {
    const path = window.location.pathname;
    
    try {
        if (path.startsWith('/u/')) {
            const userId = path.split('/u/')[1];
            if (userId) {
                showLoading();
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
            handleVerification(); 
            return;
        }

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

        if (path === '/' || path === '/dashboard') {
            if (isAuthenticated) {
                if (path === '/') window.history.replaceState({}, '', '/dashboard');
                
                showLoading();
                const { renderDashboard, attachDashboardEvents } = await import('./pages/dashboard.js');
                
                app.innerHTML = await renderDashboard(profileRes.data);
                attachDashboardEvents(profileRes.data);
            } else {
                navigate('/login');
            }
            return;
        }

        app.innerHTML = `
            <div class="text-center mt-10 border-4 border-ink bg-white p-8 shadow-[8px_8px_0_0_#0b0b0b] max-w-md mx-auto">
                <h2 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-ink pb-2 mb-6">404 - SYSTEM NOT FOUND<span class="inline-block w-3 h-[1em] bg-danger animate-pulse align-middle ml-1"></span></h2>
                <a href="/" class="block btn-primary">INITIALIZE_HOME</a>
            </div>`;

    } catch (error) {
        console.error("Routing error:", error);
        app.innerHTML = `
            <div class="text-center mt-10 border-4 border-ink bg-ink text-danger p-8 shadow-[8px_8px_0_0_#0b0b0b] max-w-md mx-auto">
                <h2 class="text-xl font-bold font-mono uppercase">FATAL_ERROR</h2>
                <p class="mt-4 font-mono text-xs">System execution failed. Reboot required.</p>
            </div>`;
    }
}

export function navigate(url) {
    window.history.pushState({}, '', url);
    router();
}

window.addEventListener('popstate', router);

document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.matches('a.nav-link')) {
        e.preventDefault();
        navigate(link.getAttribute('href'));
    }
});

document.addEventListener('DOMContentLoaded', router);