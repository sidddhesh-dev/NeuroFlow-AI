import "./AccountPage.css";

function Account() {
  return (
    <section className="account-page">

      <div className="account-header">
        <h1>Account</h1>

        <p>
          Manage your NeuroFlow profile and account information.
        </p>
      </div>

      <div className="account-container">

        <div className="account-profile-card">

          <div className="account-avatar">
            S
          </div>

          <div className="account-profile-info">
            <h2>Siddhesh</h2>
            <p>Developer</p>
          </div>

          <button>
            Change Avatar
          </button>

        </div>

        <div className="account-section">

          <div className="account-section-header">
            <h2>Personal Information</h2>
            <p>Update your personal account details.</p>
          </div>

          <div className="account-form-grid">

            <label>
              <span>Name</span>
              <input type="text" defaultValue="Siddhesh" />
            </label>

            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>

            <label>
              <span>Username</span>
              <input type="text" placeholder="username" />
            </label>

            <label>
              <span>Role</span>
              <input type="text" defaultValue="Developer" />
            </label>

          </div>

          <button className="account-save-button">
            Save Changes
          </button>

        </div>

      </div>

    </section>
  );
}

export default Account;