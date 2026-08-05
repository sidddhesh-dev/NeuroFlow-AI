import "./NotePage.css";
import { useState } from "react";

import { getNote } from "../../api/noteApi";

import { useNotesQuery } from "../../hooks/useNotesQuery";
import { useCreateNoteMutation } from "../../hooks/useCreateNoteMutation";
import { useUpdateNoteMutation } from "../../hooks/useNoteUpdateMutation";

function Notes() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const {
        data: notes = [],
        isLoading,
        error,
    } = useNotesQuery();

    const createNoteMutation = useCreateNoteMutation();
    const updateNoteMutation = useUpdateNoteMutation();

    async function handleNoteClick(id) {

        try {

            const note = await getNote(id);

            setSelectedNoteId(note.id);

            setTitle(note.title);

            setContent(note.content);

        } catch (error) {

            console.error("Failed to load note:", error);

        }

    }

    function handleSave() {

        if (!title.trim() && !content.trim()) {
            return;
        }

        const note = {
            title,
            content,
        };

        if (selectedNoteId) {

            updateNoteMutation.mutate({
                id: selectedNoteId,
                note,
            });

            return;

        }

        createNoteMutation.mutate(note, {

            onSuccess: (createdNote) => {

                setSelectedNoteId(createdNote.id);

            },

        });

    }

    function handleNewNote() {

        setSelectedNoteId(null);

        setTitle("");

        setContent("");

    }

    return (

        <section className="notes-page">

            <div className="note-editor">

                <div className="note-editor-header">

                    <input
                        className="note-title-input"
                        type="text"
                        placeholder="Untitled note"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <button
                        className="save-note-button"
                        onClick={handleSave}
                        disabled={
                            createNoteMutation.isPending ||
                            updateNoteMutation.isPending
                        }
                    >

                        {createNoteMutation.isPending ||
                        updateNoteMutation.isPending
                            ? "Saving..."
                            : selectedNoteId
                                ? "Update Note"
                                : "Save Note"}

                    </button>

                </div>

                <textarea
                    className="note-content-input"
                    placeholder="Start writing your note..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <div className="note-editor-footer">

                    <span>

                        {(createNoteMutation.isSuccess ||
                            updateNoteMutation.isSuccess)
                            ? "Saved successfully"
                            : selectedNoteId
                                ? "Editing note"
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

                    <button onClick={handleNewNote}>

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

                    {!isLoading &&
                        !error &&
                        notes.length === 0 && (

                            <p className="notes-message">

                                No notes found.

                            </p>

                        )}

                    {!isLoading &&
                        !error &&
                        notes.map((note) => (

                            <button
                                key={note.id}
                                className={`note-history-item ${
                                    selectedNoteId === note.id
                                        ? "note-history-item-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleNoteClick(note.id)
                                }
                            >

                                <span className="note-history-title">

                                    {note.title || "Untitled Note"}

                                </span>

                                <span className="note-created-at">

                                    {new Date(
                                        note.created_at
                                    ).toLocaleDateString()}

                                </span>

                            </button>

                        ))}

                </div>

            </aside>

        </section>

    );

}

export default Notes;