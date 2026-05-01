// public/js/api.js

export const API_BASE = 'https://api.haxnation.org/auth/api'; // Update for Prod

export async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Important for cookies
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${API_BASE}${endpoint}`, options);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return { success: true, data };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// Fetch the list of active third-party apps
export const getActiveServices = async () => {
    return apiCall('/users/services', 'GET');
};

// Revoke access to a specific third-party app
export const revokeAccess = async (clientId) => {
    return apiCall(`/users/services/${clientId}`, 'DELETE');
};
