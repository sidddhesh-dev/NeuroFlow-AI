import "./AccountSecurity.css";
import { useState } from "react";
import {
    AlertTriangle,
    Bot,
    Database,
    Lock,
    Shield,
} from "lucide-react";

import { useAccountSecurityQuery } from "../../../hooks/useAccountSecurityQuery";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function AccountSecurity() {
    const { data, isLoading, error } = useAccountSecurityQuery();
    const [showPassword, setShowPassword] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load account security.</p>;

    return (
        <section className="account-security">
            <div className="security-header">
                <h2>Account & Security</h2>
                <p>Manage your account and security settings.</p>
            </div>

            <div className="security-card">
                <div className="security-row">
                    <div>
                        <h3>
                            <Lock size={18} />
                            Password
                        </h3>
                        <p>
                            Last Changed:{" "}
                            {data.password_last_changed || "Unknown"}
                        </p>
                    </div>

                    <button
                        className="security-button"
                        onClick={() => setShowPassword(true)}
                    >
                        Change Password
                    </button>
                </div>

                <div className="security-row">
                    <div>
                        <h3>
                            <Bot size={18} />
                            Connected AI
                        </h3>
                        <p>{data.provider}</p>
                    </div>

                    <div className="security-badge">
                        {data.provider_model}
                    </div>
                </div>

                <div className="security-row">
                    <div>
                        <h3>
                            <Database size={18} />
                            Embedding Model
                        </h3>
                        <p>{data.embedding_model}</p>
                    </div>

                    <div className="security-badge">
                        {data.embedding_dimensions}D
                    </div>
                </div>

                <div className="security-row">
                    <div>
                        <h3>
                            <Shield size={18} />
                            Future Features
                        </h3>
                        <p>Two Factor Authentication</p>
                    </div>

                    <div className="coming-soon">Coming Soon</div>
                </div>

                <div className="danger-zone">
                    <div>
                        <h3>
                            <AlertTriangle size={18} />
                            Delete Account
                        </h3>
                        <p>Permanently delete your account.</p>
                    </div>

                    <button
                        className="delete-button"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {showPassword && (
                <ChangePassword onClose={() => setShowPassword(false)} />
            )}

            {showDelete && (
                <DeleteAccount onClose={() => setShowDelete(false)} />
            )}
        </section>
    );
}

export default AccountSecurity;