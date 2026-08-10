import "./SettingsPage.css";
import { useState } from "react";

import SettingsNavigation from "../../components/Settings/SettingsNavigation/SettingsNavigation";
import GeneralSettings from "../../components/Settings/GeneralSettings/GeneralSettings";
import AISettings from "../../components/Settings/AiSettings/AiSettings";
import AboutSection from "../../components/Settings/AboutSection/AboutSection";

function Settings() {
    const [activeSection, setActiveSection] = useState("general");

    function renderSection() {
        switch (activeSection) {
            case "general":
                return <GeneralSettings />;
            case "ai":
                return <AISettings />;
            case "about":
                return <AboutSection />;
            default:
                return <GeneralSettings />;
        }
    }

    return (
        <section className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>
                    Configure your NeuroFlow AI workspace and preferences.
                </p>
            </div>

            <div className="settings-layout">
                <SettingsNavigation
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                <div className="settings-content">
                    {renderSection()}
                </div>
            </div>
        </section>
    );
}

export default Settings;