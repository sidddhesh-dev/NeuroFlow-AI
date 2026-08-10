import { BASE_URL, authenticatedFetch } from "./authApi";

export async function getNotes(search = "") {
    const url = new URL(`${BASE_URL}/workspace/notes/`);
    if (search) url.searchParams.set("search", search);

    const response = await authenticatedFetch(url);
    const data = await response.json();
    if (!response.ok) 
        throw new Error(data.detail || "Failed to load notes.");
    return data;
}

export async function createNote(note) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/notes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    const data = await response.json();
    if (!response.ok) 
        throw new Error(data.detail || "Unable to create note.");
    return data;
}

export async function getNote(id) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/notes/${id}/`);
    const data = await response.json();
    if (!response.ok) 
        throw new Error(data.detail || "Failed to fetch note.");
    return data;
}

export async function updateNote(id, note) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/notes/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    const data = await response.json();
    if (!response.ok) 
        throw new Error(data.detail || "Unable to update note.");
    return data;
}

export async function deleteNote(id) {
    const response = await authenticatedFetch(`${BASE_URL}/workspace/notes/${id}/`, {
        method: "DELETE",
    });
    if (response.status === 204) return true;

    const data = await response.json();
    if (!response.ok) 
        throw new Error(data.detail || "Unable to delete note.");
    return true;
}