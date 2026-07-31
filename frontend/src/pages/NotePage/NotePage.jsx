import "./NotePage.css";
import { useState } from "react";
import { useNotesQuery } from "../../hooks/useNotesQuery";
import { useCreateNoteMutation } from "../../hooks/useCreateNoteMutation";
import { getNote } from "../../api/noteApi";

function Notes() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { data: notes = [], isLoading, error } = useNotesQuery();

    const createNoteMutation = useCreateNoteMutation();

    const handleNoteClick = async (id) => {
        try {
            const note = await getNote(id);

            console.log("Loaded Note:", note);

            setTitle(note.title);
            setContent(note.content);

        } catch (error) {
            console.error("Failed to load note:", error);
        }
    };

    const handleSave = () => {

        if (!title.trim() && !content.trim()) {
            return;
        }

        createNoteMutation.mutate(
            {
                title,
                content,
            },
            {
                onSuccess: () => {
                    setTitle("");
                    setContent("");
                },
            }
        );
    };

    return (
        <section className="notes-page">

            <div className="note-editor">

                <div className="note-editor-header">

                    <input
                        className="note-title-input"
                        type="text"
                        placeholder="Untitled note"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        className="save-note-button"
                        onClick={handleSave}
                        disabled={createNoteMutation.isPending}
                    >
                        {createNoteMutation.isPending ? "Saving..." : "Save Note"}
                    </button>

                </div>

                <textarea
                    className="note-content-input"
                    placeholder="Start writing your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="note-editor-footer">

                    <span>
                        {createNoteMutation.isSuccess
                            ? "Saved successfully"
                            : "Ready"}
                    </span>

                    <span>
                        {content.trim()
                            ? content.trim().split(/\s+/).length
                            : 0} words
                    </span>

                </div>

            </div>

            <aside className="notes-history">

                <div className="notes-history-header">

                    <div>
                        <h2>Notes History</h2>
                        <p>Your saved notes</p>
                    </div>

                    <button
                        onClick={() => {
                            setTitle("");
                            setContent("");
                        }}
                    >
                        +
                    </button>

                </div>

                <div className="notes-history-list">

                    {isLoading && (
                        <p className="notes-message">
                            Loading notes...
                        </p>
                    )}

                    {error && (
                        <p className="notes-message">
                            Failed to load notes.
                        </p>
                    )}

                    {!isLoading && !error && notes.length === 0 && (
                        <p className="notes-message">
                            No notes found.
                        </p>
                    )}

                    {!isLoading && !error &&
                        notes.map((note) => (

                            <button
                                key={note.id}
                                className="note-history-item"
                                onClick={() => handleNoteClick(note.id)}
                            >

                                <span className="note-history-title">
                                    {note.title || "Untitled Note"}
                                </span>

                                <span className="note-created-at">
                                    {new Date(note.created_at).toLocaleDateString()}
                                </span>

                            </button>

                        ))}

                </div>

            </aside>

        </section>
    );
}

export default Notes;