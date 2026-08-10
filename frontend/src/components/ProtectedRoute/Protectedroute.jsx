import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import "./ProtectedRoute.css";

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="route-loading">
                <div className="route-loading-spinner" />
                <span>Loading NeuroFlow AI...</span>
            </div>
        );
    }

    if (!user) return <Navigate to="/auth" replace />;

    return children;
}

export default ProtectedRoute;