import "./ChangePassword.css";
import { useState } from "react";
import { X } from "lucide-react";

import { useChangePasswordMutation } from "../../../hooks/useChangePasswordMutation";

function ChangePassword({ onClose }) {
    const changePasswordMutation = useChangePasswordMutation();

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            await changePasswordMutation.mutateAsync(formData);
            onClose();
        } catch (error) {
            setError(error.message || "Failed to change password.");
        }
    }

    return (
        <div
            className="change-password-overlay"
            onClick={onClose}
        >
            <div
                className="change-password-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="change-password-header">
                    <h2>Change Password</h2>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="change-password-form"
                >
                    <input
                        type="password"
                        name="current_password"
                        placeholder="Current Password"
                        value={formData.current_password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        value={formData.new_password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p className="change-password-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="change-password-submit"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending
                            ? "Updating..."
                            : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;