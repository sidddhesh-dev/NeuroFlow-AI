import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getDocuments() {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/documents/`);
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export async function uploadDocument(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await authenticatedFetch(`${BASE_URL}/workspace/documents/`, {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export async function deleteDocument(id) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/documents/${id}/`, {
        method: "DELETE",
    });

    if (response.status === 204) return true;

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}

export async function askQuestion(documentId, question, sessionId) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/documents/${documentId}/ask/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, session_id: sessionId }),
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
}