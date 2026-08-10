import "./DocumentsPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createChatSession } from "../../api/chatApi";
import { useDeleteDocumentMutation } from "../../hooks/useDeleteDocumentMutation";
import { useDocumentsQuery } from "../../hooks/useDocumentQuery";

function Documents() {
    const navigate = useNavigate();
    const [openMenuId, setOpenMenuId] = useState(null);
    const deleteDocumentMutation = useDeleteDocumentMutation();

    const {
        data: documents = [],
        isLoading,
        error,
    } = useDocumentsQuery();

    async function handleUseInChat(document) {
        try {
            const session = await createChatSession();

            navigate(`/chat/${session.id}`, {
                state: {
                    documentId: document.id,
                    documentName: document.file?.split("/").pop(),
                },
            });
        } catch {
            window.alert("Failed to open document in chat.");
        }
    }

    function handleDelete(id) {
        if (!window.confirm("Delete this document?")) return;

        deleteDocumentMutation.mutate(id);
        setOpenMenuId(null);
    }

    if (isLoading) {
        return (
            <section className="documents-page">
                <div className="documents-empty">
                    <p>Loading documents...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="documents-page">
                <div className="documents-empty">
                    <p>{error.message || "Failed to load documents."}</p>
                </div>
            </section>
        );
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

            <div className="documents-list">
                {documents.length === 0 ? (
                    <div className="documents-empty">
                        <h3>No documents uploaded</h3>
                        <p>
                            Upload your first document to begin using NeuroFlow AI.
                        </p>
                    </div>
                ) : (
                    documents.map((document) => {
                        const fileName = document.file?.split("/").pop();
                        const fileType = fileName
                            ?.split(".")
                            .pop()
                            ?.toUpperCase();

                        return (
                            <div className="document-row" key={document.id}>
                                <div className="document-left">
                                    <div className="document-file-icon">
                                        {fileType}
                                    </div>

                                    <div className="document-info">
                                        <h3 title={fileName}>{fileName}</h3>

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
                                        disabled={document.status !== "ready"}
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
                                                    className="document-dropdown-item danger"
                                                    onClick={() =>
                                                        handleDelete(document.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default Documents;