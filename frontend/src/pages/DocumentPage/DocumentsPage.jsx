import "./DocumentsPage.css";

function Documents() {
  return (
    <section className="documents-page">

      <div className="documents-header">
        <div>
          <h1>Documents</h1>
          <p>Manage the documents available to your NeuroFlow workspace.</p>
        </div>

        <button className="documents-upload-button">
          + Upload Document
        </button>
      </div>

      <div className="document-stats">

        <div className="document-stat-card">
          <span>Total Documents</span>
          <strong>12</strong>
        </div>

        <div className="document-stat-card">
          <span>Ready</span>
          <strong>9</strong>
        </div>

        <div className="document-stat-card">
          <span>Processing</span>
          <strong>2</strong>
        </div>

        <div className="document-stat-card">
          <span>Failed</span>
          <strong>1</strong>
        </div>

      </div>

      <div className="documents-toolbar">

        <div className="documents-search">
          <span>⌕</span>

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

        <div className="document-row">

          <div className="document-file-icon">
            PDF
          </div>

          <div className="document-info">
            <h3>AI Research Paper.pdf</h3>
            <p>PDF · 2.4 MB · Jul 22, 2026</p>
          </div>

          <span className="document-status status-ready">
            Ready
          </span>

          <button className="document-open-button">
            Open
          </button>

          <button className="document-menu-button">
            ⋮
          </button>

        </div>

        <div className="document-row">

          <div className="document-file-icon">
            DOC
          </div>

          <div className="document-info">
            <h3>Django Architecture.docx</h3>
            <p>DOCX · 840 KB · Jul 20, 2026</p>
          </div>

          <span className="document-status status-ready">
            Ready
          </span>

          <button className="document-open-button">
            Open
          </button>

          <button className="document-menu-button">
            ⋮
          </button>

        </div>

        <div className="document-row">

          <div className="document-file-icon">
            TXT
          </div>

          <div className="document-info">
            <h3>Backend Notes.txt</h3>
            <p>TXT · 126 KB · Jul 19, 2026</p>
          </div>

          <span className="document-status status-processing">
            Processing
          </span>

          <button className="document-open-button">
            Open
          </button>

          <button className="document-menu-button">
            ⋮
          </button>

        </div>

      </div>

    </section>
  );
}

export default Documents;