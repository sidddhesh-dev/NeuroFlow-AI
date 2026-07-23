import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  MessageSquare,FileUp,Files,History,NotebookPen,BrainCircuit,Ellipsis,ChevronDown } from "lucide-react";
function Sidebar() {
  return (
    <aside className="sidebar">

      <header className="sidebar-brand">
        <BrainCircuit className="brand-logo" />

        <h1 className="brand-name">
          Neuro<span>Flow AI</span>
        </h1>
      </header>

      <nav className="sidebar-navigation" aria-label="Main navigation">

        <ul className="nav-list">

          <li>
            <NavLink to="/chat" className="nav-item">
              <MessageSquare className="nav-icon" />
              <span>Chat</span>
            </NavLink >
          </li>

          <li>
            <NavLink to="/documents" className="nav-item">
              <Files className="nav-icon" />
              <span>Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/upload" className="nav-item">
              <FileUp className="nav-icon" />
              <span>Upload Document</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/history" className="nav-item">
              <History className="nav-icon" />
              <span>History</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notes" className="nav-item">
              <NotebookPen className="nav-icon" />
              <span>Notes</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-item">
            <Ellipsis className="nav-icon" />
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
            <ChevronDown className="model-arrow" />
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
        </NavLink>

       

      </footer>

    </aside>
  );
}

export default Sidebar;