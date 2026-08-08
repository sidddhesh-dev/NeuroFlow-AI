const BASE_URL = "http://127.0.0.1:8000";

import { getAccessToken } from "./authApi";

export async function getAccountSecurity() {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/accounts/account-security/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to load account information."
        );
    }
    return data;
}

export async function changePassword(passwordData) {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/accounts/change-password/`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(passwordData),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to change password."
        );
    }
    return data;
}

export async function deleteAccount(confirmation) {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/accounts/delete-account/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                confirmation,
            }),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to delete account."
        );}
    return data;
}