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