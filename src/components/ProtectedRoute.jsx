import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, requiredPermission }) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredPermission && !user.permissions.includes(requiredPermission)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
