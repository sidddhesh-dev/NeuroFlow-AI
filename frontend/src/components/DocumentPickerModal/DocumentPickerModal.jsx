import "./DocumentPickerModal.css";

function DocumentPickerModal({

    isOpen,

    documents,

    onClose,

    onSelect,

}) {

    if (!isOpen) return null;

    return (

        <div className="document-modal-overlay">

            <div className="document-modal">

                <div className="document-modal-header">

                    <h2>Choose Document</h2>

                    <button
                        className="close-modal-button"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="document-list">

                    {documents.length === 0 ? (

                        <div className="empty-document-list">

                            <h3>No documents uploaded</h3>

                            <p>
                                Upload your first document to begin chatting.
                            </p>

                        </div>

                    ) : (

                        documents.map((document) => (

                            <button
                                key={document.id}
                                className="document-list-item"
                                onClick={() => onSelect(document)}
                            >

                                <div className="document-list-icon">
                                    DOC
                                </div>

                                <div className="document-list-info">

                                    <h3>{document.filename}</h3>

                                    <p>

                                        {document.filetype.toUpperCase()} • {document.filesize}

                                    </p>

                                </div>

                            </button>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default DocumentPickerModal;