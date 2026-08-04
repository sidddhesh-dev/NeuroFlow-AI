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


export async function getChatSessions() {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/chat-sessions/list/`,
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


export async function getChatSession(sessionId) {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/`,
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


export async function deleteChatSession(sessionId) {

    const accessToken = localStorage.getItem("access");

    const response = await fetch(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {

        const data = await response.json();

        throw data;
    }

    return true;
}