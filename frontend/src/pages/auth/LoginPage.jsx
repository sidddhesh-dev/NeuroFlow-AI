import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";
import "./AuthPage.css";

function LoginForm({ setIsLogin }) {

    const navigate = useNavigate();

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

            const data = await loginUser({
                username: formData.username,
                password: formData.password,
            });

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            navigate("/");

        } catch (error) {
            setError(error.detail || "Invalid email or password.");
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
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="auth-input"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="auth-input"
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

            <p className="auth-switch" onClick={() => setIsLogin(false)}>
                Don't have an account?
            </p>
        </>
    );
}

export default LoginForm;