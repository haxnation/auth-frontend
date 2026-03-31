// public/js/components/modal.js

export const Modal = {
    _createContainer(contentHtml) {
        const id = 'modal-' + Date.now();
        const el = document.createElement('div');
        el.id = id;
        el.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4 px-4';
        el.innerHTML = `
            <div class="fixed inset-0 bg-black/90 transition-none" onclick="document.getElementById('${id}').remove()"></div>
            <div class="bg-white border-4 border-[#0b0b0b] shadow-[12px_12px_0_0_#5ce1e6] p-0 max-w-md w-full rounded-none relative z-10">
                ${contentHtml}
            </div>
        `;
        document.body.appendChild(el);
        return {
            close: () => el.remove(),
            el: el
        };
    },

    alert(title, message, type = 'success') {
        return new Promise((resolve) => {
            const isError = type !== 'success';
            const accentColor = isError ? '#ff2a2a' : '#5ce1e6';
            const headerColor = isError ? 'bg-[#ff2a2a] text-white' : 'bg-black text-[#5ce1e6]';
            const icon = isError ? '<i class="fas fa-exclamation-triangle"></i>' : '<i class="fas fa-check-square"></i>';
            
            const html = `
                <div class="${headerColor} p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-black">
                    <span>SYSTEM_ALERT // ${type.toUpperCase()}</span>
                    <span>${icon}</span>
                </div>
                <div class="p-8 text-center bg-[#fafafa]">
                    <h3 class="text-2xl font-bold text-black uppercase tracking-tight mb-4">${title}<span class="inline-block w-3 h-[1em] bg-[${accentColor}] animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-black mb-8 p-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]">${message}</p>
                    <button id="btn-ok" class="w-full font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                        ACKNOWLEDGE
                    </button>
                </div>
            `;

            const modal = this._createContainer(html);
            modal.el.querySelector('#btn-ok').onclick = () => {
                modal.close();
                resolve();
            };
        });
    },

    confirm(title, message, confirmText = 'Confirm', isDestructive = false) {
        return new Promise((resolve) => {
            const btnClass = isDestructive 
                ? 'bg-[#ff2a2a] text-white' 
                : 'bg-[#5ce1e6] text-black';

            const html = `
                <div class="bg-black text-white p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-black">
                    <span>USER_OVERRIDE_REQUIRED</span>
                    <i class="fas fa-terminal"></i>
                </div>
                <div class="p-8 bg-[#fafafa]">
                    <h3 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-black pb-2 mb-4">${title}<span class="inline-block w-3 h-[1em] bg-black animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-black mb-8 p-4 border-2 border-black bg-white">${message}</p>
                    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button id="btn-cancel" class="flex-1 font-mono uppercase tracking-widest font-bold bg-white text-black border-2 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                            ABORT
                        </button>
                        <button id="btn-confirm" class="flex-1 font-mono uppercase tracking-widest font-bold ${btnClass} border-2 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                            ${confirmText.toUpperCase()}
                        </button>
                    </div>
                </div>
            `;

            const modal = this._createContainer(html);
            
            modal.el.querySelector('#btn-cancel').onclick = () => {
                modal.close();
                resolve(false);
            };
            
            modal.el.querySelector('#btn-confirm').onclick = () => {
                modal.close();
                resolve(true);
            };
        });
    },

    showQR(user) {
        const profileUrl = `${window.location.origin}/u/${user.id}`;
        
        const html = `
            <div class="bg-black text-[#5ce1e6] p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-black">
                <span>IDENTITY_EXCHANGE_PROTOCOL</span>
                <button id="btn-close" class="hover:text-white transition-colors duration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ce1e6]">
                    <i class="fas fa-times border-2 border-[#5ce1e6] p-1 bg-black"></i>
                </button>
            </div>
            <div class="p-8 text-center bg-[#fafafa]">
                <div class="w-16 h-16 bg-[#0b0b0b] border-2 border-black text-[#5ce1e6] shadow-[4px_4px_0_0_#5ce1e6] flex items-center justify-center mx-auto mb-6 text-3xl font-bold rounded-none">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                
                <h3 class="text-2xl font-bold text-black uppercase tracking-tight mb-2">${user.name}</h3>
                <p class="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-widest border-2 border-black bg-black text-white px-2 py-1 inline-block shadow-[2px_2px_0_0_#5ce1e6]">AWAITING_SCAN</p>
                
                <div class="flex justify-center mb-8">
                    <div class="border-4 border-black bg-white p-4 shadow-[8px_8px_0_0_#000]">
                        <div id="modal-qrcode"></div>
                    </div>
                </div>

                <div class="flex flex-col space-y-4">
                     <a href="${profileUrl}" target="_blank" class="w-full font-mono uppercase tracking-widest font-bold bg-white text-black border-2 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                        VIEW_DATA
                    </a>
                    <button id="btn-copy" class="w-full font-mono uppercase tracking-widest font-bold bg-[#5ce1e6] text-black border-2 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                        COPY_LINK
                    </button>
                </div>
            </div>
        `;

        const modal = this._createContainer(html);
        
        setTimeout(() => {
            const container = modal.el.querySelector("#modal-qrcode");
            if(container) {
                container.innerHTML = '';
                new QRCode(container, {
                    text: profileUrl,
                    width: 160,
                    height: 160,
                    colorDark : "#0b0b0b",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
        }, 10);

        modal.el.querySelector('#btn-close').onclick = () => modal.close();
        
        modal.el.querySelector('#btn-copy').onclick = async () => {
            try {
                await navigator.clipboard.writeText(profileUrl);
                const btn = modal.el.querySelector('#btn-copy');
                btn.innerHTML = 'DATA_COPIED';
                setTimeout(() => btn.innerHTML = 'COPY_LINK', 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        };
    }
};