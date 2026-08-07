const BASE_URL = "http://127.0.0.1:8000";

import { getAccessToken } from "./authApi";

export async function getModelStatus() {
    const token = getAccessToken();
    const response = await fetch(
        `${BASE_URL}/workspace/model/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load model status."
        );
    }
    return data;
}