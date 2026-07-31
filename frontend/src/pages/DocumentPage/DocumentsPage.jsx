import "./DocumentsPage.css";
import { useNavigate } from "react-router-dom";
import { useDocumentsQuery } from "../../hooks/useDocumentQuery";

function Documents() {

    const navigate = useNavigate();

    const {
        data: documents = [],
        isLoading,
        error,
    } = useDocumentsQuery();

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

                {
                    documents.length === 0 ?

                        (
                            <div className="documents-empty">

                                <h3>No documents uploaded</h3>

                                <p>
                                    Upload your first document to begin using NeuroFlow AI.
                                </p>

                            </div>
                        )

                        :

                        (

                            documents.map((document) => (

                                <div
                                    key={document.id}
                                    className="document-row"
                                >

                                    <div className="document-left">

                                        <div className="document-file-icon">

                                            {
                                                document.file
                                                    ?.split(".")
                                                    .pop()
                                                    ?.toUpperCase()
                                            }

                                        </div>

                                        <div className="document-info">

                                            <h3
                                                title={
                                                    document.file
                                                        ?.split("/")
                                                        .pop()
                                                }
                                            >
                                                {
                                                    document.file
                                                        ?.split("/")
                                                        .pop()
                                                }
                                            </h3>

                                            <p>

                                                {
                                                    new Date(
                                                        document.uploaded_at
                                                    ).toLocaleDateString()
                                                }

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
                                        >
                                            Use in Chat
                                        </button>

                                        <button
                                            className="document-menu-button"
                                        >
                                            ⋮
                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

        </section>

    );

}

export default Documents;