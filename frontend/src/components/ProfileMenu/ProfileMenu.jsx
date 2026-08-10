import "./ProfileMenu.css";
import { useEffect, useRef } from "react";
import {
    CircleHelp,
    LogOut,
    Shield,
    User,
} from "lucide-react";

import useAuth from "../../context/useAuth";

function ProfileMenu({ open, onClose, openSettings }) {
    const menuRef = useRef(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") onClose();
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    if (!open) return null;

    function handleSettings(section) {
        openSettings(section);
        onClose();
    }

    function handleLogout() {
        onClose();
        logout();
    }

    return (
        <div className="profile-menu" ref={menuRef}>
            <div className="profile-menu-header">
                <div className="menu-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>

                <div className="menu-user">
                    <h4>{user?.username}</h4>
                    <span>{user?.email}</span>
                </div>
            </div>

            <div className="profile-divider" />

            <button
                className="profile-menu-item"
                onClick={() => handleSettings("profile")}
            >
                <User size={18} />
                <span>My Profile</span>
            </button>

            <button
                className="profile-menu-item"
                onClick={() => handleSettings("security")}
            >
                <Shield size={18} />
                <span>Account & Security</span>
            </button>

            <button
                className="profile-menu-item"
                onClick={() => handleSettings("help")}
            >
                <CircleHelp size={18} />
                <span>Help & Feedback</span>
            </button>

            <div className="profile-divider" />

            <button
                className="profile-menu-item logout"
                onClick={handleLogout}
            >
                <LogOut size={18} />
                <span>Logout</span>
            </button>
        </div>
    );
}

export default ProfileMenu;