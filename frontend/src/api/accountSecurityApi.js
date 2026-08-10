import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getAccountSecurity() {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/account-security/`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to load account information.");
    }

    return data;
}

export async function changePassword(passwordData) {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/change-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to change password.");
    }

    return data;
}

export async function deleteAccount(confirmation) {
    const response = await authenticatedFetch(`${BASE_URL}/accounts/delete-account/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to delete account.");
    }

    return data;
}