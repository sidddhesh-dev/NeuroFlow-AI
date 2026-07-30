import "./Upload.css";
import { useRef, useState } from "react";
import { uploadDocument } from "../../api/documentApi";
import { useNavigate } from "react-router-dom";

function UploadDocument() {

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");

    const handleBrowseClick = () => {

        fileInputRef.current.click();

    };

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (file) {

            handleUpload(file);

        }

    };

    const handleDrop = (event) => {

        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file) {

            handleUpload(file);

        }

    };

    const handleDragOver = (event) => {

        event.preventDefault();

    };

    const handleUpload = async (file) => {

        try {

            setUploading(true);

            setError("");

            await uploadDocument(file);

            navigate("/documents");

        }

        catch (error) {

            console.error(error);

            setError("Failed to upload document.");

        }

        finally {

            setUploading(false);

        }

    };

    return (

        <section className="upload-page">

            <div className="upload-header">

                <h1>Upload Document</h1>

                <p>
                    Add documents to your knowledge base and use them as context for AI conversations.
                </p>

            </div>

            <div className="upload-content">

                <div
                    className="upload-dropzone"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >

                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept=".pdf,.docx,.txt,.md,.html,.xlsx"
                        onChange={handleFileChange}
                    />

                    <div className="upload-icon">
                        ↑
                    </div>

                    <h2>
                        {uploading
                            ? "Uploading..."
                            : "Drop your document here"}
                    </h2>

                    <p>

                        {uploading
                            ? "Please wait while your document is uploaded."
                            : "Drag and drop a file, or choose a document from your computer."}

                    </p>

                    <button
                        className="browse-button"
                        onClick={handleBrowseClick}
                        disabled={uploading}
                    >

                        {uploading
                            ? "Uploading..."
                            : "Browse Files"}

                    </button>

                    <span className="supported-files">
                        PDF · DOCX · TXT · MD · HTML · XLSX
                    </span>

                    {

                        error &&

                        <p className="upload-error">

                            {error}

                        </p>

                    }

                </div>

                <div className="upload-information">

                    <h3>Document Processing</h3>

                    <div className="processing-step">

                        <span>01</span>

                        <div>

                            <h4>Upload</h4>

                            <p>Your document is securely uploaded.</p>

                        </div>

                    </div>

                    <div className="processing-step">

                        <span>02</span>

                        <div>

                            <h4>Process</h4>

                            <p>Text is extracted and divided into meaningful chunks.</p>

                        </div>

                    </div>

                    <div className="processing-step">

                        <span>03</span>

                        <div>

                            <h4>Index</h4>

                            <p>Embeddings are created for intelligent retrieval.</p>

                        </div>

                    </div>

                    <div className="processing-step">

                        <span>04</span>

                        <div>

                            <h4>Chat</h4>

                            <p>Your document becomes available as AI context.</p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default UploadDocument;