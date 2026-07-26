import { useState } from "react";
import { registerUser } from "../../api/authApi";
import "./AuthPage.css"


function RegisterForm({ setIsLogin }) {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            if (formData.password !== formData.confirmPassword) {
                throw new error("Passwords do not match.");}
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setIsLogin(true);
        } catch (error) {
            setError(error.detail || error.message || "Registration failed.");
        } finally {
            setLoading(false);}
    }
    return (
        <>
            <h1 className="auth-title"> NeuroFlow AI </h1>

            <p className="auth-subtitle">
                Create your account to get started.
            </p>
            <form className="auth-form"  onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="register-input"/>
                <input type="email"value={formData.email} onChange={handleChange} placeholder="Email Address" className="auth-input"/>
                <input type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="auth-input"/>
                <input type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="auth-input"/>
                <button type="submit" disabled={loading} className="auth-button"> {loading ? "Creating Account..." : "Create Account"} </button>
            </form>

            <p className="auth-switch">

                Already have an account?

                <button type="button" className="auth-link" onClick={() => setIsLogin(true)}> Login </button>
            </p>
        </>
    );
}

export default RegisterForm;