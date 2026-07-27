import "./Topbar.css";
import { Search, Sun, Bell } from "lucide-react";
import { useState } from "react";
import SearchModal from "../SearchModal/SearchModal";

function FloatingActions(){
    const [showSearch,setShowSearch]=useState(false);
    return (
    <>
        <div className="floating-header">

            <div className="floating-actions">

                <div className="header-icons">

                    <button
                        className="icon-button"
                        onClick={() => setShowSearch(true)}
                    >
                        <Search size={16} />
                    </button>

                    <button className="icon-button">
                        <Sun size={16} />
                    </button>

                    <button className="icon-button">
                        <Bell size={16} />
                    </button>

                </div>

                <div className="profile-container">

                    <div className="topbar-profile">

                        <div className="profile-avatar">
                            S
                        </div>

                        <span className="profile-name">
                            Siddhesh
                        </span>

                    </div>

                </div>

            </div>

        </div>

        <SearchModal
            isOpen={showSearch}
            onClose={() => setShowSearch(false)}
        />
    </>
);
}

export default FloatingActions;