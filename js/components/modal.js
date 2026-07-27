// public/js/components/modal.js

export const Modal = {
    _createContainer(contentHtml) {
        const id = 'modal-' + Date.now();
        const el = document.createElement('div');
        el.id = id;
        el.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4 px-4';
        el.innerHTML = `
            <div class="fixed inset-0 bg-ink/90 transition-none" onclick="document.getElementById('${id}').remove()"></div>
            <!-- FIX: Added max-h-[90vh] and overflow-y-auto to prevent button clipping -->
            <div role="dialog" aria-modal="true" tabindex="-1" class="bg-white border-4 border-ink shadow-[12px_12px_0_0_#0b0b0b] p-0 max-w-md w-full max-h-[90vh] overflow-y-auto rounded-none relative z-10 focus:outline-none">
                ${contentHtml}
            </div>
        `;
        document.body.appendChild(el);
        const closeFn = () => {
            el.remove();
            document.removeEventListener('keydown', escapeListener);
        };
        const escapeListener = (e) => {
            if (e.key === 'Escape') closeFn();
        };
        document.addEventListener('keydown', escapeListener);
        
        // Auto focus dialog to trap keyboard focus initially
        setTimeout(() => el.querySelector('[role="dialog"]')?.focus(), 10);

        return {
            close: closeFn,
            el: el
        };
    },

    alert(title, message, type = 'success') {
        return new Promise((resolve) => {
            const isError = type !== 'success';
            const accentColor = isError ? 'danger' : 'cyan';
            const headerColor = isError ? 'bg-danger text-white' : 'bg-ink text-cyan';
            const icon = isError ? '<i class="fas fa-exclamation-triangle"></i>' : '<i class="fas fa-check-square"></i>';
            
            const html = `
                <div class="${headerColor} p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-ink sticky top-0 z-20">
                    <span>SYSTEM_ALERT // ${type.toUpperCase()}</span>
                    <span>${icon}</span>
                </div>
                <div class="p-8 text-center bg-canvas">
                    <h3 class="text-2xl font-bold text-ink uppercase tracking-tight mb-4">${title}<span class="inline-block w-3 h-[1em] bg-[${accentColor}] animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-ink mb-8 p-4 border-2 border-ink bg-white shadow-[4px_4px_0_0_#0b0b0b]">${message}</p>
                    <button id="btn-ok" class="btn-primary w-full">
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
                ? 'bg-danger text-white' 
                : 'bg-cyan text-ink';

            const html = `
                <div class="bg-ink text-white p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-ink sticky top-0 z-20">
                    <span>USER_OVERRIDE_REQUIRED</span>
                    <i class="fas fa-terminal"></i>
                </div>
                <div class="p-8 bg-canvas">
                    <h3 class="text-2xl font-bold uppercase tracking-tight border-b-2 border-ink pb-2 mb-4">${title}<span class="inline-block w-3 h-[1em] bg-ink animate-pulse align-middle ml-1"></span></h3>
                    <p class="font-mono text-sm text-ink mb-8 p-4 border-2 border-ink bg-white">${message}</p>
                    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button id="btn-cancel" class="flex-1 font-mono uppercase tracking-widest font-bold bg-white text-ink border-2 border-ink px-6 py-3 shadow-[4px_4px_0_0_#0b0b0b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0b0b0b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                            ABORT
                        </button>
                        <button id="btn-confirm" class="flex-1 font-mono uppercase tracking-widest font-bold ${btnClass} border-2 border-ink px-6 py-3 shadow-[4px_4px_0_0_#0b0b0b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0b0b0b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
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
        
        // FIX: Tightened padding and margins slightly so it fits better without scrolling, but scrollbar is available if needed
        const html = `
            <div class="bg-ink text-cyan p-4 font-mono flex justify-between uppercase font-bold tracking-widest border-b-4 border-ink sticky top-0 z-20">
                <span>IDENTITY_EXCHANGE_PROTOCOL</span>
                <button id="btn-close" class="hover:text-white transition-colors duration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                    <i class="fas fa-times border-2 border-cyan p-1 bg-ink"></i>
                </button>
            </div>
            <div class="p-6 text-center bg-canvas">
                <div class="w-14 h-14 bg-ink border-2 border-ink text-cyan shadow-[4px_4px_0_0_#0b0b0b] flex items-center justify-center mx-auto mb-4 text-2xl font-bold rounded-none">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                
                <h3 class="text-2xl font-bold text-ink uppercase tracking-tight mb-1">${user.name}</h3>
                <p class="font-mono text-[10px] text-gray-500 mb-4 uppercase tracking-widest border-2 border-ink bg-ink text-white px-2 py-1 inline-block shadow-[2px_2px_0_0_#0b0b0b]">AWAITING_SCAN</p>
                
                <div class="flex justify-center mb-5">
                    <div class="border-4 border-ink bg-white p-4 shadow-[8px_8px_0_0_#0b0b0b]">
                        <div id="modal-qrcode"></div>
                    </div>
                </div>

                <div class="flex flex-col space-y-3">
                     <a href="${profileUrl}" target="_blank" class="w-full font-mono uppercase tracking-widest font-bold bg-white text-ink border-2 border-ink px-6 py-3 shadow-[4px_4px_0_0_#0b0b0b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0b0b0b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75">
                        VIEW_DATA
                    </a>
                    <button id="btn-copy" class="btn-primary w-full">
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
                    colorDark : "#0b0b0b",  // FIX: Replaced custom Tailwind class "ink" with valid hex #0b0b0b
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
