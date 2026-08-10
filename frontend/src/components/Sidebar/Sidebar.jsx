import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Sidebar.css";

import { createChatSession } from "../../api/chatApi";
import SearchModal from "../SearchModal/SearchModal";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import SidebarModelCard from "../ModelCard/ModelCard";
import SettingsModal from "../AccountMenu/SettingsModal";

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

import useAuth from "../../context/useAuth";

function Sidebar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("profile");

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

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    async function handleNewChat() {
        try {
            const session = await createChatSession();
            navigate(`/chat/${session.id}`);
        } catch (error) {
            console.error("Failed to create chat session:", error);
        }
    }

    function openSettings(section) {
        setActiveSection(section);
        setIsSettingsOpen(true);
        setIsProfileOpen(false);
    }

    const navigationItems = [
        { to: "/chat", label: "Chat", icon: MessageSquare },
        { to: "/documents", label: "Documents", icon: Files },
        { to: "/upload", label: "Upload Document", icon: FileUp },
        { to: "/notes", label: "Notes", icon: NotebookPen },
        { to: "/history", label: "History", icon: History },
        { to: "/settings", label: "Settings", icon: Settings },
    ];

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
                        type="button"
                        className="new-chat-button"
                        onClick={handleNewChat}
                    >
                        <SquarePen size={15} />
                        <span>New Chat</span>
                    </button>

                    <button
                        type="button"
                        className="search-button"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={15} />
                        <span>Search</span>
                        <div className="shortcut-key">CTRL + K</div>
                    </button>
                </section>

                <div className="sidebar-divider" />

                <nav className="sidebar-navigation">
                    <ul className="nav-list">
                        {navigationItems.map(({ to, label, icon: Icon }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "nav-item-active" : ""}`
                                    }
                                >
                                    <Icon className="nav-icon" />
                                    <span>{label}</span>
                                </NavLink>
                            </li>
                        ))}
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
                        openSettings={openSettings}
                    />

                    {isSettingsOpen && (
                        <SettingsModal
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                            onClose={() => setIsSettingsOpen(false)}
                        />
                    )}
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