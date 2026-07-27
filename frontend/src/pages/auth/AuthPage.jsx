import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./AuthPage.css";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-card">
                {isLogin ? (
                    <LoginPage setIsLogin={setIsLogin} />
                ) : (
                    <RegisterPage setIsLogin={setIsLogin} />
                )}
            </div>
        </div>
    );
}

export default AuthPage;