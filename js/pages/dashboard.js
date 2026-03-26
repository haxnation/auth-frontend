import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderDashboard(user) {
    const isStudent = user.userType === 'student';

    return `
    <div class="min-h-screen bg-white pb-20">
        <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div class="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        HN
                    </div>
                    <span class="font-bold text-lg tracking-tight hidden sm:block">HaxNation</span>
                </div>

                <div class="hidden md:flex items-center space-x-1">
                    ${renderNavLink('edit', 'Edit Profile', true)}
                    ${renderNavLink('settings', 'Settings')}
                    
                    <div class="h-4 w-px bg-gray-200 mx-4"></div>
                    
                    <button id="btn-share-nav" class="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-2">
                        <i class="fas fa-qrcode mr-2"></i> Share
                    </button>

                    <button id="btn-logout-desktop" class="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-3">
                        Log out
                    </button>
                </div>

                <div class="flex items-center space-x-3 md:hidden">
                    <button id="btn-share-mobile" class="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-black">
                        <i class="fas fa-qrcode text-sm"></i>
                    </button>
                    <button id="btn-mobile-menu" class="p-2 text-gray-600 hover:text-black">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden border-t border-gray-100 bg-white absolute w-full left-0 shadow-lg z-50">
                <div class="p-4 space-y-2">
                    ${renderMobileLink('edit', 'Edit Profile', true)}
                    ${renderMobileLink('settings', 'Settings')}
                    <div class="h-px bg-gray-100 my-2"></div>
                    <button id="btn-logout-mobile" class="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        Log out
                    </button>
                </div>
            </div>
        </nav>

        <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
            
            <div id="tab-edit" class="tab-content">
                <div class="text-center mb-10">
                    <div class="relative inline-block">
                        <div class="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-3xl font-semibold border-4 border-white shadow-sm">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <h1 class="text-2xl font-bold mt-4">${user.name}</h1>
                    <p class="text-gray-500">${user.email}</p>
                </div>

                <form id="update-form" class="space-y-8">
                    
                    <section class="space-y-4">
                        <h3 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Basic Info</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            ${renderField('Full name', 'name', user.name)}
                            ${renderField('Phone', 'phoneNumber', user.phoneNumber, user.profileVisibility?.phoneNumber, '+1 234 567 890')}
                        </div>
                    </section>

                    <section class="space-y-4">
                        <h3 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Professional Info</h3>
                        
                        <div class="group">
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">I am a</label>
                            <select name="userType" id="input-userType" class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all font-medium text-gray-900">
                                <option value="student" ${isStudent ? 'selected' : ''}>Student</option>
                                <option value="professional" ${!isStudent ? 'selected' : ''}>Professional</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            ${renderField('Location', 'currentLocation', user.currentLocation, user.profileVisibility?.currentLocation, 'City, Country')}
                            
                            <div id="section-student" style="display: contents" class="${isStudent ? '' : 'hidden'}">
                                ${renderField('University', 'collegeName', user.collegeName, user.profileVisibility?.collegeName)}
                            </div>

                            <div id="section-professional" style="display: contents" class="${!isStudent ? '' : 'hidden'}">
                                ${renderField('Company', 'workCompany', user.workCompany, user.profileVisibility?.workCompany)}
                                ${renderField('Role', 'workDesignation', user.workDesignation, user.profileVisibility?.workDesignation)}
                            </div>
                        </div>
                    </section>

                    <section class="space-y-4">
                        <h3 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Social Links</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            ${renderField('LinkedIn', 'linkedinId', user.linkedinId, user.profileVisibility?.linkedinId, 'username')}
                            ${renderField('GitHub', 'githubId', user.githubId, user.profileVisibility?.githubId, 'username')}
                            ${renderField('Instagram', 'instagramId', user.instagramId, user.profileVisibility?.instagramId, '@username')}
                            ${renderField('Website', 'website', user.website, user.profileVisibility?.website, 'https://example.com')}
                        </div>
                    </section>

                    <div class="pt-4">
                        <button type="submit" 
                            class="w-full md:w-auto md:float-right bg-black text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all transform active:scale-95">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div id="tab-settings" class="tab-content hidden pt-4">
                <div class="max-w-lg mx-auto space-y-6">
                    <div class="bg-red-50 rounded-2xl p-6 border border-red-100">
                        <h3 class="text-red-900 font-bold mb-2">Danger Zone</h3>
                        <p class="text-red-700/80 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                        <button id="btn-delete-acc" 
                            class="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm border border-red-100 hover:bg-red-50 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    `;
}

// Helpers
function renderNavLink(id, label, isActive = false) {
    const activeClass = isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-500 hover:text-black hover:bg-gray-50';
    return `
        <button onclick="window.handleTabSwitch(event, '${id}')" 
            class="nav-item nav-desktop-${id} px-4 py-2 rounded-lg text-sm transition-colors ${activeClass}"
            data-tab="${id}">
            ${label}
        </button>
    `;
}

