import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import UseOnlineStatus from "../utils/useOnlineStatus";
import OfflinePage from "./OfflinePage";

const UserList = ({ user, onLogout }) => {
    const onlineStatus = UseOnlineStatus();

    const dispatch = useDispatch();
    const fetchedUsers = useSelector((state) => state.user.users);

    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    console.log("Fetched Users are:->", fetchedUsers);

    // Filtered users based on the search query
    const filteredUsers = fetchedUsers.filter((u) =>
        `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Sorted users based on age
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOrder === "asc") return a.age - b.age;
        return b.age - a.age;
    });

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
            toast.error("Failed to delete user");
        } finally {
            setShowModal(false);
            setSelectedUserId(null);
        }
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };
    if(!onlineStatus){
        return <OfflinePage />;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-0">
                            User Management
                        </h1>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            {user.permissions.includes("manage_roles") && (
                                <Link
                                    to="/manage-roles"
                                    className="w-full sm:w-auto px-5 py-2 bg-green-600 rounded-lg text-sm font-medium hover:bg-green-700 shadow-md transition duration-200 text-center"
                                >
                                    Manage Roles
                                </Link>
                            )}
                            {/* added the new div for adding the user */}

                            {user.permissions.includes("add") && (
                                <Link
                                    to="/add"
                                    className="w-full sm:w-auto px-5 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition duration-200 text-center"
                                >
                                    Add User
                                </Link>
                            )}
                            <li className="flex items-center px-4 -mb-1 border-b-2">
                                Online Status: {onlineStatus && "🟢" }
                            </li>

                            <button
                                onClick={onLogout}
                                className="w-full sm:w-auto px-5 py-2 bg-red-600 rounded-lg text-sm font-medium hover:bg-red-700 shadow-md transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Sort Section */}
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search users by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <button
                        onClick={toggleSortOrder}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sort by Age (
                        {sortOrder === "asc" ? "Low to High" : "High to Low"})
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Age
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedUsers.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                                    >
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {u.firstName} {u.lastName}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {u.email}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {u.age}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
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
                                                            handleDelete(u.id)
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this user? This
                            action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
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

//         </div>
//     );
// };

export default UserList;
