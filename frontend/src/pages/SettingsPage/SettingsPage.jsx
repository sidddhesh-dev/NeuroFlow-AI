import "./SettingsPage.css";

function Settings() {
  return (
    <section className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>

        <p>
          Configure your NeuroFlow workspace preferences.
        </p>
      </div>

      <div className="settings-layout">

        <nav className="settings-navigation">

          <button className="settings-nav-active">
            General
          </button>

          <button>
            Appearance
          </button>

          <button>
            AI Preferences
          </button>

          <button>
            Privacy
          </button>

          <button>
            Security
          </button>

        </nav>

        <div className="settings-content">

          <div className="settings-section">

            <div className="settings-section-heading">
              <h2>General</h2>
              <p>Configure basic application preferences.</p>
            </div>

            <div className="setting-row">
              <div>
                <h3>Language</h3>
                <p>Select your preferred application language.</p>
              </div>

              <button className="setting-select">
                English
                <span>⌄</span>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Compact Interface</h3>
                <p>Use reduced spacing across the application.</p>
              </div>

              <button className="setting-toggle">
                <span></span>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Conversation Memory</h3>
                <p>Allow NeuroFlow to use previous conversation context.</p>
              </div>

              <button className="setting-toggle setting-toggle-active">
                <span></span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Settings;