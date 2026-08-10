import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getSettings() {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/settings/`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to load settings.");
    return data;
}

export async function updateSettings(settings) {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/settings/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to update settings.");
    return data;
}