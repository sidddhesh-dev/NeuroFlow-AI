const BASE_URL = "http://127.0.0.1:8000";

function getAccessToken() {

    return localStorage.getItem("access");

}

async function request(url, options = {}) {

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (response.status === 204) {
        return true;
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;

}

export async function createChatSession() {

    return request(
        `${BASE_URL}/workspace/chat-sessions/`,
        {
            method: "POST",
        }
    );

}

export async function getChatSessions() {

    return request(
        `${BASE_URL}/workspace/chat-sessions/list/`
    );

}

export async function getChatSession(sessionId) {

    return request(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/`
    );

}

export async function deleteChatSession(sessionId) {

    return request(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/`,
        {
            method: "DELETE",
        }
    );

}

export async function renameChatSession(sessionId, title) {

    return request(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/rename/`,
        {
            method: "PATCH",
            body: JSON.stringify({
                title,
            }),
        }
    );

}

export async function pinChatSession(sessionId) {

    return request(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/pin/`,
        {
            method: "PATCH",
        }
    );

}

export async function unpinChatSession(sessionId) {

    return request(
        `${BASE_URL}/workspace/chat-sessions/${sessionId}/unpin/`,
        {
            method: "PATCH",
        }
    );

}