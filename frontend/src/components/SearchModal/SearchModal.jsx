import "./SearchModal.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    MessageCircle,
    NotebookPen,
    Pin,
    Search,
    X,
} from "lucide-react";

import { useSearchQuery } from "../../hooks/useSearchQuery";

function SearchModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const { data, isLoading } = useSearchQuery(debouncedQuery);

    if (!isOpen) return null;

    function handleClose() {
        setQuery("");
        setDebouncedQuery("");
        onClose();
    }

    function openChat(chat) {
        navigate(`/chat/${chat.id}`);
        handleClose();
    }

    function openDocument(document) {
        navigate("/documents", {
            state: {
                documentId: document.id,
            },
        });
        handleClose();
    }

    function openNote() {
        navigate("/notes");
        handleClose();
    }

    const hasResults =
        data?.chats?.length > 0 ||
        data?.documents?.length > 0 ||
        data?.notes?.length > 0;

    return (
        <div className="search-overlay" onClick={handleClose}>
            <div
                className="search-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="search-header">
                    <Search size={18} />

                    <input
                        className="search-input"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search chats, documents, notes..."
                        autoFocus
                    />

                    <button
                        className="close-search"
                        onClick={handleClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="search-body">
                    {!query.trim() && (
                        <div className="search-placeholder">
                            Start typing to search your workspace.
                        </div>
                    )}

                    {isLoading && (
                        <div className="search-placeholder">
                            Searching...
                        </div>
                    )}

                    {data?.chats?.length > 0 && (
                        <section className="search-group">
                            <h4>Chats ({data.chats.length})</h4>

                            {data.chats.map((chat) => (
                                <button
                                    key={chat.id}
                                    className="search-item"
                                    onClick={() => openChat(chat)}
                                >
                                    <MessageCircle size={16} />

                                    <div className="search-item-content">
                                        <span className="search-title">
                                            {chat.title}
                                        </span>

                                        {chat.is_pinned && (
                                            <Pin
                                                size={12}
                                                className="search-pin"
                                            />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </section>
                    )}

                    {data?.documents?.length > 0 && (
                        <section className="search-group">
                            <h4>Documents ({data.documents.length})</h4>

                            {data.documents.map((document) => (
                                <button
                                    key={document.id}
                                    className="search-item"
                                    onClick={() => openDocument(document)}
                                >
                                    <FileText size={16} />

                                    <div className="search-item-content">
                                        <span className="search-title">
                                            {document.file_name}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </section>
                    )}

                    {data?.notes?.length > 0 && (
                        <section className="search-group">
                            <h4>Notes ({data.notes.length})</h4>

                            {data.notes.map((note) => (
                                <button
                                    key={note.id}
                                    className="search-item"
                                    onClick={openNote}
                                >
                                    <NotebookPen size={16} />

                                    <div className="search-item-content">
                                        <span className="search-title">
                                            {note.title}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </section>
                    )}

                    {!isLoading &&
                        query.trim() &&
                        data &&
                        !hasResults && (
                            <div className="search-placeholder">
                                No results found.
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;