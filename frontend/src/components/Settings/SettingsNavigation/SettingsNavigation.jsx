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

            <div className="settings-navigation-divider" />

            <button

                className={`settings-navigation-developer ${
                    activeSection === "developer"
                        ? "settings-navigation-item-active"
                        : ""
                }`}

                onClick={() =>
                    setActiveSection("developer")
                }

            >

                Developer Portfolio →

            </button>

        </aside>

    );

}

export default SettingsNavigation;