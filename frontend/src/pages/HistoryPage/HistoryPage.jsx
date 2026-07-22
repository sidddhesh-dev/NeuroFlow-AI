import "./HistoryPage.css";

function History() {
  return (
    <section className="history-page">

      <div className="history-header">

        <div>
          <h1>History</h1>
          <p>View and continue your previous AI conversations.</p>
        </div>

        <button className="clear-all-history">
          Clear History
        </button>

      </div>

      <div className="history-toolbar">

        <div className="history-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search conversations..."
          />
        </div>

        <button className="history-filter">
          All Conversations
          <span>⌄</span>
        </button>

      </div>

      <div className="history-date-group">

        <h2>Today</h2>

        <div className="history-card">
          <div className="history-card-main">
            <h3>Django REST API Architecture</h3>

            <p>
              Discussed API structure, serializers and service-layer architecture.
            </p>

            <span>12 messages · 4:32 PM</span>
          </div>

          <div className="history-card-actions">
            <button>Continue</button>
            <button>⋮</button>
          </div>
        </div>

        <div className="history-card">
          <div className="history-card-main">
            <h3>Understanding React Router</h3>

            <p>
              Nested routing, Outlet, NavLink and application layouts.
            </p>

            <span>18 messages · 1:18 PM</span>
          </div>

          <div className="history-card-actions">
            <button>Continue</button>
            <button>⋮</button>
          </div>
        </div>

      </div>

      <div className="history-date-group">

        <h2>Yesterday</h2>

        <div className="history-card">
          <div className="history-card-main">
            <h3>Document RAG Pipeline</h3>

            <p>
              Retrieval, context building and vector search discussion.
            </p>

            <span>24 messages · Jul 21</span>
          </div>

          <div className="history-card-actions">
            <button>Continue</button>
            <button>⋮</button>
          </div>
        </div>

      </div>

    </section>
  );
}

export default History;