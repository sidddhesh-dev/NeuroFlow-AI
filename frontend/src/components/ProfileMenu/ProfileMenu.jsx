import "./ProfileMenu.css";
import { useAuth } from "../../context/UseAuth";

import { useEffect, useRef } from "react";
import {
    User,
    Shield,
    CircleHelp,
    LogOut,
} from "lucide-react";

function ProfileMenu({ open, onClose }) {

    const menuRef = useRef(null);
    const { user, logout } = useAuth();

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                onClose();
            }

        }

        function handleEscape(event) {

            if (event.key === "Escape") {
                onClose();
            }

        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);

        };

    }, [onClose]);

    if (!open) return null;

    return (

        <div
            className="profile-menu"
            ref={menuRef}
        >

            <div className="profile-menu-header">

                <div className="menu-avatar">
                    S
                </div>

                <div className="menu-user">

                    <h4>{user?.username}</h4>
                    <span>{user?.email}</span>

                </div>

            </div>

            <div className="profile-divider" />

            <button className="profile-menu-item">

                <User size={18} />

                <span>My Profile</span>

            </button>

            <button className="profile-menu-item">

                <Shield size={18} />

                <span>Account & Security</span>

            </button>

            <button className="profile-menu-item">

                <CircleHelp size={18} />

                <span>Help & Feedback</span>

            </button>

            <div className="profile-divider" />

            <button className="profile-menu-item logout" onClick={logout}>
                <LogOut size={18} />
                <span>Logout</span>
            </button>

        </div>

    );

}

export default ProfileMenu;