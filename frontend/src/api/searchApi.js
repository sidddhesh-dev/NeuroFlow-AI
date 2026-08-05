const BASE_URL = "http://127.0.0.1:8000";

export async function searchWorkspace(query) {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(

        `${BASE_URL}/workspace/search/?q=${encodeURIComponent(query)}`,

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