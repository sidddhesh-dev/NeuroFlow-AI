import "./LoginPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    try {

      setLoading(true);

      const data = await loginUser({
        username,
        password,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate("/");
    } catch (error) {

      if (error.detail) {
        setError(error.detail);
      } else {
        setError("Login failed. Please try again.");
      }

    } finally { setLoading(false); }};

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
            AI-Powered Knowledge Workspace
          </span>

          <h2>
            Turn your knowledge into intelligent conversations.
          </h2>

          <p>
            Upload documents, organize knowledge and interact with your information through AI.
          </p>

        </div>

      </section>

      <section className="auth-form-panel">

        <div className="auth-form-container">

          <div className="auth-form-heading">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to NeuroFlow AI.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <label>

              <span>
                Username
              </span>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                required
              />

            </label>

            <label>

              <span>
                Password
              </span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

            </label>

            <div className="auth-form-options">

              <label className="remember-option">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

              <button type="button">
                Forgot password?
              </button>

            </div>

            {error && (

              <p className="auth-error">

                {error}

              </p>

            )}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >

              {
                loading
                  ? "Signing In..."
                  : "Sign In"
              }

            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
            >
              {" "}Create account
            </span>

          </p>

        </div>

      </section>

    </main>

  );

}

export default Login;