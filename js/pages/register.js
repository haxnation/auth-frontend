import { apiCall } from '../api.js';
import { navigate } from '../app.js';
import { Modal } from '../components/modal.js';

export function renderRegister() {
    return `
    <div class="min-h-[80vh] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white border-4 border-[#0b0b0b] shadow-[12px_12px_0_0_#0b0b0b] p-8 rounded-none relative">
            
            <div class="absolute -top-4 -left-4 border-2 border-black bg-black text-white px-2 py-1 font-mono text-[10px] uppercase shadow-[2px_2px_0_0_#5ce1e6] flex items-center gap-2">
                <div class="w-2 h-2 bg-[#5ce1e6] animate-pulse rounded-none"></div>
                NEW_RECORD_GEN
            </div>

            <div class="text-left mb-8 mt-4 border-b-2 border-black pb-4">
                <h2 class="text-2xl font-bold uppercase tracking-tight">Create_Entity<span class="inline-block w-3 h-[1em] bg-[#5ce1e6] animate-pulse align-middle ml-1"></span></h2>
                <p class="font-mono text-xs uppercase tracking-widest text-gray-500 mt-2">Append user to registry</p>
            </div>
            
            <form id="register-form" class="space-y-6">
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-1 block text-black">> LEGAL_NAME</label>
                    <input type="text" name="name" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-1 block text-black">> COM_LINK [EMAIL]</label>
                    <input type="email" name="email" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                </div>
                <div>
                    <label class="font-mono text-xs font-bold uppercase mb-1 block text-black">> SECURE_KEY [PASSWORD]</label>
                    <input type="password" name="password" class="w-full border-2 border-black bg-[#fafafa] p-3 font-mono text-sm rounded-none focus:outline-none focus:ring-0 focus:border-[#5ce1e6] focus:bg-black focus:text-[#5ce1e6] transition-colors duration-0" required>
                    <p class="font-mono text-[10px] text-gray-500 mt-2 uppercase border-l-2 border-[#ff2a2a] pl-2">REQUIREMENTS: LEN>8, UPPER, INT, SYM</p>
                </div>
                <button type="submit" class="w-full font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                    INITIALIZE_RECORD
                </button>
            </form>
            
            <p class="mt-8 pt-6 border-t-2 border-black font-mono text-xs uppercase text-gray-500">
                RECORD_EXISTS? <a href="/login" class="nav-link font-bold text-black border-b-2 border-black hover:bg-[#5ce1e6] transition-colors duration-0 ml-1">EXECUTE_LOGIN</a>
            </p>
        </div>
    </div>
    `;
}

export function attachRegisterEvents() {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await apiCall('/register', 'POST', { name, email, password });
        
        if (res.success) {
            await Modal.alert('Data Written', 'Record created. Awaiting email protocol validation.');
            navigate('/login');
        } else {
            Modal.alert('Execution Failed', res.error, 'error');
        }
    });
}