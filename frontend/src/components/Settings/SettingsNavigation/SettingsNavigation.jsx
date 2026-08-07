import "./SettingsNavigation.css";

function SettingsNavigation({
    activeSection,
    setActiveSection,
}) {

    const navigationItems = [
        {
            id: "general",
            label: "General",
        },
        {
            id: "ai",
            label: "AI",
        },
        {
            id: "about",
            label: "About NeuroFlow AI",
        },
        {
            id: "developer",
            label: "Developer",
        },
    ];

    return (

        <aside className="settings-navigation">

            <h3 className="settings-navigation-title">

                Categories

            </h3>

            {navigationItems.map((item) => (

                <button

                    key={item.id}

                    className={`settings-navigation-item ${
                        activeSection === item.id
                            ? "settings-navigation-item-active"
                            : ""
                    }`}

                    onClick={() =>
                        setActiveSection(item.id)
                    }

                >

                    {item.label}

                </button>

            ))}

        </aside>

    );

}

export default SettingsNavigation;