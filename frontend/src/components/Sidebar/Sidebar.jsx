import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Sidebar.css";

import { createChatSession } from "../../api/chatApi";
import SearchModal from "../SearchModal/SearchModal";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import SidebarModelCard from "../ModelCard/ModelCard";

import {
    BrainCircuit,
    SquarePen,
    Search,
    MessageSquare,
    Files,
    FileUp,
    NotebookPen,
    History,
    Settings,
} from "lucide-react";

import useAuth from "../../context/UseAuth";

function Sidebar() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    console.log(isProfileOpen);

    useEffect(() => {

        function handleKeyDown(event) {

            if (event.ctrlKey && event.key.toLowerCase() === "k") {

                event.preventDefault();

                setIsSearchOpen(true);

            }

            if (event.key === "Escape") {

                setIsSearchOpen(false);

            }

        }

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, []);

    async function handleNewChat() {

        try {

            const session = await createChatSession();

            navigate(`/chat/${session.id}`);

        } catch (error) {

            console.error(
                "Failed to create chat session:",
                error
            );

        }

    }

    return (

        <>

            <aside className="sidebar">

                <header className="sidebar-brand">

                    <BrainCircuit className="brand-logo" />

                    <h1 className="brand-name">
                        Neuro<span>Flow AI</span>
                    </h1>

                </header>

                <section className="sidebar-actions">

                    <button
                        className="new-chat-button"
                        onClick={handleNewChat}
                    >

                        <SquarePen size={15} />

                        <span>New Chat</span>

                    </button>

                    <button
                        className="search-button"
                        onClick={() => setIsSearchOpen(true)}
                    >

                        <Search size={15} />

                        <span>Search</span>
                        <div className="shortcut-key">CLTR + K</div>

                    </button>

                </section>

                <div className="sidebar-divider" />

                <nav className="sidebar-navigation">

                    <ul className="nav-list">

                        <li>

                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
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
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
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
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
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
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
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
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
                                }
                            >

                                <History className="nav-icon" />

                                <span>History</span>

                            </NavLink>

                        </li>

                        

                        <li>

                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-item nav-item-active"
                                        : "nav-item"
                                }
                            >

                                <Settings className="nav-icon" />

                                <span>Settings</span>

                            </NavLink>

                        </li>

                    </ul>

                </nav>

                <SidebarModelCard />

                <footer className="sidebar-footer">

                  <button
                      type="button"
                      className="user-profile"
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                  >
                  
                      <div className="user-avatar">
                          {user?.username?.charAt(0).toUpperCase()}
                      </div>

                      <div className="user-details">
                          <h2>{user?.username}</h2>
                          <p>{user?.email}</p>
                      </div>

                  </button>

                  <ProfileMenu
                      open={isProfileOpen}
                      onClose={() => setIsProfileOpen(false)}
                  />

              </footer>
            </aside>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

        </>

    );

}

export default Sidebar;