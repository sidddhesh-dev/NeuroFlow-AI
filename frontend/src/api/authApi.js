export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export async function getCurrentUser() {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/user/`);
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export function saveTokens(tokens) {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
}

export function clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
}

export function getAccessToken() {
    return localStorage.getItem("access");
}

export function getRefreshToken() {
    return localStorage.getItem("refresh");
}

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (!response.ok) throw data;

    localStorage.setItem("access", data.access);
    return data.access;
}

export async function authenticatedFetch(url, options = {}) {
    let accessToken = getAccessToken();

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 401) {
        try {
            accessToken = await refreshAccessToken();

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch {
            clearTokens();
            window.location.href = "/auth";
        }
    }

    return response;
}