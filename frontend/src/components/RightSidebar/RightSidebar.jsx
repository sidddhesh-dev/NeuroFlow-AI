import "./RightSidebar.css";
import { useNavigate } from "react-router-dom";
import { FileSearch } from "lucide-react";

function RightSidebar({ document }) {

    const navigate = useNavigate();

    const extension = document?.documentName
        ?.split(".")
        .pop()
        ?.toUpperCase();

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
        extension
            ? (documentTypes[extension] || "Document")
            : "";

    return (

        <aside className="right-sidebar">

            <section className="context-section">

                <div className="section-header">

                    <h2>Current Context</h2>

                    <button
                        className="change-document-button"
                        onClick={() => navigate("/documents")}
                    >
                        Browse
                    </button>

                </div>

                {document ? (

                    <div className="selected-context">

                        <div className="selected-context-icon">
                                    
                            {extension}
                                    
                        </div>
                                    
                        <div className="selected-context-content">
                                    
                            <h3
                                title={document.documentName}
                            >
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

                <div className="chat-list">

                    <button
                        type="button"
                        className="chat-item chat-item-active"
                    >

                        <div className="chat-item-content">

                            <h3>No chats yet</h3>

                        </div>

                        <span className="chat-time">
                            —
                        </span>

                    </button>

                </div>

                <button
                    type="button"
                    className="clear-history-button"
                >
                    Clear History
                </button>

            </section>

        </aside>

    );

}

export default RightSidebar;