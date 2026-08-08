const BASE_URL = "http://127.0.0.1:8000";

import { getAccessToken } from "./authApi";

export async function getSettings() {

    const token = getAccessToken();

    const response = await fetch(
        `${BASE_URL}/accounts/settings/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load settings."
        );
    }

    return data;
}

export async function updateSettings(settings) {

    const token = getAccessToken();

    const response = await fetch(
        `${BASE_URL}/accounts/settings/`,
        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(settings),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to update settings."
        );
    }

    return data;
}