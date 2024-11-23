import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser, addUsers } from "../utils/userSlice";
import { useSelector } from "react-redux";
const UserList = ({ user, onLogout }) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const fetchedUsers = useSelector((state) => state.user.users);

    console.log("Hello");

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                dispatch(removeUser(userId));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };
    return (
        <div className="container mx-auto mt-10 p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">User List</h1>
                <div>
                    {user.permissions.includes("manage_roles") && (
                        <Link
                            to="/manage-roles"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Manage Roles
                        </Link>
                    )}
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedUsers &&
                        fetchedUsers.map((u) => (
                            <tr key={u.id}>
                                <td className="py-2 px-4 border-b">
                                    {u.firstName} {u.lastName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {u.email}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.permissions.includes("view") && (
                                        <Link
                                            to={`/user/${u.id}`}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            View
                                        </Link>
                                    )}
                                    {user.permissions.includes("edit") && (
                                        <Link
                                            to={`/edit/${u.id}`}
                                            className="text-green-500 hover:text-green-700 mr-2"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    {user.permissions.includes("delete") && (
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserList;
