import "./Topbar.css";
import useAuth from "../../context/UseAuth";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import SearchModal from "../SearchModal/SearchModal";
import NotificationMenu from "../NotificationMenu/NotificationMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

function Topbar() {

    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user } = useAuth();

    return (

        <>
            <header className="topbar">

                <div className="topbar-actions">

                    <button
                        className="topbar-icon"
                        onClick={(e) => {
                        e.currentTarget.blur();
                        setSearchOpen(true);
                    }}
                    >
                        <Search size={18}/>
                    </button>

                    <div className="menu-wrapper">

                        <button
                            className="topbar-icon"
                            onClick={() => {
                                setNotificationOpen(!notificationOpen);
                                setProfileOpen(false);
                            }}
                            aria-label="Notifications"
                        >
                            <Bell size={18}/>
                        </button>

                        <NotificationMenu
                            open={notificationOpen}
                            onClose={() => setNotificationOpen(false)}
                        />

                    </div>

                    <div className="menu-wrapper">

                        <button
                            className="profile-button"
                            onClick={() => {
                                setProfileOpen(!profileOpen);
                                setNotificationOpen(false);
                            }}
                        >
                            <div className="profile-avatar">
                            {user?.username?.charAt(0).toUpperCase()}
                            </div>

                            <span className="profile-name">
                                {user?.username}
                            </span>
                        </button>
                        
                        <ProfileMenu
                            open={profileOpen}
                            onClose={() => setProfileOpen(false)}
                        />

                    </div>

                </div>

            </header>

            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />

        </>

    );

}

export default Topbar;