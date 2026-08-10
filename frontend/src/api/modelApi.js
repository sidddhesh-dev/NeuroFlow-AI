import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getModelStatus() {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/model/`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to load model status.");
    return data;
}