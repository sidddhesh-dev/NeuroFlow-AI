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
    Pin
} from "lucide-react";

function RightSidebar({
    document,
    history,
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
        documentTypes[extension] ??
        "Document";

    function handleRename(chat) {
        if (!onRenameChat) return;
        onRenameChat(chat);
    }

    function handlePin(chat) {
        if (!onPinChat) return;
        onPinChat(chat);
    }
    function handleDelete(chat) {
        if (!onDeleteChat) return;
        onDeleteChat(chat);
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

                    <button
                        className="chat-item"
                        disabled
                    >
                        <div className="chat-item-content">
                            <h3>Loading...</h3>
                        </div>
                    </button>

                ) : error ? (

                    <button
                        className="chat-item"
                        disabled
                    >
                        <div className="chat-item-content">
                            <h3>Failed to load chats</h3>
                        </div>
                    </button>

                ) : history.length === 0 ? (

                    <button
                        className="chat-item"
                        disabled
                    >
                        <div className="chat-item-content">
                            <h3>No chats yet</h3>
                        </div>
                    </button>

                ) : (

                    history.map((chat) => (

                        <div
                            key={chat.id}
                            className={`chat-item-wrapper ${
                                currentSessionId === chat.id
                                    ? "chat-item-active"
                                    : ""
                            }`}
                        >

                            <button
                                type="button"
                                className="chat-item"
                                onClick={() => onSelectChat(chat.id)}
                            >

                                <div className="chat-item-content">

                                    <h3 className="chat-title">

                                        {chat.is_pinned && (
                                      
                                             <Pin size={11} className="chat-pin"/>
                                        )}

                                        <span className="chat-title-text">
                                      
                                            {chat.title || "Untitled Chat"}
                                      
                                        </span>
                                      
                                    </h3>

                                    <p>
                                        {chat.document_name ?? "No document"}
                                    </p>

                                </div>

                            </button>

                            <button
                                type="button"
                                className="chat-menu-button"
                                onClick={(event) => {

                                    event.stopPropagation();

                                    setOpenMenuId(
                                        openMenuId === chat.id
                                            ? null
                                            : chat.id
                                    );

                                }}
                            >
                                <MoreHorizontal size={16} />
                            </button>

                            {openMenuId === chat.id && (

                                <div className="chat-menu">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenMenuId(null);
                                            handleRename(chat);
                                        }}
                                    >
                                        Rename
                                    </button>

                                    <button type="button" onClick={() => {
                                        setOpenMenuId(null);
                                        handlePin(chat);
                                    }}>
                                        {chat.is_pinned
                                            ? "Unpin Chat"
                                            : "Pin Chat"}
                                    </button>

                                    <button
                                        type="button"
                                        className="danger"
                                        onClick={() => {
                                            setOpenMenuId(null);
                                            handleDelete(chat);
                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            )}

                        </div>

                    ))

                )}

            </div>

            

        </section>

    </aside>
);
}

export default RightSidebar;