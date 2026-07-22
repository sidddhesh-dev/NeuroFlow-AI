import "./Upload.css";

function UploadDocument() {
  return (
    <section className="upload-page">

      <div className="upload-header">
        <h1>Upload Document</h1>

        <p>
          Add documents to your knowledge base and use them as context for AI conversations.
        </p>
      </div>

      <div className="upload-content">

        <div className="upload-dropzone">

          <div className="upload-icon">
            ↑
          </div>

          <h2>Drop your document here</h2>

          <p>
            Drag and drop a file, or choose a document from your computer.
          </p>

          <button className="browse-button">
            Browse Files
          </button>

          <span className="supported-files">
            PDF · DOCX · TXT · MD · HTML · XLSX
          </span>

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