function renderMobileLink(id, label, isActive = false) {
    const activeClass = isActive ? 'bg-gray-50 text-black font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-black';
    return `
        <button onclick="window.handleTabSwitch(event, '${id}')" 
            class="nav-item nav-mobile-${id} w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeClass}"
            data-tab="${id}">
            ${label}
        </button>
    `;
}

function renderField(label, name, value = '', isVisible = false, placeholder = '') {
    const showToggle = name !== 'name';
    return `
        <div class="group">
            <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide">${label}</label>
                ${showToggle ? `
                <label class="flex items-center text-xs text-gray-400 hover:text-black cursor-pointer transition-colors select-none">
                    <input type="checkbox" name="vis_${name}" ${isVisible ? 'checked' : ''} 
                        class="mr-1.5 rounded border-gray-300 text-black focus:ring-black">
                    Public
                </label>
                ` : ''}
            </div>
            <input type="text" name="${name}" value="${value || ''}" placeholder="${placeholder}"
                class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all font-medium text-gray-900 placeholder-gray-400">
        </div>
    `;
}

// Global Handlers
window.handleTabSwitch = (event, tabName) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    // Update Nav Styles
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-gray-100', 'bg-gray-50', 'text-black', 'font-semibold');
        el.classList.add('text-gray-500');
    });

    const deskBtn = document.querySelector(`.nav-desktop-${tabName}`);
    if(deskBtn) {
        deskBtn.classList.remove('text-gray-500');
        deskBtn.classList.add('bg-gray-100', 'text-black', 'font-semibold');
    }

    const mobileBtn = document.querySelector(`.nav-mobile-${tabName}`);
    if(mobileBtn) {
        mobileBtn.classList.remove('text-gray-500');
        mobileBtn.classList.add('bg-gray-50', 'text-black', 'font-semibold');
    }

    document.getElementById('mobile-menu').classList.add('hidden');
};

export function attachDashboardEvents(user) {
    // Mobile Menu
    const menuBtn = document.getElementById('btn-mobile-menu');
    if(menuBtn) menuBtn.addEventListener('click', () => document.getElementById('mobile-menu').classList.toggle('hidden'));

    // QR Code Modal Trigger (Desktop & Mobile)
    const showShare = () => Modal.showQR(user);
    const btnShareNav = document.getElementById('btn-share-nav');
    if(btnShareNav) btnShareNav.addEventListener('click', showShare);
    
    const btnShareMobile = document.getElementById('btn-share-mobile');
    if(btnShareMobile) btnShareMobile.addEventListener('click', showShare);

    // Dynamic Form Toggle
    const typeSelect = document.getElementById('input-userType');
    const studentSec = document.getElementById('section-student');
    const profSec = document.getElementById('section-professional');

    if(typeSelect) {
        typeSelect.addEventListener('change', (e) => {
            if(e.target.value === 'student') {
                studentSec.classList.remove('hidden');
                profSec.classList.add('hidden');
            } else {
                studentSec.classList.add('hidden');
                profSec.classList.remove('hidden');
            }
        });
    }

    // Form Submit
    const form = document.getElementById('update-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Saving...';
            btn.disabled = true;

            const formData = new FormData(e.target);
            const payload = { profileVisibility: {} };
            
            for (let [key, value] of formData.entries()) {
                if (key.startsWith('vis_')) {
                    payload.profileVisibility[key.replace('vis_', '')] = true;
                } else {
                    if(value) payload[key] = value;
                }
            }
            
            // Clean up payload based on selected type
            if (payload.userType === 'student') {
                // If student, ensure no professional data is sent (validation requirement)
                payload.workCompany = "";
                payload.workDesignation = "";
                delete payload.workCompany;
                delete payload.workDesignation;
            } else if (payload.userType === 'professional') {
                // If professional, ensure no student data is sent
                payload.collegeName = "";
                delete payload.collegeName;
            }

            if(payload.name) await apiCall('/users/profile/basic', 'PUT', { name: payload.name });
            const res = await apiCall('/users/profile/extended', 'PUT', payload);

            btn.innerText = originalText; // Reset text
            btn.disabled = false;

            if (res.success) {
                Modal.alert('Success', 'Profile updated successfully!', 'success');
                // Reload to reflect deep changes if type switched
                setTimeout(() => window.location.reload(), 1000); 
            } else {
                Modal.alert('Error', res.error, 'error');
            }
        });
    }

    // Logout
    const handleLogout = async () => {
        await apiCall('/logout', 'POST');
        navigate('/login');
    };
    ['btn-logout-desktop', 'btn-logout-mobile'].forEach(id => {
        const btn = document.getElementById(id);
        if(btn) btn.addEventListener('click', handleLogout);
    });

    // Delete Account
    const deleteBtn = document.getElementById('btn-delete-acc');
    if(deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            const confirmed = await Modal.confirm('Delete Account?', 'This action cannot be undone. All your data will be permanently removed.', 'Delete', true);
            if(confirmed) {
                const res = await apiCall('/users/account', 'DELETE');
                if(res.success) navigate('/login');
                else Modal.alert('Error', res.error, 'error');
            }
        });
    }
}