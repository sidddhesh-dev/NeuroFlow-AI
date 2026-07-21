import "./pages/NotePage/NotePage.css";

function NotesPage() {
  return (
    <div className="notes-page">

      <section className="notes-main">

        <div className="notes-empty-state">
          <h1>Write your thoughts.</h1>
          <p>Create a note, capture an idea, or save something for later.</p>
        </div>

        <div className="note-editor">

          <input
            type="text"
            className="note-title-input"
            placeholder="Note title..."
          />

          <textarea
            className="note-content-input"
            placeholder="Start writing..."
          />

          <div className="note-editor-footer">

            <span className="note-created-at">
              Created Jul 21, 2026 at 4:30 PM
            </span>

            <button
              type="button"
              className="save-note-button"
            >
              Save Note
            </button>

          </div>

        </div>

      </section>


      <aside className="notes-history-sidebar">

        <div className="notes-history-header">

          <h2>Note History</h2>

          <button
            type="button"
            className="view-all-notes"
          >
            View all
          </button>

        </div>


        <div className="notes-history-list">

          <button
            type="button"
            className="note-history-item note-history-item-active"
          >
            <div className="note-history-content">
              <span className="note-history-title">
                Understanding React Routing
              </span>

              <span className="note-history-date">
                4:30 PM
              </span>
            </div>

            <span className="note-history-menu">⋮</span>
          </button>


          <button
            type="button"
            className="note-history-item"
          >
            <div className="note-history-content">
              <span className="note-history-title">
                Django REST API Notes
              </span>

              <span className="note-history-date">
                2:15 PM
              </span>
            </div>
          </button>


          <button
            type="button"
            className="note-history-item"
          >
            <div className="note-history-content">
              <span className="note-history-title">
                NeuroFlow Architecture
              </span>

              <span className="note-history-date">
                Yesterday
              </span>
            </div>
          </button>


          <button
            type="button"
            className="note-history-item"
          >
            <div className="note-history-content">
              <span className="note-history-title">
                Redis and Celery
              </span>

              <span className="note-history-date">
                2 days ago
              </span>
            </div>
          </button>


          <button
            type="button"
            className="note-history-item"
          >
            <div className="note-history-content">
              <span className="note-history-title">
                RAG Pipeline Ideas
              </span>

              <span className="note-history-date">
                3 days ago
              </span>
            </div>
          </button>

        </div>


        <div className="notes-history-footer">

          <button
            type="button"
            className="new-note-button"
          >
            + New Note
          </button>

        </div>

      </aside>

    </div>
  );
}

export default NotesPage;