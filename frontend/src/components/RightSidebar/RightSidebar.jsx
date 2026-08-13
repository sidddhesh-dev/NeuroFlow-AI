import "./RightSidebar.css";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
    FileSearch,
    MoreHorizontal,
    Pin,
} from "lucide-react";

function RightSidebar({
    document,
    history = [],
    currentSessionId,
    onSelectChat,
    isLoading,
    error,
    onRenameChat,
    onPinChat,
    onDeleteChat,
}) {
    const navigate = useNavigate();
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
    function handleClickOutside(event) {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target)
        ) {
            setOpenMenuId(null);
        }
    }

    window.document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () => {
        window.document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };
}, []);

    const hasDocument = Boolean(
        document?.documentId &&
        document?.documentName
    );

    const extension = hasDocument
        ? document.documentName
              .split(".")
              .pop()
              .toUpperCase()
        : "";

    const documentTypes = {
        PDF: "Portable Document",
        DOCX: "Microsoft Word Document",
        HTML: "HTML Document",
        TXT: "Text Document",
        MD: "Markdown Document",
        XLSX: "Excel Spreadsheet",
        CSV: "CSV File",
        PPTX: "PowerPoint Presentation",
    };

    const documentType =
        documentTypes[extension] ?? "Document";

    function handleRename(chat) {
        setOpenMenuId(null);
        onRenameChat?.(chat);
    }

    function handlePin(chat) {
        setOpenMenuId(null);
        onPinChat?.(chat);
    }

    function handleDelete(chat) {
        setOpenMenuId(null);
        onDeleteChat?.(chat);
    }

    function handleSelectChat(id) {
        setOpenMenuId(null);
        onSelectChat?.(Number(id));
    }

    return (
        <aside className="right-sidebar">
            <section className="context-section">
                <div className="section-header">
                    <h2>Current Context</h2>
                    <button
                        type="button"
                        className="change-document-button"
                        onClick={() => navigate("/documents")}
                    >
                        Browse
                    </button>
                </div>

                {hasDocument ? (
                    <div className="selected-context">
                        <div className="selected-context-icon">
                            {extension}
                        </div>

                        <div className="selected-context-content">
                            <h3 title={document.documentName}>
                                {document.documentName}
                            </h3>
                            <p>{documentType}</p>
                        </div>
                    </div>
                ) : (
                    <div className="empty-context">
                        <div className="empty-context-icon">
                            <FileSearch size={18} />
                        </div>

                        <div className="empty-context-content">
                            <h3>No document selected</h3>
                            <p className="empty-context-line">
                                Browse your documents to start chatting.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section className="chat-history-section">
                <div className="section-header">
                    <h2>Chat History</h2>

                    <button
                        type="button"
                        className="view-all-button"
                    >
                        View all
                    </button>
                </div>

                <div
                    className="chat-list"
                    ref={menuRef}
                >
                    {isLoading ? (
                        <div className="chat-list-state">
                            <h3>Loading chats...</h3>
                        </div>
                    ) : error ? (
                        <div className="chat-list-state">
                            <h3>Failed to load chats</h3>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="chat-list-state">
                            <h3>No chats yet</h3>
                        </div>
                    ) : (
                        history.map((chat) => {
                            const chatId = Number(chat.id);
                            const isActive =
                                Number(currentSessionId) === chatId;

                            return (
                                <div
                                    key={chatId}
                                    className={`chat-item-wrapper ${
                                        isActive
                                            ? "chat-item-active"
                                            : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className="chat-item"
                                        onClick={() =>
                                            handleSelectChat(chatId)
                                        }
                                    >
                                        <div className="chat-item-content">
                                            <h3 className="chat-title">
                                                {chat.is_pinned && (
                                                    <Pin
                                                        size={11}
                                                        className="chat-pin"
                                                    />
                                                )}

                                                <span className="chat-title-text">
                                                    {chat.title ||
                                                        "Untitled Chat"}
                                                </span>
                                            </h3>

                                            <p>
                                                {chat.document_name ||
                                                    "No document"}
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className="chat-menu-button"
                                        aria-label="Chat options"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenMenuId(
                                                openMenuId === chatId
                                                    ? null
                                                    : chatId
                                            );
                                        }}
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>

                                    {openMenuId === chatId && (
                                        <div className="chat-menu">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRename(chat)
                                                }
                                            >
                                                Rename
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePin(chat)
                                                }
                                            >
                                                {chat.is_pinned
                                                    ? "Unpin Chat"
                                                    : "Pin Chat"}
                                            </button>

                                            <button
                                                type="button"
                                                className="danger"
                                                onClick={() =>
                                                    handleDelete(chat)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </aside>
    );
}

export default RightSidebar;