import { useState } from "react";
import "./AuthPage.css";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="auth-page">
            <div className="auth-overlay">
                <div className="auth-card">
                    {
                        isLogin
                            ? <LoginForm setIsLogin={setIsLogin} />
                            : <RegisterForm setIsLogin={setIsLogin} />
                    }
                </div>
            </div>
        </div>
    );
}

export default AuthPage;