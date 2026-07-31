const BASE_URL = "http://127.0.0.1:8000";

import { getAccessToken } from "./authApi";

export async function getNotes(search = "") {

    const token = getAccessToken();

    const url = new URL(`${BASE_URL}/workspace/notes/`);

    if (search) {
        url.searchParams.append("search", search);
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to load notes.");
    }

    return data;
}

export async function createNote(note) {

    const token = getAccessToken();

    const response = await fetch(
        `${BASE_URL}/workspace/notes/`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Unable to create note.");
    }

    return data;
}

export async function getNote(id) {
    const token = getAccessToken();

    const response = await fetch(
        `http://127.0.0.1:8000/workspace/notes/${id}/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch note");
    }

    return response.json();
}