import "./AISettings.css";

function AISettings() {

    return (

        <div className="ai-settings">

            <div className="settings-section-header">

                <h2>AI Preferences</h2>

                <p>
                    Configure how NeuroFlow AI behaves while assisting you.
                </p>

            </div>

            <div className="settings-group">

                <div className="setting-card">

                    <div>

                        <h3>Conversation Memory</h3>

                        <p>
                            Allow AI to use previous conversation context for better responses.
                        </p>

                    </div>

                    <button className="toggle-button toggle-active">

                        <span />

                    </button>

                </div>

                <div className="setting-card">

                    <div>

                        <h3>Current AI Provider</h3>

                        <p>
                            The language model currently serving your requests.
                        </p>

                    </div>

                    <span className="setting-value">

                        Gemini

                    </span>

                </div>

                <div className="setting-card">

                    <div>

                        <h3>Embedding Model</h3>

                        <p>
                            Model used for document embeddings and semantic search.
                        </p>

                    </div>

                    <span className="setting-value">

                        all-MiniLM-L6-v2

                    </span>

                </div>

                <div className="setting-card">

                    <div>

                        <h3>Auto Generate Chat Titles</h3>

                        <p>
                            Automatically generate titles for new conversations.
                        </p>

                    </div>

                    <button className="toggle-button toggle-active">

                        <span />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AISettings;