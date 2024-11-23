// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeUser, addUsers } from "../utils/userSlice";
// import { useSelector } from "react-redux";
// const UserList = ({ user, onLogout }) => {
//     const dispatch = useDispatch();
//     const [users, setUsers] = useState([]);

//     const fetchedUsers = useSelector((state) => state.user.users);

//     console.log("Hello");

//     const handleDelete = async (userId) => {
//         if (window.confirm("Are you sure you want to delete this user?")) {
//             try {
//                 dispatch(removeUser(userId));
//             } catch (error) {
//                 console.error("Error deleting user:", error);
//             }
//         }
//     };
//     return (
//         <div className="container mx-auto mt-10 p-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-3xl font-bold">User List</h1>
//                 <div>
//                     {user.permissions.includes("manage_roles") && (
//                         <Link
//                             to="/manage-roles"
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                         >
//                             Manage Roles
//                         </Link>
//                     )}
//                     <button
//                         onClick={onLogout}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//             <table className="min-w-full bg-white">
//                 <thead>
//                     <tr>
//                         <th className="py-2 px-4 border-b">Name</th>
//                         <th className="py-2 px-4 border-b">Email</th>
//                         <th className="py-2 px-4 border-b">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {fetchedUsers &&
//                         fetchedUsers.map((u) => (
//                             <tr key={u.id}>
//                                 <td className="py-2 px-4 border-b">
//                                     {u.firstName} {u.lastName}
//                                 </td>
//                                 <td className="py-2 px-4 border-b">
//                                     {u.email}
//                                 </td>
//                                 <td className="py-2 px-4 border-b">
//                                     {user.permissions.includes("view") && (
//                                         <Link
//                                             to={`/user/${u.id}`}
//                                             className="text-blue-500 hover:text-blue-700 mr-2"
//                                         >
//                                             View
//                                         </Link>
//                                     )}
//                                     {user.permissions.includes("edit") && (
//                                         <Link
//                                             to={`/edit/${u.id}`}
//                                             className="text-green-500 hover:text-green-700 mr-2"
//                                         >
//                                             Edit
//                                         </Link>
//                                     )}
//                                     {user.permissions.includes("delete") && (
//                                         <button
//                                             onClick={() => handleDelete(u.id)}
//                                             className="text-red-500 hover:text-red-700"
//                                         >
//                                             Delete
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
// export default UserList;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { removeUser } from "../utils/userSlice";

// const UserList = ({ user, onLogout }) => {
//     const dispatch = useDispatch();
//     const fetchedUsers = useSelector((state) => state.user.users);

//     const handleDelete = async (userId) => {
//         if (window.confirm("Are you sure you want to delete this user?")) {
//             try {
//                 dispatch(removeUser(userId));
//             } catch (error) {
//                 console.error("Error deleting user:", error);
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//                     <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
//                         <h1 className="text-3xl font-extrabold text-gray-900">
//                             User List
//                         </h1>
//                         <div className="mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
//                             {user.permissions.includes("manage_roles") && (
//                                 <Link
//                                     to="/manage-roles"
//                                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
//                                 >
//                                     Manage Roles
//                                 </Link>
//                             )}
//                             <button
//                                 onClick={onLogout}
//                                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th
//                                         scope="col"
//                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                     >
//                                         Name
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                     >
//                                         Email
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                     >
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {fetchedUsers &&
//                                     fetchedUsers.map((u) => (
//                                         <tr
//                                             key={u.id}
//                                             className="hover:bg-gray-50 transition duration-150 ease-in-out"
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="text-sm font-medium text-gray-900">
//                                                     {u.firstName} {u.lastName}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="text-sm text-gray-500">
//                                                     {u.email}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <div className="flex space-x-2">
//                                                     {user.permissions.includes(
//                                                         "view"
//                                                     ) && (
//                                                         <Link
//                                                             to={`/user/${u.id}`}
//                                                             className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
//                                                         >
//                                                             View
//                                                         </Link>
//                                                     )}
//                                                     {user.permissions.includes(
//                                                         "edit"
//                                                     ) && (
//                                                         <Link
//                                                             to={`/edit/${u.id}`}
//                                                             className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
//                                                         >
//                                                             Edit
//                                                         </Link>
//                                                     )}
//                                                     {user.permissions.includes(
//                                                         "delete"
//                                                     ) && (
//                                                         <button
//                                                             onClick={() =>
//                                                                 handleDelete(
//                                                                     u.id
//                                                                 )
//                                                             }
//                                                             className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserList;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const UserList = ({ user, onLogout }) => {
    const dispatch = useDispatch();
    const fetchedUsers = useSelector((state) => state.user.users);

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
        </div>
    );
};

export default UserList;
