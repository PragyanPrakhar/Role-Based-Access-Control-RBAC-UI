import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Edit, Trash, Users, ChevronRight } from "lucide-react";

const RoleManagement = ({ roles, onUpdateRoles }) => {
    const [editedRoles, setEditedRoles] = useState(roles);
    const [expandedRole, setExpandedRole] = useState(null);

    const handlePermissionChange = (role, permission) => {
        setEditedRoles((prevRoles) => ({
            ...prevRoles,
            [role]: prevRoles[role].includes(permission)
                ? prevRoles[role].filter((p) => p !== permission)
                : [...prevRoles[role], permission],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateRoles(editedRoles);
        alert("Roles updated successfully!");
    };

    const getPermissionIcon = (permission) => {
        switch (permission) {
            case "view":
                return <Eye size={18} />;
            case "edit":
                return <Edit size={18} />;
            case "delete":
                return <Trash size={18} />;
            case "manage_roles":
                return <Users size={18} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Role Management
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-2xl rounded-lg overflow-hidden"
                >
                    <div className="px-4 py-5 sm:p-6">
                        {Object.entries(editedRoles).map(
                            ([role, permissions]) => (
                                <div key={role} className="mb-6 last:mb-0">
                                    <div
                                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-200"
                                        onClick={() =>
                                            setExpandedRole(
                                                expandedRole === role
                                                    ? null
                                                    : role
                                            )
                                        }
                                    >
                                        <h2 className="text-xl font-semibold text-gray-800 capitalize flex items-center">
                                            <Shield
                                                className="mr-2"
                                                size={24}
                                            />
                                            {role}
                                        </h2>
                                        <ChevronRight
                                            className={`transition-transform duration-200 ${
                                                expandedRole === role
                                                    ? "transform rotate-90"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                    {expandedRole === role && (
                                        <div className="mt-4 pl-4 space-y-3 animate-fadeIn">
                                            {[
                                                "view",
                                                "edit",
                                                "delete",
                                                "manage_roles",
                                            ].map((permission) => (
                                                <label
                                                    key={permission}
                                                    className="flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={permissions.includes(
                                                            permission
                                                        )}
                                                        onChange={() =>
                                                            handlePermissionChange(
                                                                role,
                                                                permission
                                                            )
                                                        }
                                                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                                        disabled={
                                                            role === "admin"
                                                        }
                                                    />
                                                    <span className="inline-flex items-center text-gray-700 capitalize">
                                                        {getPermissionIcon(
                                                            permission
                                                        )}
                                                        <span className="ml-2">
                                                            {permission.replace(
                                                                "_",
                                                                " "
                                                            )}
                                                        </span>
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                            type="submit"
                        >
                            Update Roles
                        </button>
                        <Link
                            to="/"
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                        >
                            Back to User List
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleManagement;
