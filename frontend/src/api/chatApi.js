const BASE_URL = "http://127.0.0.1:8000";

export async function createChatSession() {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/chat-sessions/`,
        {
            method: "POST",
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