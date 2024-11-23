import React, { useState } from "react";
import { Link } from "react-router-dom";

const RoleManagement = ({ roles, onUpdateRoles }) => {
    const [editedRoles, setEditedRoles] = useState(roles);

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

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-4">Role Management</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {Object.entries(editedRoles).map(([role, permissions]) => (
                    <div key={role} className="mb-4">
                        <h2 className="text-xl font-semibold mb-2 capitalize">
                            {role}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {["view", "edit", "delete", "manage_roles"].map(
                                (permission) => (
                                    <label
                                        key={permission}
                                        className="inline-flex items-center"
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
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            disabled={role === "admin"}
                                        />
                                        <span className="ml-2 text-gray-700 capitalize">
                                            {permission.replace("_", " ")}
                                        </span>
                                    </label>
                                )
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update Roles
                    </button>
                    <Link
                        to="/"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back to User List
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RoleManagement;
