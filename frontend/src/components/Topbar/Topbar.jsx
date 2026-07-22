import "./Topbar.css"
import { NavLink } from "react-router-dom"

function Topbar(){
    return (
        <header className="topbar">
            <div className="topbar-search">
                <span  className="search-icon">🔍</span>
                <input type="text" placeholder="search anything ..." />

                <span className="search-shortcut">Ctrl + K</span>
            </div>
            <div>
                <button type="button" className="theme-button">☼</button>

                <button type="button" className="notification-button">♧</button>

                <NavLink to="/account" className="topbar-profile">
                    <div className="profile-avatar">S</div>
                    <span>Siddhesh</span>
                    <span className="profile-arrow">⌄</span>
                </NavLink>

            </div>

        </header>
    )
}
export default Topbar