import "./DocumentsPage.css";
import { useNavigate } from "react-router-dom";
import { useDocumentsQuery } from "../../hooks/useDocumentQuery";
import { useState } from "react";
import { useDeleteDocumentMutation } from "../../hooks/useDeleteDocumentMutation";
import { createChatSession } from "../../api/chatApi";

function Documents() {
    const navigate = useNavigate();

    const [openMenuId, setOpenMenuId] = useState(null);

    const deleteDocumentMutation = useDeleteDocumentMutation();

    const {
        data: documents = [],
        isLoading,
        error,
    } = useDocumentsQuery();
    const handleView = (document) => {
        setOpenMenuId(null);
        console.log("View:", document);
    };
    const handleDownload = (document) => {
        setOpenMenuId(null);
        console.log("Download:", document);
    };
    const handleDelete = (id) => {
    const confirmed = window.confirm(
        "Delete this document?"
    );
    if (!confirmed) return;
    deleteDocumentMutation.mutate(id);
    setOpenMenuId(null);
};
    if (isLoading) {
        return (
            <section className="documents-page">
                <div className="documents-loading">
                    <h2>Loading documents...</h2>
                </div>
            </section>
        );
    }
    if (error) {
        return (
            <section className="documents-page">
                <div className="documents-error">
                    <h2>{error.message || "Failed to load documents."}</h2>
                </div>
            </section>
        );
    }
    
    async function handleUseInChat(document) {
    try {
        const session = await createChatSession();
        navigate(`/chat/${session.id}`, {
            state: {
                documentId: document.id,
                documentName: document.file
                    ?.split("/")
                    .pop(),
            },
        });
    } catch (error) {
        console.error("Failed to create chat session", error);
    }
}
    const readyDocuments = documents.filter(
        (document) => document.status === "ready"
    ).length;
    const processingDocuments = documents.filter(
        (document) => document.status === "processing"
    ).length;
    const failedDocuments = documents.filter(
        (document) => document.status === "failed"
    ).length;

    return (
        <section className="documents-page">

            <div className="documents-header">

                <div className="documents-header-content">
                    <h1>Documents</h1>

                    <p>
                        Manage all documents available in your NeuroFlow workspace.
                    </p>
                </div>

                <button
                    className="documents-upload-button"
                    onClick={() => navigate("/upload")}
                >
                    + Upload Document
                </button>

            </div>

            <div className="document-stats">

                <div className="document-stat-card">
                    <span>Total Documents</span>
                    <strong>{documents.length}</strong>
                </div>

                <div className="document-stat-card">
                    <span>Ready</span>
                    <strong>{readyDocuments}</strong>
                </div>

                <div className="document-stat-card">
                    <span>Processing</span>
                    <strong>{processingDocuments}</strong>
                </div>

                <div className="document-stat-card">
                    <span>Failed</span>
                    <strong>{failedDocuments}</strong>
                </div>

            </div>

            <div className="documents-toolbar">

                <div className="documents-search">

                    <span className="documents-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search documents..."
                    />

                </div>

                <button className="documents-filter">
                    All Status
                    <span>⌄</span>
                </button>

            </div>

            <div className="documents-list">

                {documents.length === 0 ? (

                    <div className="documents-empty">

                        <h3>No documents uploaded</h3>

                        <p>
                            Upload your first document to begin using NeuroFlow AI.
                        </p>

                    </div>

                ) : (

                    documents.map((document) => (

                        <div
                            key={document.id}
                            className="document-row"
                        >

                            <div className="document-left">

                                <div className="document-file-icon">

                                    {document.file
                                        ?.split(".")
                                        .pop()
                                        ?.toUpperCase()}

                                </div>

                                <div className="document-info">

                                    <h3
                                        title={
                                            document.file
                                                ?.split("/")
                                                .pop()
                                        }
                                    >
                                        {document.file
                                            ?.split("/")
                                            .pop()}
                                    </h3>

                                    <p>
                                        {new Date(
                                            document.uploaded_at
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                            <div className="document-right">

                                <span
                                    className={`document-status status-${document.status}`}
                                >
                                    {document.status.replace("_", " ")}
                                </span>

                               <button
                                  className="document-open-button"
                                  onClick={() => handleUseInChat(document)}
                              >
                                  Use in Chat
                              </button>

                                <div className="document-menu">

                                    <button
                                        className="document-menu-button"
                                        onClick={() =>
                                            setOpenMenuId(
                                                openMenuId === document.id
                                                    ? null
                                                    : document.id
                                            )
                                        }
                                    >
                                        ⋮
                                    </button>

                                    {openMenuId === document.id && (

                                        <div className="document-dropdown">

                                            <button
                                                className="document-dropdown-item"
                                                onClick={() => handleView(document)}
                                            >
                                                👁 View Document
                                            </button>

                                            <button
                                                className="document-dropdown-item"
                                                onClick={() => handleDownload(document)}
                                            >
                                                ⬇ Download
                                            </button>

                                            <button
                                                className="document-dropdown-item danger"
                                                onClick={() => handleDelete(document.id)}
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </section>
    );
}

export default Documents;