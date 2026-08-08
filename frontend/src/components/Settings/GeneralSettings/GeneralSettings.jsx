import "./GeneralSettings.css";

import { useSettingsQuery } from "../../../hooks/useSettingsQuery";
import { useUpdateSettingsMutation } from "../../../hooks/useUpdateSettingsMutation";

function GeneralSettings() {

    const {
        data: settings,
        isLoading,
        error,
    } = useSettingsQuery();

    const updateSettingsMutation =
        useUpdateSettingsMutation();

    function updateSetting(field, value) {

        updateSettingsMutation.mutate({

            ...settings,

            [field]: value,

        });

    }

    if (isLoading) {

        return (

            <div className="general-settings">

                <p>Loading settings...</p>

            </div>

        );

    }

    if (error) {

        return (

            <div className="general-settings">

                <p>Failed to load settings.</p>

            </div>

        );

    }

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

                    <select
                        className="setting-select"
                        value={settings.landing_page}
                        onChange={(event) =>
                            updateSetting(
                                "landing_page",
                                event.target.value
                            )
                        }
                    >

                        <option value="chat">

                            Chat

                        </option>

                        <option value="documents">

                            Documents

                        </option>

                        <option value="notes">

                            Notes

                        </option>

                        <option value="history">

                            History

                        </option>

                    </select>

                </div>

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Confirm Before Delete</h3>

                        <p>

                            Display a confirmation dialog before deleting chats, notes, and documents.

                        </p>

                    </div>

                    <button
                        className={`setting-toggle ${
                            settings.confirm_before_delete
                                ? "setting-toggle-active"
                                : ""
                        }`}
                        onClick={() =>
                            updateSetting(
                                "confirm_before_delete",
                                !settings.confirm_before_delete
                            )
                        }
                    >

                        <span></span>

                    </button>

                </div>

                <div className="setting-card">

                    <div className="setting-info">

                        <h3>Animations</h3>

                        <p>

                            Enable smooth animations throughout the application.

                        </p>

                    </div>

                    <button
                        className={`setting-toggle ${
                            settings.animations
                                ? "setting-toggle-active"
                                : ""
                        }`}
                        onClick={() =>
                            updateSetting(
                                "animations",
                                !settings.animations
                            )
                        }
                    >

                        <span></span>

                    </button>

                </div>

            </div>

        </section>

    );

}

export default GeneralSettings;