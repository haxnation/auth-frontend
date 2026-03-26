import { apiCall } from '../api.js';

export async function renderPublicProfile(userId) {
    const res = await apiCall(`/users/${userId}/public`, 'GET');
    
    if (!res.success) {
        return `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <i class="fas fa-user-slash text-4xl text-gray-300 mb-4"></i>
                <h2 class="text-xl font-semibold mb-2">User not found</h2>
                <p class="text-gray-500">This profile doesn't exist or has been removed.</p>
            </div>
        `;
    }

    const user = res.data;
    const isStudent = user.userType === 'student';

    let socials = [];
    if (user.linkedinId) socials.push({ icon: 'fab fa-linkedin-in', url: `https://linkedin.com/in/${user.linkedinId}`, label: 'LinkedIn' });
    if (user.githubId) socials.push({ icon: 'fab fa-github', url: `https://github.com/${user.githubId}`, label: 'GitHub' });
    if (user.instagramId) socials.push({ icon: 'fab fa-instagram', url: `https://instagram.com/${user.instagramId}`, label: 'Instagram' });
    if (user.website) socials.push({ icon: 'fas fa-globe', url: user.website, label: 'Website' });

    return `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
            <div class="p-12 text-center">
                <div class="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-semibold mx-auto mb-4">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                
                <h1 class="text-2xl font-semibold mb-2">${user.name}</h1>
                
                ${user.userType ? `
                    <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase tracking-wide">
                        ${user.userType}
                    </span>
                ` : ''}
            </div>

            <div class="px-12 pb-6 space-y-3 text-center">
                ${isStudent && user.collegeName ? `
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-graduation-cap mr-2 w-5"></i>
                        Student at <span class="font-medium text-gray-900">${user.collegeName}</span>
                    </p>
                ` : ''}
                
                ${!isStudent && user.workDesignation ? `
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-briefcase mr-2 w-5"></i>
                        ${user.workDesignation}
                    </p>
                ` : ''}
                
                ${!isStudent && user.workCompany ? `
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-building mr-2 w-5"></i>
                        <span class="font-medium text-gray-900">${user.workCompany}</span>
                    </p>
                ` : ''}
                
                ${user.currentLocation ? `
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-map-marker-alt mr-2 w-5"></i>
                        ${user.currentLocation}
                    </p>
                ` : ''}
            </div>

            ${(user.email || user.phoneNumber) ? `
                <div class="px-12 pb-6 border-t border-gray-100 pt-6 space-y-3 text-center">
                    ${user.email ? `
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-envelope mr-2 w-5"></i>
                            ${user.email}
                        </p>
                    ` : ''}
                    ${user.phoneNumber ? `
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-phone mr-2 w-5"></i>
                            ${user.phoneNumber}
                        </p>
                    ` : ''}
                </div>
            ` : ''}

            ${socials.length > 0 ? `
                <div class="px-12 pb-12 border-t border-gray-100 pt-6">
                    <div class="flex justify-center gap-3">
                        ${socials.map(s => `
                            <a href="${s.url}" target="_blank" 
                                class="social-btn w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-black hover:text-black hover:bg-gray-50"
                                title="${s.label}">
                                <i class="${s.icon}"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="px-12 pb-8 text-center border-t border-gray-100 pt-6">
                <a href="/" class="text-sm font-medium text-black hover:underline">
                    Join HaxNation
                </a>
            </div>
        </div>
    `;
}