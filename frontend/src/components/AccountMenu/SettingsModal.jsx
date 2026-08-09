import "./SettingsModal.css";

import { X, User, Shield, CircleHelp } from "lucide-react";

import Profile from "./Profile/Profile";
import AccountSecurity from "./AccountSecurity/AccountSecurity";
import HelpFeedback from "./HelpFeedback/HelpFeedback";

function SettingsModal({

    activeSection,

    setActiveSection,

    onClose,

}) {

    function renderContent() {

        switch (activeSection) {

            case "profile":

                return <Profile />;

            case "security":

                return <AccountSecurity />;

            case "help":

                return <HelpFeedback />;

            default:

                return <Profile />;

        }

    }

    return (

        <div
            className="settings-modal-overlay"
            onClick={onClose}
        >

            <div
                className="settings-modal"
                onClick={(event) => event.stopPropagation()}
            >

                <aside className="settings-sidebar">

                    <div className="settings-sidebar-header">

                        <button
                            className="settings-close-button"
                            onClick={onClose}
                        >

                            <X size={18} />

                        </button>

                        <h2>Settings</h2>

                    </div>

                    <button
                        className={`settings-nav-button ${
                            activeSection === "profile"
                                ? "settings-nav-active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveSection("profile")
                        }
                    >

                        <User size={17} />

                        My Profile

                    </button>

                    <button
                        className={`settings-nav-button ${
                            activeSection === "security"
                                ? "settings-nav-active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveSection("security")
                        }
                    >

                        <Shield size={17} />

                        Account & Security

                    </button>

                    <button
                        className={`settings-nav-button ${
                            activeSection === "help"
                                ? "settings-nav-active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveSection("help")
                        }
                    >

                        <CircleHelp size={17} />

                        Help & Feedback

                    </button>

                </aside>

                <section className="settings-modal-content">

                    {renderContent()}

                </section>

            </div>

        </div>

    );

}

export default SettingsModal;