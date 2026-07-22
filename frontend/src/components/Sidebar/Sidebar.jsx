import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <header className="sidebar-brand">
        <div className="brand-logo">
          🧠
        </div>

        <h1 className="brand-name">
          Neuro<span>Flow AI</span>
        </h1>
      </header>

      <nav className="sidebar-navigation" aria-label="Main navigation">

        <ul className="nav-list">

          <li>
            <NavLink to="/chat" className="nav-item">
              <span className="nav-icon">▣</span>
              <span>Chat</span>
            </NavLink >
          </li>

          <li>
            <NavLink to="/documents" className="nav-item">
              <span className="nav-icon">▤</span>
              <span>Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/upload" className="nav-item">
              <span className="nav-icon">⇧</span>
              <span>Upload Document</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/history" className="nav-item">
              <span className="nav-icon">◷</span>
              <span>History</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notes" className="nav-item">
              <span className="nav-icon">◇</span>
              <span>Notes</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-item">
            <span className="nav-icon">•••</span>
            <span>More</span>
            </NavLink>
          </li>

        </ul>

      </nav>


      <footer className="sidebar-footer">

        
        <NavLink to="/models" className="model-card">
          <p className="model-label">
            AI Model
          </p>

          <div className="model-header">
            <h2>Gemini</h2>
            <span className="model-arrow">⌄</span>
          </div>

          <div className="model-online">
            <span className="online-dot"></span>
            <span>Online</span>
          </div>
          </NavLink>
        
        <NavLink to="/developer" className="user-profile">
          <div className="user-avatar">
            S
          </div>

          <div className="user-details">
            <h2>Siddhesh</h2>
            <p>Developer</p>
          </div>

          <button
            className="settings-button"
            type="button"
            aria-label="Open settings"
          >
            ⚙
          </button>
        </NavLink>

       

      </footer>

    </aside>
  );
}

export default Sidebar;