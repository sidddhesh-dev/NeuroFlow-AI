import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/UseAuth";
import "./AuthPage.css";
import { getSettings } from "../../api/settingsApi";

function LoginForm({ setIsLogin }) {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await login({
                username: formData.username,
                password: formData.password,
            });
            
            const settings = await getSettings();
            
            const routes = {
                chat: "/",
                documents: "/documents",
                notes: "/notes",
                history: "/history",
            };
            
            navigate(routes[settings.landing_page] || "/");

        } catch (error) {
            console.error(error);

            setError(
                error?.detail ||
                error?.message ||
                "Invalid username or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="auth-title">
                NeuroFlow AI
            </h1>

            <p className="auth-subtitle">
                Welcome back. Sign in to continue.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="auth-input"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="auth-input"
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-button"
                >
                    {loading ? "Signing In..." : "Login"}
                </button>

            </form>

            <p
                className="auth-switch"
                onClick={() => setIsLogin(false)}
            >
                Don't have an account?
            </p>
        </>
    );
}

export default LoginForm;