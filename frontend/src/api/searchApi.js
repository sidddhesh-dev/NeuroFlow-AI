import { BASE_URL, authenticatedFetch } from "./authApi";

export async function searchWorkspace(query) {
    const response = await authenticatedFetch(
        `${BASE_URL}/workspace/search/?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}