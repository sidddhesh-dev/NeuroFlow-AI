import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getHistory() {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/history/`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Unable to load history.");
    return data;
}

export async function deleteHistoryItem(type, targetId) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/history/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, target_id: targetId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to delete history item.");
    return data;
}