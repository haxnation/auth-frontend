import { apiCall, getActiveServices, revokeAccess } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderDashboard(user) {
    const isStudent = user.userType === 'student';
    const isFirstTime = !user.updatedAt;

    return `
    <div class="min-h-screen bg-canvas pb-20 selection:bg-cyan selection:text-ink">
        
        <nav class="sticky top-0 z-50 border-b-2 border-[#0b0b0b] bg-[#0b0b0b] text-[#fafafa]">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex justify-between items-center font-mono">
                <div class="flex items-center gap-3">
                    <img src="/logo.png" alt="Haxnation" class="h-7 sm:h-8 w-auto object-contain">
                    <div class="hidden sm:flex items-center gap-3">
                        <span class="text-white opacity-30 text-lg">|</span>
                        <span class="font-bold text-sm sm:text-base uppercase tracking-wider">Dashboard</span>
                    </div>
                </div>

                <div class="hidden md:flex items-center gap-2">
                    <button onclick="window.handleTabSwitch(event, 'edit')" 
                        class="nav-item nav-desktop-edit font-mono uppercase text-[10px] font-bold px-3 py-1.5 border-2 transition-colors duration-0 bg-[#5ce1e6] text-[#0b0b0b] border-[#5ce1e6]"
                        data-tab="edit">
                        Edit Profile
                    </button>
                    <button onclick="window.handleTabSwitch(event, 'settings')" 
                        class="nav-item nav-desktop-settings font-mono uppercase text-[10px] font-bold px-3 py-1.5 border-2 transition-colors duration-0 text-[#fafafa] hover:bg-[#fafafa] hover:text-[#0b0b0b] border-transparent"
                        data-tab="settings">
                        Settings
                    </button>
                    
                    <div class="h-5 w-px bg-white mx-1 opacity-30"></div>
                    
                    <button id="btn-share-nav" class="font-mono uppercase text-[10px] font-bold bg-[#fafafa] text-[#0b0b0b] border-2 border-[#0b0b0b] px-3 py-1.5 hover:bg-[#5ce1e6] transition-all duration-0">
                        <i class="fas fa-share-alt mr-1"></i> Share
                    </button>

                    <button id="btn-logout-desktop" class="font-mono uppercase text-[10px] font-bold bg-[#ff2a2a] text-white border-2 border-transparent px-3 py-1.5 hover:border-white transition-all duration-0">
                        Log Out
                    </button>
                </div>

                <div class="flex items-center gap-2 md:hidden">
                    <button id="btn-share-mobile" class="w-9 h-9 bg-[#fafafa] flex items-center justify-center text-[#0b0b0b] border-2 border-[#0b0b0b] hover:bg-[#5ce1e6]">
                        <i class="fas fa-share-alt text-sm"></i>
                    </button>
                    <button id="btn-mobile-menu" class="w-9 h-9 border-2 border-[#fafafa] flex items-center justify-center text-[#fafafa] hover:bg-[#5ce1e6] hover:text-[#0b0b0b] transition-colors duration-0">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden border-t-2 border-[#fafafa] bg-[#0b0b0b] w-full absolute left-0 z-50">
                <div class="p-0 flex flex-col font-mono uppercase text-sm font-bold">
                    <button onclick="window.handleTabSwitch(event, 'edit')" 
                        class="nav-item nav-mobile-edit w-full text-left px-6 py-3 border-b-2 border-[#0b0b0b] transition-colors duration-0 bg-[#5ce1e6] text-[#0b0b0b]"
                        data-tab="edit">
                        Edit Profile
                    </button>
                    <button onclick="window.handleTabSwitch(event, 'settings')" 
                        class="nav-item nav-mobile-settings w-full text-left px-6 py-3 border-b-2 border-[#0b0b0b] transition-colors duration-0 text-[#fafafa] hover:bg-[#fafafa] hover:text-[#0b0b0b]"
                        data-tab="settings">
                        Settings
                    </button>
                    <button id="btn-logout-mobile" class="w-full text-left px-6 py-3 bg-[#ff2a2a] text-white border-b-2 border-[#0b0b0b] hover:bg-[#0b0b0b] hover:text-[#ff2a2a] transition-colors duration-0">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>

        <div class="max-w-7xl mx-auto px-6 md:px-10 py-12">
            
            <div id="tab-edit" class="tab-content">
                
                <div class="flex flex-col md:flex-row gap-8 mb-12 border-4 border-ink bg-white p-6 md:p-8 shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] relative">
                    <div class="absolute -top-4 -left-4 border-2 border-ink bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b]">
                        ACTIVE PROFILE
                    </div>
                    
                    <div class="w-32 h-32 bg-ink text-cyan flex-shrink-0 flex items-center justify-center text-5xl font-bold border-4 border-ink shadow-[4px_4px_0_0_#0b0b0b] rounded-none">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex flex-col justify-center">
                        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-ink">${user.name}</h1>
                        <p class="font-mono text-sm uppercase tracking-widest bg-ink text-white self-start px-2 py-1 mt-4">Email: ${user.email}</p>
                    </div>
                </div>

                <form id="update-form" class="space-y-12">
                    
                    ${isFirstTime ? `
                    <div id="wizard-progress" class="mb-8 border-4 border-ink bg-white p-4 shadow-[4px_4px_0_0_#0b0b0b]">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-mono text-xs font-bold uppercase text-ink">Profile Setup Progress</span>
                            <span id="wizard-percent" class="font-mono text-xs font-bold text-cyan bg-ink px-2 py-1">33%</span>
                        </div>
                        <div class="w-full bg-canvas border-2 border-ink h-6 p-1">
                            <div id="wizard-bar" class="bg-cyan h-full transition-all duration-300" style="width: 33%"></div>
                        </div>
                    </div>
                    ` : ''}

                    <section id="step-1" class="border-4 border-ink bg-white shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[8px_8px_0_0_#0b0b0b] relative">
                        <div class="bg-ink text-cyan p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-ink">
                            01. Basic Information
                        </div>
                        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            ${renderField('Full Name', 'name', user.name)}
                            ${renderField('Phone Number', 'phoneNumber', user.phoneNumber, user.profileVisibility?.phoneNumber, '+1 234 567 890')}
                        </div>
                    </section>

                    <section id="step-2" class="${isFirstTime ? 'hidden ' : ''}border-4 border-ink bg-white shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[8px_8px_0_0_#0b0b0b] relative">
                        <div class="bg-ink text-cyan p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-ink">
                            02. Professional Details
                        </div>
                        <div class="p-6 md:p-8 space-y-6 md:space-y-8">
                            
                            <div class="group border-2 border-ink p-4 bg-canvas">
                                <label class="block font-mono text-xs font-bold uppercase mb-2 text-ink">Account Type</label>
                                <select name="userType" id="input-userType" class="w-full border-2 border-ink bg-white p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-cyan focus:bg-ink focus:text-cyan transition-colors duration-0 appearance-none">
                                    <option value="student" ${isStudent ? 'selected' : ''}>Student</option>
                                    <option value="professional" ${!isStudent ? 'selected' : ''}>Professional</option>
                                </select>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                ${renderField('Location', 'currentLocation', user.currentLocation, user.profileVisibility?.currentLocation, 'City, Country')}
                                
                                <div id="section-student" style="display: contents" class="${isStudent ? '' : 'hidden'}">
                                    ${renderField('University', 'collegeName', user.collegeName, user.profileVisibility?.collegeName)}
                                </div>
                                <div id="section-professional" style="display: contents" class="${!isStudent ? '' : 'hidden'}">
                                    ${renderField('Company', 'workCompany', user.workCompany, user.profileVisibility?.workCompany)}
                                    ${renderField('Job Title', 'workDesignation', user.workDesignation, user.profileVisibility?.workDesignation)}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="step-3" class="${isFirstTime ? 'hidden ' : ''}border-4 border-ink bg-white shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[8px_8px_0_0_#0b0b0b] relative">
                        <div class="bg-ink text-cyan p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-ink">
                            03. Social Profiles
                        </div>
                        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            ${renderField('LinkedIn Profile', 'linkedinId', user.linkedinId, user.profileVisibility?.linkedinId, 'username')}
                            ${renderField('GitHub Username', 'githubId', user.githubId, user.profileVisibility?.githubId, 'username')}
                            ${renderField('Instagram', 'instagramId', user.instagramId, user.profileVisibility?.instagramId, '@username')}
                            ${renderField('Personal Website', 'website', user.website, user.profileVisibility?.website, 'https://example.com')}
                        </div>
                    </section>

                    ${isFirstTime ? `
                    <div id="wizard-nav" class="flex justify-between pt-4">
                        <button type="button" id="btn-prev" class="hidden font-mono uppercase tracking-widest font-bold bg-canvas text-ink border-4 border-ink px-8 py-4 shadow-[4px_4px_0_0_#0b0b0b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-0">
                            Back
                        </button>
                        <button type="button" id="btn-next" class="ml-auto font-mono uppercase tracking-widest font-bold bg-cyan text-ink border-4 border-ink px-8 py-4 shadow-[8px_8px_0_0_#0b0b0b] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_#0b0b0b] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-75 text-lg">
                            Next Step
                        </button>
                    </div>
                    ` : ''}

                    <div id="submit-nav" class="${isFirstTime ? 'hidden ' : ''}pt-4 flex justify-end">
                        <button type="submit" 
                            class="w-full md:w-auto font-mono uppercase tracking-widest font-bold bg-cyan text-ink border-4 border-ink px-8 py-4 shadow-[8px_8px_0_0_#0b0b0b] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_#0b0b0b] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-75 text-lg">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div id="tab-settings" class="tab-content hidden pt-4">
                
                <!-- NEW: AUTHORIZED APPS SECTION -->
                <div class="max-w-2xl mx-auto border-4 border-ink bg-white p-6 md:p-8 shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b] mb-8 relative">
                    <div class="absolute -top-4 -left-4 border-2 border-ink bg-ink text-cyan px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#0b0b0b]">
                        CONNECTED APPS
                    </div>
                    <h3 class="text-2xl font-bold text-ink uppercase tracking-tight mb-4 border-b-2 border-ink pb-2">Authorized Apps<span class="inline-block w-3 h-[1em] bg-cyan animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-ink mb-6">Manage third-party applications that have access to your account data.</p>
                    
                    <div id="authorized-apps-container" class="space-y-4">
                        <!-- Apps will be dynamically injected here -->
                    </div>
                </div>

                <!-- DANGER ZONE -->
                <div class="max-w-2xl mx-auto border-4 border-danger bg-ink p-6 md:p-8 shadow-[4px_4px_0_0_#0b0b0b] md:shadow-[12px_12px_0_0_#0b0b0b]">
                    <h3 class="text-2xl font-bold text-danger uppercase tracking-tight mb-4 border-b-2 border-danger pb-2">Danger Zone<span class="inline-block w-3 h-[1em] bg-danger animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-white mb-8 border-l-4 border-danger pl-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    
                    <button id="btn-delete-acc" 
                        class="w-full font-mono uppercase tracking-widest font-bold bg-danger text-white border-2 border-danger px-6 py-4 hover:bg-ink hover:text-danger transition-colors duration-0 shadow-[4px_4px_0_0_#0b0b0b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                        Delete Account
                    </button>
                </div>
            </div>

        </div>
    </div>
    `;
}

