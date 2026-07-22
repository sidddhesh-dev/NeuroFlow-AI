import "./NotePage.css";

function Notes() {
  return (
    <section className="notes-page">

      <div className="note-editor">

        <div className="note-editor-header">
          <input
            className="note-title-input"
            type="text"
            placeholder="Untitled note"
          />

          <button className="save-note-button">
            Save Note
          </button>
        </div>

        <textarea
          className="note-content-input"
          placeholder="Start writing your note..."
        />

        <div className="note-editor-footer">
          <span>Last edited just now</span>
          <span>0 words</span>
        </div>

      </div>

      <aside className="notes-history">

        <div className="notes-history-header">
          <div>
            <h2>Notes History</h2>
            <p>Your saved notes</p>
          </div>

          <button>+</button>
        </div>

        <div className="notes-history-search">
          <span>⌕</span>
          <input type="text" placeholder="Search notes..." />
        </div>

        <div className="notes-history-list">

          <button className="note-history-item note-history-active">
            <span className="note-history-title">
              Backend Architecture
            </span>

            <span className="note-created-at">
              Created Jul 22, 2026
            </span>
          </button>

          <button className="note-history-item">
            <span className="note-history-title">
              RAG Pipeline Notes
            </span>

            <span className="note-created-at">
              Created Jul 20, 2026
            </span>
          </button>

          <button className="note-history-item">
            <span className="note-history-title">
              React Learning
            </span>

            <span className="note-created-at">
              Created Jul 18, 2026
            </span>
          </button>

        </div>

      </aside>

    </section>
  );
}

export default Notes;