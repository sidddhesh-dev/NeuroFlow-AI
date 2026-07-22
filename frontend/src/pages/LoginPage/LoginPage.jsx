import "./LoginPage.css";

function Login() {
  return (
    <main className="auth-page">

      <section className="auth-brand-panel">

        <div className="auth-brand">
          <div className="auth-logo">N</div>

          <h1>
            NeuroFlow <span>AI</span>
          </h1>
        </div>

        <div className="auth-introduction">
          <span>AI-Powered Knowledge Workspace</span>

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
            <h2>Welcome back</h2>
            <p>Sign in to continue to NeuroFlow AI.</p>
          </div>

          <form className="auth-form">

            <label>
              <span>Email or Username</span>

              <input
                type="text"
                placeholder="Enter your email or username"
              />
            </label>

            <label>
              <span>Password</span>

              <input
                type="password"
                placeholder="Enter your password"
              />
            </label>

            <div className="auth-form-options">

              <label className="remember-option">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button">
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="auth-submit-button"
            >
              Sign In
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?
            <span> Create account</span>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;