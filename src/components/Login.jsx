import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import OfflinePage from "./OfflinePage";
import UseOnlineStatus from "../utils/useOnlineStatus";
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("viewer");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const onlineStatus = UseOnlineStatus();
    const validateForm = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onLogin({ username, role });
            navigate("/");
        } else {
            setErrors(formErrors);
        }
    };
    if(!onlineStatus) return <OfflinePage/>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-2xl rounded-xl">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors.username}
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                        {errors.password && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="viewer">Viewer</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <button
                            className="w-full px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
