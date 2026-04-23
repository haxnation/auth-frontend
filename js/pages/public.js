import { apiCall } from '../api.js';

export async function renderPublicProfile(userId) {
    const res = await apiCall(`/users/${userId}/public`, 'GET');
    
    if (!res.success) {
        return `
            <div class="max-w-3xl lg:max-w-4xl mx-auto mt-20 bg-black text-[#ff2a2a] border-4 border-black p-6 md:p-12 text-center shadow-[4px_4px_0_0_#ff2a2a] md:shadow-[12px_12px_0_0_#ff2a2a] rounded-none">
                <img src="https://haxnation.org/images/logo.png" alt="HaxNation Logo" class="h-12 md:h-16 mx-auto mb-6 object-contain opacity-50">
                <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">Profile Not Found<span class="inline-block w-3 h-[1em] bg-[#ff2a2a] animate-pulse align-middle ml-1"></span></h2>
                <p class="font-mono text-sm">This user does not exist or their profile is private.</p>
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
        <div class="max-w-3xl lg:max-w-4xl mx-auto my-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] md:shadow-[12px_12px_0_0_#000] rounded-none">
            
            <div class="bg-black p-4 font-mono flex items-center justify-between uppercase font-bold text-[#5ce1e6] border-b-4 border-black text-xs">
                <span>Public Profile</span>
                <img src="https://haxnation.org/images/logo.png" alt="Logo" class="h-6 object-contain">
            </div>

            <div class="p-6 md:p-12 text-left bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]">
                
                <div class="flex items-center gap-6 mb-8">
                    <div class="w-24 h-24 bg-[#0b0b0b] text-[#5ce1e6] border-4 border-black shadow-[4px_4px_0_0_#5ce1e6] rounded-none flex items-center justify-center text-5xl font-bold flex-shrink-0">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-black">${user.name}</h1>
                        ${user.userType ? `
                            <span class="inline-block px-2 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest mt-4 shadow-[2px_2px_0_0_#5ce1e6]">
                                Role: ${user.userType}
                            </span>
                        ` : ''}
                    </div>
                </div>

                <div class="border-2 border-black bg-white shadow-[4px_4px_0_0_#000] mb-8">
                    <div class="bg-black text-white font-mono text-xs p-2 uppercase border-b-2 border-black">
                        Details
                    </div>
                    <div class="p-0 overflow-x-auto">
                        <table class="w-full border-collapse font-mono text-sm">
                            <tbody>
                                ${isStudent && user.collegeName ? `
                                    <tr class="border-b border-black hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">University</td>
                                        <td class="p-4">${user.collegeName}</td>
                                    </tr>
                                ` : ''}
                                
                                ${!isStudent && user.workDesignation ? `
                                    <tr class="border-b border-black hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">Job Title</td>
                                        <td class="p-4">${user.workDesignation}</td>
                                    </tr>
                                ` : ''}
                                
                                ${!isStudent && user.workCompany ? `
                                    <tr class="border-b border-black hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">Company</td>
                                        <td class="p-4">${user.workCompany}</td>
                                    </tr>
                                ` : ''}
                                
                                ${user.currentLocation ? `
                                    <tr class="border-b border-black hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">Location</td>
                                        <td class="p-4">${user.currentLocation}</td>
                                    </tr>
                                ` : ''}
                            </tbody>
                        </table>
                    </div>
                </div>

                ${(user.email || user.phoneNumber) ? `
                    <div class="border-2 border-black bg-white shadow-[4px_4px_0_0_#000] mb-8">
                        <div class="bg-black text-white font-mono text-xs p-2 uppercase border-b-2 border-black">
                            Contact Information
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse font-mono text-sm">
                                <tbody>
                                    ${user.email ? `
                                    <tr class="border-b border-black hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">Email</td>
                                        <td class="p-4"><span class="bg-black text-black hover:text-[#5ce1e6] selection:bg-[#ff2a2a] transition-none">${user.email}</span></td>
                                    </tr>
                                    ` : ''}
                                    ${user.phoneNumber ? `
                                    <tr class="hover:bg-black hover:text-[#5ce1e6] transition-colors duration-0">
                                        <td class="p-4 font-bold border-r border-black w-1/3">Phone</td>
                                        <td class="p-4">${user.phoneNumber}</td>
                                    </tr>
                                    ` : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ` : ''}

                ${socials.length > 0 ? `
                    <div class="flex flex-wrap gap-4 mt-8">
                        ${socials.map(s => `
                            <a href="${s.url}" target="_blank" 
                                class="flex items-center font-mono text-xs font-bold uppercase bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_#000] hover:bg-[#5ce1e6] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[0px_0px_0_0_#000] transition-all duration-0"
                                title="${s.label}">
                                <i class="${s.icon} mr-2 bg-black text-white p-1"></i> ${s.label}
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="p-6 text-center border-t-4 border-black bg-[#0b0b0b]">
                <a href="/" class="font-mono text-xs uppercase text-[#5ce1e6] hover:bg-[#5ce1e6] hover:text-black p-2 border-2 border-transparent hover:border-black transition-colors duration-0">
                    Create Your Own Profile
                </a>
            </div>
        </div>
    `;
}
