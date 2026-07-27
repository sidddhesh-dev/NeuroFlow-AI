import { useState } from "react";
import AuthContext from "./AuthContext";
import { loginUser, getCurrentUser } from "../api/authApi";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    async function login(credentials) {

        const tokens = await loginUser(credentials);

        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}