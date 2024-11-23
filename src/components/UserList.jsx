import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const UserList = ({ user, onLogout }) => {
    const dispatch = useDispatch();
    const fetchedUsers = useSelector((state) => state.user.users);

    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            dispatch(removeUser(selectedUserId));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setShowModal(false);
            setSelectedUserId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-extrabold">User Management</h1>
                    <div className="mt-4 sm:mt-0 flex space-x-4">
                        {user.permissions.includes("manage_roles") && (
                            <Link
                                to="/manage-roles"
                                className="px-5 py-2 bg-green-600 rounded-lg text-sm font-medium hover:bg-green-700 shadow-md transition duration-200"
                            >
                                Manage Roles
                            </Link>
                        )}
                        <button
                            onClick={onLogout}
                            className="px-5 py-2 bg-red-600 rounded-lg text-sm font-medium hover:bg-red-700 shadow-md transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {fetchedUsers &&
                                    fetchedUsers.map((u) => (
                                        <tr
                                            key={u.id}
                                            className="hover:bg-gray-50 transition duration-150 ease-in-out"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {u.firstName} {u.lastName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {u.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-4">
                                                    {user.permissions.includes(
                                                        "view"
                                                    ) && (
                                                        <Link
                                                            to={`/user/${u.id}`}
                                                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                                                        >
                                                            View
                                                        </Link>
                                                    )}
                                                    {user.permissions.includes(
                                                        "edit"
                                                    ) && (
                                                        <Link
                                                            to={`/edit/${u.id}`}
                                                            className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                    {user.permissions.includes(
                                                        "delete"
                                                    ) && (
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    u.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Dialog Box for the Deletion */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this user? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
