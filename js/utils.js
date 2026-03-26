// public/js/utils.js

// Simple date formatter
export function formatDate(isoString) {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString();
}

// Client-side validation helper (optional usage)
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Copy text to clipboard (useful for sharing profile links)
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}