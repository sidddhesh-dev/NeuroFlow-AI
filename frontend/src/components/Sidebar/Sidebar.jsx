import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  BrainCircuit,
  SquarePen,
  Search,
  MessageSquare,
  Files,
  FileUp,
  NotebookPen,
  History,
  Bot,
  Settings,
} from "lucide-react";

import useAuth from "../../context/UseAuth";

function Sidebar() {

  const { user } = useAuth();

  return (

    <aside className="sidebar">


      <header className="sidebar-brand">

        <BrainCircuit className="brand-logo" />

        <h1 className="brand-name">
          Neuro<span>Flow AI</span>
        </h1>

      </header>


      <section className="sidebar-actions">

        <button className="new-chat-button">

          <SquarePen size={15} />

          <span>New Chat</span>

        </button>

        <button className="search-button">
          <Search size={15} />
          <span>Search</span>
        </button>
      </section>

      <div className="sidebar-divider" />

      <nav className="sidebar-navigation">
        <ul className="nav-list">

          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <MessageSquare className="nav-icon" />
              <span>Chat</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <Files className="nav-icon" />
              <span>Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <FileUp className="nav-icon" />
              <span>Upload Document</span>
            </NavLink>
          </li>
          <li>

            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <NotebookPen className="nav-icon" />
              <span>Notes</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <History className="nav-icon" />
              <span>History</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/models"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <Bot className="nav-icon" />
              <span>AI Models</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-item nav-item-active" : "nav-item"
              }
            >
              <Settings className="nav-icon" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <button className="user-profile">
          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="user-details">
            <h2>
              {user?.username}
            </h2>
            <p>
              {user?.email}
            </p>
          </div>
        </button>
      </footer>
    </aside>
  );

}

export default Sidebar;