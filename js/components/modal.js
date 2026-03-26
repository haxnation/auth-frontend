// public/js/components/modal.js

export const Modal = {
    // Base Modal Container
    _createContainer(contentHtml) {
        const id = 'modal-' + Date.now();
        const el = document.createElement('div');
        el.id = id;
        el.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4 px-4 fade-in';
        el.innerHTML = `
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onclick="document.getElementById('${id}').remove()"></div>
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all scale-100 relative overflow-hidden">
                ${contentHtml}
            </div>
        `;
        document.body.appendChild(el);
        return {
            close: () => el.remove(),
            el: el
        };
    },

    // 1. Success / Error Alert
    alert(title, message, type = 'success') {
        return new Promise((resolve) => {
            const icon = type === 'success' 
                ? '<div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><i class="fas fa-check text-xl"></i></div>'
                : '<div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><i class="fas fa-exclamation text-xl"></i></div>';
            
            const html = `
                <div class="p-6 text-center">
                    ${icon}
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
                    <p class="text-gray-500 text-sm mb-6">${message}</p>
                    <button id="btn-ok" class="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                        Okay
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

    // 2. Confirmation Dialog
    confirm(title, message, confirmText = 'Confirm', isDestructive = false) {
        return new Promise((resolve) => {
            const btnClass = isDestructive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-black hover:bg-gray-800 text-white';

            const html = `
                <div class="p-6 text-center">
                    <div class="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-question text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
                    <p class="text-gray-500 text-sm mb-6">${message}</p>
                    <div class="flex space-x-3">
                        <button id="btn-cancel" class="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button id="btn-confirm" class="flex-1 ${btnClass} py-3 rounded-xl font-medium transition-colors">
                            ${confirmText}
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

    // 3. QR Code Modal (Special)
    showQR(user) {
        const profileUrl = `${window.location.origin}/u/${user.id}`;
        
        const html = `
            <div class="p-8 text-center bg-white relative">
                <button id="btn-close" class="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <i class="fas fa-times text-lg"></i>
                </button>
                
                <div class="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-1">${user.name}</h3>
                <p class="text-gray-500 text-xs mb-6 uppercase tracking-wider">Scan to connect</p>
                
                <div class="flex justify-center mb-6">
                    <div id="modal-qrcode" class="p-2 border border-gray-100 rounded-xl shadow-sm"></div>
                </div>

                <div class="flex gap-2">
                     <a href="${profileUrl}" target="_blank" class="flex-1 bg-gray-50 text-black py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                        View Page
                    </a>
                    <button id="btn-copy" class="flex-1 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                        Copy Link
                    </button>
                </div>
            </div>
        `;

        const modal = this._createContainer(html);
        
        // Render QR
        setTimeout(() => {
            const container = modal.el.querySelector("#modal-qrcode");
            if(container) {
                container.innerHTML = '';
                new QRCode(container, {
                    text: profileUrl,
                    width: 160,
                    height: 160,
                    colorDark : "#000000",
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
                btn.innerHTML = '<i class="fas fa-check mr-1"></i> Copied';
                setTimeout(() => btn.innerHTML = 'Copy Link', 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        };
    }
};