// Helpers
function renderNavLink(id, label, isActive = false) {
    const activeClass = isActive 
        ? 'bg-cyan text-ink border-cyan' 
        : 'text-canvas hover:bg-canvas hover:text-ink border-transparent';
        
    return `
        <button onclick="window.handleTabSwitch(event, '${id}')" 
            class="nav-item nav-desktop-${id} font-mono uppercase text-xs font-bold px-4 py-2 border-2 transition-colors duration-0 ${activeClass}"
            data-tab="${id}">
            ${label}
        </button>
    `;
}

function renderMobileLink(id, label, isActive = false) {
    const activeClass = isActive 
        ? 'bg-cyan text-ink' 
        : 'text-canvas hover:bg-canvas hover:text-ink';

    return `
        <button onclick="window.handleTabSwitch(event, '${id}')" 
            class="nav-item nav-mobile-${id} w-full text-left px-6 py-4 border-b-2 border-ink transition-colors duration-0 ${activeClass}"
            data-tab="${id}">
            ${label}
        </button>
    `;
}

function renderField(label, name, value = '', isVisible = false, placeholder = '') {
    const showToggle = name !== 'name';
    return `
        <div class="group border-2 border-ink p-4 bg-canvas">
            <div class="flex items-start justify-between mb-2">
                <label class="block font-mono text-xs font-bold uppercase text-ink">${label}</label>
                ${showToggle ? `
                <label class="flex items-center gap-2 font-mono text-[10px] text-ink cursor-pointer uppercase border-2 border-ink px-2 py-1 hover:bg-cyan transition-colors duration-0 select-none">
                    <input type="checkbox" name="vis_${name}" ${isVisible ? 'checked' : ''} 
                        class="appearance-none w-3 h-3 border-2 border-ink bg-white checked:bg-ink focus:outline-none focus:ring-0">
                    Make Public
                </label>
                ` : ''}
            </div>
            <input type="text" name="${name}" value="${value || ''}" placeholder="${placeholder}"
                class="w-full border-2 border-ink bg-white p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-cyan focus:bg-ink focus:text-cyan transition-colors duration-0 placeholder-gray-400">
        </div>
    `;
}

