const BASE_URL = "http://127.0.0.1:8000";

export async function getDocuments() {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(`${BASE_URL}/workspace/documents/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}