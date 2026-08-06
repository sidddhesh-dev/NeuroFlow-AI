const BASE_URL = "http://127.0.0.1:8000";

import { getAccessToken } from "./authApi";

export async function getHistory() {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/workspace/history/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail || "Unable to load history."
        );
    }
    return data;
}

export async function deleteHistoryItem(type, targetId) {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/workspace/history/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type,
                target_id: targetId,
            }),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to delete history item."
        );
    }
    return data;
}