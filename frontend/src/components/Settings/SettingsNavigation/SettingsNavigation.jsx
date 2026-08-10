import "./SettingsNavigation.css";

import { useNavigate } from "react-router-dom";

function SettingsNavigation({ activeSection, setActiveSection }) {
    const navigate = useNavigate();

    const navigationItems = [
        { id: "general", label: "General" },
        { id: "ai", label: "AI" },
        { id: "about", label: "About NeuroFlow AI" },
    ];

    return (
        <aside className="settings-navigation">
            <h3 className="settings-navigation-title">Categories</h3>

            {navigationItems.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className={`settings-navigation-item ${activeSection === item.id ? "settings-navigation-item-active" : ""}`}
                    onClick={() => setActiveSection(item.id)}
                >
                    {item.label}
                </button>
            ))}

            <div className="settings-navigation-divider" />

            <button
                type="button"
                className="settings-navigation-developer"
                onClick={() => navigate("/developer")}
            >
                Developer Portfolio →
            </button>
        </aside>
    );
}

export default SettingsNavigation;