window.handleTabSwitch = (event, tabName) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    document.querySelectorAll('.nav-desktop-edit, .nav-desktop-settings').forEach(el => {
        el.classList.remove('bg-cyan', 'text-ink', 'border-cyan');
        el.classList.add('text-canvas', 'border-transparent');
    });
    const deskBtn = document.querySelector(`.nav-desktop-${tabName}`);
    if(deskBtn) {
        deskBtn.classList.remove('text-canvas', 'border-transparent');
        deskBtn.classList.add('bg-cyan', 'text-ink', 'border-cyan');
    }

    document.querySelectorAll('.nav-mobile-edit, .nav-mobile-settings').forEach(el => {
        el.classList.remove('bg-cyan', 'text-ink');
        el.classList.add('text-canvas');
    });
    const mobileBtn = document.querySelector(`.nav-mobile-${tabName}`);
    if(mobileBtn) {
        mobileBtn.classList.remove('text-canvas');
        mobileBtn.classList.add('bg-cyan', 'text-ink');
    }

    document.getElementById('mobile-menu').classList.add('hidden');
};

export function attachDashboardEvents(user) {
    const isFirstTime = !user.updatedAt;
    
    if (isFirstTime) {
        let currentStep = 1;
        const totalSteps = 3;
        
        const updateWizard = () => {
            const percent = Math.round((currentStep / totalSteps) * 100);
            const percentEl = document.getElementById('wizard-percent');
            const barEl = document.getElementById('wizard-bar');
            if (percentEl) percentEl.innerText = percent + '%';
            if (barEl) barEl.style.width = percent + '%';
            
            for(let i = 1; i <= totalSteps; i++) {
                const el = document.getElementById(`step-${i}`);
                if (el) {
                    if (i === currentStep) {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.add('hidden');
                    }
                }
            }
            
            const btnPrev = document.getElementById('btn-prev');
            const wizardNav = document.getElementById('wizard-nav');
            const submitNav = document.getElementById('submit-nav');
            
            if (btnPrev) {
                if (currentStep === 1) {
                    btnPrev.classList.add('hidden');
                } else {
                    btnPrev.classList.remove('hidden');
                }
            }
            
            if (currentStep === totalSteps) {
                if (wizardNav) {
                    wizardNav.classList.add('hidden');
                    wizardNav.classList.remove('flex');
                }
                if (submitNav) {
                    submitNav.classList.remove('hidden');
                    submitNav.classList.add('flex');
                }
            } else {
                if (wizardNav) {
                    wizardNav.classList.remove('hidden');
                    wizardNav.classList.add('flex');
                }
                if (submitNav) {
                    submitNav.classList.add('hidden');
                    submitNav.classList.remove('flex');
                }
            }
        };
        
        const btnNext = document.getElementById('btn-next');
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateWizard();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
        
        const btnPrev = document.getElementById('btn-prev');
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateWizard();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    const menuBtn = document.getElementById('btn-mobile-menu');
    if(menuBtn) menuBtn.addEventListener('click', () => document.getElementById('mobile-menu').classList.toggle('hidden'));

    const showShare = () => Modal.showQR(user);
    const btnShareNav = document.getElementById('btn-share-nav');
    if(btnShareNav) btnShareNav.addEventListener('click', showShare);
    
    const btnShareMobile = document.getElementById('btn-share-mobile');
    if(btnShareMobile) btnShareMobile.addEventListener('click', showShare);

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
                    if(value) {
                        if (['linkedinId', 'githubId', 'instagramId'].includes(key)) {
                            let cleaned = value.split('?')[0].replace(/\/$/, '');
                            if (cleaned.includes('/')) {
                                cleaned = cleaned.split('/').pop();
                            }
                            if (cleaned.startsWith('@')) {
                                cleaned = cleaned.substring(1);
                            }
                            payload[key] = cleaned;
                        } else {
                            payload[key] = value;
                        }
                    }
                }
            }

            
            if (payload.userType === 'student') {
                payload.workCompany = "";
                payload.workDesignation = "";
                delete payload.workCompany;
                delete payload.workDesignation;
            } else if (payload.userType === 'professional') {
                payload.collegeName = "";
                delete payload.collegeName;
            }

            if(payload.name) await apiCall('/users/profile/basic', 'PUT', { name: payload.name });
            const res = await apiCall('/users/profile/extended', 'PUT', payload);

            btn.innerText = originalText;
            btn.disabled = false;

            if (res.success) {
                Modal.alert('Success', 'Profile updated successfully.', 'success');
                setTimeout(() => window.location.reload(), 1000); 
            } else {
                Modal.alert('Error', res.error, 'error');
            }
        });
    }

    // NEW: Render Authorized Apps
    const renderAuthorizedApps = async () => {
        const container = document.getElementById('authorized-apps-container');
        if (!container) return;

        container.innerHTML = '<p class="font-mono text-sm bg-canvas border-2 border-ink p-4 text-center animate-pulse">Fetching authorization data...</p>';

        try {
            const response = await getActiveServices();
            if (!response.success) throw new Error(response.error);

            const services = response.data.activeServices;

            if (!services || services.length === 0) {
                container.innerHTML = '<p class="font-mono text-sm bg-canvas border-2 border-ink p-4">You have not authorized any third-party apps.</p>';
                return;
            }

            container.innerHTML = services.map(service => `
                <div class="app-item flex flex-col sm:flex-row justify-between items-start sm:items-center bg-canvas border-2 border-ink p-4" id="app-${service.clientId}">
                    <div class="mb-4 sm:mb-0">
                        <strong class="block font-mono font-bold uppercase text-ink text-lg">${service.name}</strong>
                        <span class="font-mono text-xs text-gray-600 uppercase border-b-2 border-gray-400 pb-1">${service.url}</span>
                    </div>
                    <button class="revoke-btn w-full sm:w-auto font-mono uppercase text-xs font-bold bg-danger text-white border-2 border-ink px-4 py-2 hover:bg-ink hover:text-danger transition-colors duration-0 shadow-[2px_2px_0_0_#0b0b0b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" data-client="${service.clientId}">
                        Revoke
                    </button>
                </div>
            `).join('');

            // Attach event listeners to the new revoke buttons
            document.querySelectorAll('.revoke-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const clientId = e.target.getAttribute('data-client');
                    const confirmed = await Modal.confirm('Revoke Access?', 'Are you sure you want to revoke access? You will need to authorize again on that website.', 'Revoke', true);
                    
                    if (confirmed) {
                        const res = await revokeAccess(clientId);
                        if (res.success) {
                            document.getElementById(`app-${clientId}`).remove();
                            Modal.alert('Success', 'Access revoked successfully.', 'success');
                            
                            // Check if the container is now empty
                            if (document.querySelectorAll('.app-item').length === 0) {
                                container.innerHTML = '<p class="font-mono text-sm bg-canvas border-2 border-ink p-4">You have not authorized any third-party apps.</p>';
                            }
                        } else {
                            Modal.alert('Error', res.error || 'Failed to revoke access.', 'error');
                        }
                    }
                });
            });

        } catch (error) {
            container.innerHTML = '<p class="font-mono text-sm text-white bg-danger border-2 border-ink p-4">Error loading applications.</p>';
            console.error(error);
        }
    };

    // Call the function to load the apps when the dashboard mounts
    renderAuthorizedApps();

    const handleLogout = async () => {
        await apiCall('/logout', 'POST', {action: 'terminate_session'});
        navigate('/login');
    };

    ['btn-logout-desktop', 'btn-logout-mobile'].forEach(id => {
        const btn = document.getElementById(id);
        if(btn) btn.addEventListener('click', handleLogout);
    });

    const deleteBtn = document.getElementById('btn-delete-acc');
    if(deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            const confirmed = await Modal.confirm('Delete Account?', 'This will permanently delete your account and all associated data. This cannot be undone.', 'Delete', true);
            if(confirmed) {
                const res = await apiCall('/users/account', 'DELETE');
                if(res.success) navigate('/login');
                else Modal.alert('Error', res.error, 'error');
            }
        });
    }
}
