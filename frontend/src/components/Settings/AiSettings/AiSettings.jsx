import "./AiSettings.css";

import { useSettingsQuery } from "../../../hooks/useSettingsQuery";
import { useUpdateSettingsMutation } from "../../../hooks/useUpdateSettingsMutation";

function AISettings() {
    const { data: settings, isLoading, error } = useSettingsQuery();
    const updateSettingsMutation = useUpdateSettingsMutation();

    function updateSetting(field, value) {
        updateSettingsMutation.mutate({ ...settings, [field]: value });
    }

    if (isLoading) {
        return (
            <section className="ai-settings">
                <p>Loading AI settings...</p>
            </section>
        );
    }

    if (error || !settings) {
        return (
            <section className="ai-settings">
                <p>Failed to load AI settings.</p>
            </section>
        );
    }

    return (
        <section className="ai-settings">
            <div className="ai-settings-header">
                <h2>AI Preferences</h2>
                <p>Configure how NeuroFlow AI behaves throughout your workspace.</p>
            </div>

            <div className="ai-settings-body">
                <div className="ai-setting-row">
                    <div className="ai-setting-info">
                        <h3>Conversation Memory</h3>
                        <p>Allow AI to remember previous conversations for better responses.</p>
                    </div>

                    <button
                        type="button"
                        className={`ai-toggle ${settings.conversation_memory ? "ai-toggle-active" : ""}`}
                        onClick={() => updateSetting("conversation_memory", !settings.conversation_memory)}
                    >
                        <span />
                    </button>
                </div>

                <div className="ai-setting-row">
                    <div className="ai-setting-info">
                        <h3>Auto Generate Chat Titles</h3>
                        <p>Automatically generate titles for newly created conversations.</p>
                    </div>

                    <button
                        type="button"
                        className={`ai-toggle ${settings.auto_generate_chat_titles ? "ai-toggle-active" : ""}`}
                        onClick={() => updateSetting("auto_generate_chat_titles", !settings.auto_generate_chat_titles)}
                    >
                        <span />
                    </button>
                </div>

                <div className="ai-setting-row">
                    <div className="ai-setting-info">
                        <h3>Current AI Provider</h3>
                        <p>Active language model currently serving requests.</p>
                    </div>
                    <div className="ai-badge">Gemini</div>
                </div>

                <div className="ai-setting-row">
                    <div className="ai-setting-info">
                        <h3>Embedding Model</h3>
                        <p>Model used for semantic document search.</p>
                    </div>
                    <div className="ai-badge">all-MiniLM-L6-v2</div>
                </div>
            </div>
        </section>
    );
}

export default AISettings;