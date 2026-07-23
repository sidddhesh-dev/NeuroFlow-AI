import "./Topbar.css"

import { Search,Sun,Bell,ChevronDown } from "lucide-react";


function Topbar(){
    return (
        <header className="topbar">
            <div className="topbar-search">
                <Search  className="search-icon" />
                <input type="text" placeholder="search anything ..." />

                <span className="search-shortcut">Ctrl + K</span>
            </div>
            <div>
                <Sun type="button" className="theme-button" />

                <Bell type="button" className="notification-button" />

                <div className="topbar-profile">
                    <div className="profile-avatar">S</div>
                    <span>Siddhesh</span>
                    <ChevronDown className="profile-arrow" />
                </div>
                

            </div>

        </header>
    )
}
export default Topbar