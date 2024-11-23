import React, { useState,useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import { addUsers } from "./utils/userSlice";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import EditUser from "./components/EditUser";
import RoleManagement from "./components/RoleManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import AddUser from "./components/AddUser";
// import UserEdit from "./components/UserEdit";

const App = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState({
        //added add permission
        admin: ["view", "edit", "delete", "manage_roles","add"],
        editor: ["view", "edit"],
        viewer: ["view"],
    });
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users");
                const data = await response.json();
                console.log("Users are as following :->", data.users);
                dispatch(addUsers(data.users));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
    const handleLogin = (userData) => {
        setUser({
            ...userData,
            permissions: roles[userData.role],
        });
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleUpdateRoles = (updatedRoles) => {
        setRoles(updatedRoles);
        if (user) {
            setUser({
                ...user,
                permissions: updatedRoles[user.role],
            });
        }
    };
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route
                        path="/login"
                        element={<Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute user={user}>
                                <UserList user={user} onLogout={handleLogout} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/:id"
                        element={
                            <ProtectedRoute user={user}>
                                <UserDetails user={user} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={
                            <ProtectedRoute
                                user={user}
                                requiredPermission="edit"
                            >
                                <EditUser user={user} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manage-roles"
                        element={
                            <ProtectedRoute
                                user={user}
                                requiredPermission="manage_roles"
                            >
                                <RoleManagement
                                    roles={roles}
                                    onUpdateRoles={handleUpdateRoles}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/add"
                    element={
                        <ProtectedRoute
                            user={user}
                            requiredPermission="add"
                            >
                                <AddUser user={user} />
                            </ProtectedRoute>
                    }
                    />


                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
