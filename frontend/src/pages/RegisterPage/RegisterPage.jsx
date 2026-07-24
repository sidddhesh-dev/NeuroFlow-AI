import "../LoginPage/LoginPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../api/authApi";


function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    try {
      setLoading(true);
      await registerUser({
        username,
        email,
        password,
      });

      navigate("/login");

    } catch (error) {

      if (error.username) {

        setError(error.username[0]);}
        else if (error.email) {
        setError(error.email[0]);}

        else if (error.password) {
        setError(error.password[0]);} 
        else {

        setError(
          "Registration failed. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="auth-page">
      <section className="auth-brand-panel">

        <div className="auth-brand">

          <div className="auth-logo">
            N
          </div>

          <h1>
            NeuroFlow <span>AI</span>
          </h1>

        </div>


        <div className="auth-introduction">

          <span>
            Build Your Knowledge Workspace
          </span>

          <h2>
            One workspace for documents, notes
            and intelligent conversations.
          </h2>

          <p>
            Create your NeuroFlow account and
            transform your information into an
            AI-powered knowledge system.
          </p>

        </div>

      </section>


      <section className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-heading">

            <h2>
              Create account
            </h2>

            <p>
              Start building your NeuroFlow workspace.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            <label>

              <span>
                Username
              </span>

              <input type="text" placeholder="Choose a username"
                value={username}
                onChange={(event) =>setUsername(event.target.value) } required />

            </label>

            <label>
              <span>
                Email
              </span>

              <input type="email" placeholder="Enter your email"
                value={email} onChange={(event) => setEmail(event.target.value) }required />
            </label>

            <label>
              <span>
                Password
              </span>

              <input type="password" placeholder="Create a password" value={password} onChange={(event) =>
              setPassword(event.target.value)
                }required/>
            </label>

            <label>
              <span>
                Confirm Password
              </span>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>setConfirmPassword(event.target.value)}required/>
            </label>
            {error && (<p className="auth-error">{error}</p>)}
            <button type="submit" className="auth-submit-button"disabled={loading}>
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <span onClick={() =>navigate("/login")}>{" "}Sign in</span>
          </p>
        </div>
      </section>
    </main>

  );

}


export default Register;