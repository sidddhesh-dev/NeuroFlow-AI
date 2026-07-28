import "./NotificationMenu.css";

import { useEffect, useRef } from "react";
import {CheckCircle2,FileText,MessageSquare,} from "lucide-react";

function NotificationMenu({ open, onClose }) {
    const menuRef = useRef(null);
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
            className="notification-menu"
            ref={menuRef}
        >
            <div className="notification-header">
                <h3>Notifications</h3>
                <button>
                    Mark all as read
                </button>
            </div>
            <div className="notification-list">
                <div className="notification-item">
                    <div className="notification-icon success">
                        <CheckCircle2 size={18}/>
                    </div>
                    <div className="notification-content">
                        <h4>Document Ready</h4>
                        <p>
                            AI Development.pdf finished processing.
                        </p>
                        <span>2 min ago</span>
                    </div>

                </div>

                <div className="notification-item">

                    <div className="notification-icon">
                        <FileText size={18}/>
                    </div>

                    <div className="notification-content">

                        <h4>Document Uploaded</h4>

                        <p>
                            Python Notes.pdf uploaded successfully.
                        </p>

                        <span>15 min ago</span>

                    </div>

                </div>

                <div className="notification-item">

                    <div className="notification-icon">
                        <MessageSquare size={18}/>
                    </div>

                    <div className="notification-content">

                        <h4>New Conversation</h4>

                        <p>
                            NeuroFlow created a new chat session.
                        </p>

                        <span>Yesterday</span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default NotificationMenu;