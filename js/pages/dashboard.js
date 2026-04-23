import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderDashboard(user) {
    const isStudent = user.userType === 'student';

    return `
    <div class="min-h-screen bg-[#fafafa] pb-20 selection:bg-[#5ce1e6] selection:text-black">
        
        <nav class="sticky top-0 z-40 bg-[#0b0b0b] text-[#fafafa] border-b-4 border-black">
            <div class="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center font-mono">
                
                <div class="flex items-center space-x-4">
                    <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-8 object-contain">
                    <span class="font-bold text-xl uppercase tracking-widest hidden sm:block">Dashboard<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></span>
                </div>

                <div class="hidden md:flex items-center space-x-4">
                    ${renderNavLink('edit', 'Edit Profile', true)}
                    ${renderNavLink('settings', 'Settings')}
                    
                    <div class="h-6 w-1 bg-white mx-2 opacity-30"></div>
                    
                    <button id="btn-share-nav" class="font-mono uppercase text-[10px] font-bold bg-[#fafafa] text-black border-2 border-black px-4 py-2 hover:bg-[#5ce1e6] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-0">
                        <i class="fas fa-share-alt mr-2"></i> Share Profile
                    </button>

                    <button id="btn-logout-desktop" class="font-mono uppercase text-[10px] font-bold bg-[#ff2a2a] text-white border-2 border-transparent px-4 py-2 hover:border-white transition-all duration-0">
                        Log Out
                    </button>
                </div>

                <div class="flex items-center space-x-3 md:hidden">
                    <button id="btn-share-mobile" class="w-10 h-10 bg-[#fafafa] flex items-center justify-center text-black border-2 border-black hover:bg-[#5ce1e6]">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button id="btn-mobile-menu" class="w-10 h-10 border-2 border-[#fafafa] flex items-center justify-center text-[#fafafa] hover:bg-[#5ce1e6] hover:text-black transition-colors duration-0">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden border-t-4 border-white bg-black w-full absolute left-0 z-50">
                <div class="p-0 flex flex-col font-mono uppercase text-sm font-bold">
                    ${renderMobileLink('edit', 'Edit Profile', true)}
                    ${renderMobileLink('settings', 'Settings')}
                    <button id="btn-logout-mobile" class="w-full text-left px-6 py-4 bg-[#ff2a2a] text-white border-b-2 border-black hover:bg-black hover:text-[#ff2a2a] transition-colors duration-0">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>

        <div class="max-w-4xl mx-auto px-4 py-12">
            
            <div id="tab-edit" class="tab-content">
                
                <div class="flex flex-col md:flex-row gap-8 mb-12 border-4 border-black bg-white p-6 md:p-8 shadow-[4px_4px_0_0_#000] md:shadow-[12px_12px_0_0_#000] relative">
                    <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#5ce1e6]">
                        ACTIVE PROFILE
                    </div>
                    
                    <div class="w-32 h-32 bg-black text-[#5ce1e6] flex-shrink-0 flex items-center justify-center text-5xl font-bold border-4 border-black shadow-[4px_4px_0_0_#5ce1e6] rounded-none">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex flex-col justify-center">
                        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-black">${user.name}</h1>
                        <p class="font-mono text-sm uppercase tracking-widest bg-black text-white self-start px-2 py-1 mt-4">Email: ${user.email}</p>
                    </div>
                </div>

                <form id="update-form" class="space-y-12">
                    
                    <section class="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] relative">
                        <div class="bg-black text-[#5ce1e6] p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-black">
                            01. Basic Information
                        </div>
                        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            ${renderField('Full Name', 'name', user.name)}
                            ${renderField('Phone Number', 'phoneNumber', user.phoneNumber, user.profileVisibility?.phoneNumber, '+1 234 567 890')}
                        </div>
                    </section>

                    <section class="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] relative">
                        <div class="bg-black text-[#5ce1e6] p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-black">
                            02. Professional Details
                        </div>
                        <div class="p-6 md:p-8 space-y-6 md:space-y-8">
                            
                            <div class="group border-2 border-black p-4 bg-[#fafafa]">
                                <label class="block font-mono text-xs font-bold uppercase mb-2 text-black">Account Type</label>
                                <select name="userType" id="input-userType" class="w-full border-2 border-black bg-white p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0 appearance-none">
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

                    <section class="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] relative">
                        <div class="bg-black text-[#5ce1e6] p-4 font-mono font-bold uppercase tracking-widest border-b-4 border-black">
                            03. Social Profiles
                        </div>
                        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            ${renderField('LinkedIn Profile', 'linkedinId', user.linkedinId, user.profileVisibility?.linkedinId, 'username')}
                            ${renderField('GitHub Username', 'githubId', user.githubId, user.profileVisibility?.githubId, 'username')}
                            ${renderField('Instagram', 'instagramId', user.instagramId, user.profileVisibility?.instagramId, '@username')}
                            ${renderField('Personal Website', 'website', user.website, user.profileVisibility?.website, 'https://example.com')}
                        </div>
                    </section>

                    <div class="pt-4 flex justify-end">
                        <button type="submit" 
                            class="w-full md:w-auto font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_#000] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-75 text-lg">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div id="tab-settings" class="tab-content hidden pt-4">
                <div class="max-w-xl mx-auto border-4 border-[#ff2a2a] bg-black p-6 md:p-8 shadow-[4px_4px_0_0_#ff2a2a] md:shadow-[12px_12px_0_0_#ff2a2a]">
                    <h3 class="text-2xl font-bold text-[#ff2a2a] uppercase tracking-tight mb-4 border-b-2 border-[#ff2a2a] pb-2">Danger Zone<span class="inline-block w-3 h-[1em] bg-[#ff2a2a] animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-white mb-8 border-l-4 border-[#ff2a2a] pl-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <button id="btn-delete-acc" 
                        class="w-full font-mono uppercase tracking-widest font-bold bg-[#ff2a2a] text-white border-2 border-[#ff2a2a] px-6 py-4 hover:bg-black hover:text-[#ff2a2a] transition-colors duration-0 shadow-[4px_4px_0_0_#ff2a2a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
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
        ? 'bg-[#5ce1e6] text-black border-[#5ce1e6]' 
        : 'text-[#fafafa] hover:bg-[#fafafa] hover:text-black border-transparent';
    
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
        ? 'bg-[#5ce1e6] text-black' 
        : 'text-[#fafafa] hover:bg-[#fafafa] hover:text-black';
    return `
        <button onclick="window.handleTabSwitch(event, '${id}')" 
            class="nav-item nav-mobile-${id} w-full text-left px-6 py-4 border-b-2 border-black transition-colors duration-0 ${activeClass}"
            data-tab="${id}">
            ${label}
        </button>
    `;
}

function renderField(label, name, value = '', isVisible = false, placeholder = '') {
    const showToggle = name !== 'name';
    return `
        <div class="group border-2 border-black p-4 bg-[#fafafa]">
            <div class="flex items-start justify-between mb-2">
                <label class="block font-mono text-xs font-bold uppercase text-black">${label}</label>
                ${showToggle ? `
                <label class="flex items-center gap-2 font-mono text-[10px] text-black cursor-pointer uppercase border-2 border-black px-2 py-1 hover:bg-[#5ce1e6] transition-colors duration-0 select-none">
                    <input type="checkbox" name="vis_${name}" ${isVisible ? 'checked' : ''} 
                        class="appearance-none w-3 h-3 border-2 border-black bg-white checked:bg-black focus:outline-none focus:ring-0">
                    Make Public
                </label>
                ` : ''}
            </div>
            <input type="text" name="${name}" value="${value || ''}" placeholder="${placeholder}"
                class="w-full border-2 border-black bg-white p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0 placeholder-gray-400">
        </div>
    `;
}

window.handleTabSwitch = (event, tabName) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    document.querySelectorAll('.nav-desktop-edit, .nav-desktop-settings').forEach(el => {
        el.classList.remove('bg-[#5ce1e6]', 'text-black', 'border-[#5ce1e6]');
        el.classList.add('text-[#fafafa]', 'border-transparent');
    });

    const deskBtn = document.querySelector(`.nav-desktop-${tabName}`);
    if(deskBtn) {
        deskBtn.classList.remove('text-[#fafafa]', 'border-transparent');
        deskBtn.classList.add('bg-[#5ce1e6]', 'text-black', 'border-[#5ce1e6]');
    }

    document.querySelectorAll('.nav-mobile-edit, .nav-mobile-settings').forEach(el => {
        el.classList.remove('bg-[#5ce1e6]', 'text-black');
        el.classList.add('text-[#fafafa]');
    });

    const mobileBtn = document.querySelector(`.nav-mobile-${tabName}`);
    if(mobileBtn) {
        mobileBtn.classList.remove('text-[#fafafa]');
        mobileBtn.classList.add('bg-[#5ce1e6]', 'text-black');
    }

    document.getElementById('mobile-menu').classList.add('hidden');
};

export function attachDashboardEvents(user) {
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
                    if(value) payload[key] = value;
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
