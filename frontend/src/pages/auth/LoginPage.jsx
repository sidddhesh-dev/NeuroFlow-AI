import "./AuthPage.css"

function LoginForm({ setIsLogin }) {
    return (
        <>
            <h1 className="auth-title">
                NeuroFlow AI
            </h1>

            <p className="auth-subtitle">
                Welcome back. Sign in to continue.
            </p>

            <form className="auth-form">

                <input type="email" placeholder="Email Address" className="auth-input"/>
                <input type="password" placeholder="Password" className="auth-input"/>

                <button type="submit" className="auth-button"> Login </button>

            </form>

            <p className="auth-switch">
                Don't have an account?
                <button type="button" onClick={() => setIsLogin(false)} className="auth-link"> Register </button>
            </p>
        </>
    );

}

export default LoginForm;