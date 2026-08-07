import "./GeneralSettings.css";

function GeneralSettings() {

    return (

        <section className="general-settings">

            <div className="settings-section-header">

                <h2>General</h2>

                <p>

                    Configure the basic preferences for your NeuroFlow AI workspace.

                </p>

            </div>

            <div className="settings-group">

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Default Landing Page</h3>

                        <p>

                            Choose which page opens automatically after you sign in.

                        </p>

                    </div>

                    <select className="setting-select">

                        <option>Chat</option>

                        <option>Documents</option>

                        <option>Notes</option>

                        <option>History</option>

                    </select>

                </div>

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Compact Interface</h3>

                        <p>

                            Reduce spacing throughout the application for a denser layout.

                        </p>

                    </div>

                    <button className="setting-toggle">

                        <span></span>

                    </button>

                </div>

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Confirm Before Delete</h3>

                        <p>

                            Display a confirmation dialog before deleting chats, notes or documents.

                        </p>

                    </div>

                    <button className="setting-toggle setting-toggle-active">

                        <span></span>

                    </button>

                </div>

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Animations</h3>

                        <p>

                            Enable smooth animations throughout the workspace.

                        </p>

                    </div>

                    <button className="setting-toggle setting-toggle-active">

                        <span></span>

                    </button>

                </div>

            </div>

        </section>

    );

}

export default GeneralSettings;