import "../LoginPage/LoginPage.css";

function Register() {
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
          <span>Build Your Knowledge Workspace</span>

          <h2>
            One workspace for documents, notes and intelligent conversations.
          </h2>

          <p>
            Create your NeuroFlow account and transform your information into an AI-powered knowledge system.
          </p>
        </div>

      </section>

      <section className="auth-form-panel">

        <div className="auth-form-container">

          <div className="auth-form-heading">
            <h2>Create account</h2>
            <p>Start building your NeuroFlow workspace.</p>
          </div>

          <form className="auth-form">

            <label>
              <span>Username</span>
              <input type="text" placeholder="Choose a username" />
            </label>

            <label>
              <span>Email</span>
              <input type="email" placeholder="Enter your email" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" placeholder="Create a password" />
            </label>

            <label>
              <span>Confirm Password</span>
              <input type="password" placeholder="Confirm your password" />
            </label>

            <button
              type="submit"
              className="auth-submit-button"
            >
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?
            <span> Sign in</span>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;