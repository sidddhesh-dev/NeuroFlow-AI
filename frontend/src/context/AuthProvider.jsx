import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
    loginUser,getCurrentUser,saveTokens,clearTokens} from "../api/authApi";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    async function loadUser() {
    try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    } catch {
        setUser(null);
    } finally {
        setLoading(false);
    }
}

   async function login(credentials) {

    const tokens = await loginUser(credentials);

    saveTokens(tokens);

    const currentUser = await getCurrentUser();

    setUser(currentUser);

    return currentUser;

}
    async function logout() {
        clearTokens();
        setUser(null);
    }
    useEffect(() => {
        async function initializeAuth() {
            const accessToken = localStorage.getItem("access");
            if (!accessToken) {
                setLoading(false);
                return;
            }
            await loadUser();
        }
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}