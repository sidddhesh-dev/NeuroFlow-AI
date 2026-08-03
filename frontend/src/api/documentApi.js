const BASE_URL = "http://127.0.0.1:8000";

export async function getDocuments() {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/documents/`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function uploadDocument(file) {

    const accessToken = localStorage.getItem("access");

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${BASE_URL}/workspace/documents/`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function deleteDocument(id) {
    const accessToken = localStorage.getItem("access");
    const response = await fetch(
        `${BASE_URL}/workspace/documents/${id}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function askQuestion(
    documentId,
    question,
    sessionId,
) {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/documents/${documentId}/ask/`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question,
                session_id: sessionId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}