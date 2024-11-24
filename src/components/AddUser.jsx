import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleUser } from "../utils/userSlice"; // Assuming the slice is in `utils/userSlice`
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import OfflinePage from "./OfflinePage";
import UseOnlineStatus from "../utils/useOnlineStatus";
const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize empty user details
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        address: {
            address: "",
            city: "",
            state: "",
        },
        company: {
            name: "",
            title: "",
        },
        university: "",
        username: "",
    });

    // Handle changes for simple fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({ ...userDetail, [name]: value });
    };
    const onlineStatus = UseOnlineStatus();
    // Handle changes for nested address fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({
            ...userDetail,
            address: { ...userDetail.address, [name]: value },
        });
    };

    // Handle changes for nested company fields
    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({
            ...userDetail,
            company: { ...userDetail.company, [name]: value },
        });
    };
    //function to calculate age
    const calculateAge = (birthDate) => {
        const birthDateObj = new Date(birthDate); // Convert birthDate string to Date object
        const ageDifference = Date.now() - birthDateObj.getTime(); // Difference in milliseconds
        const ageDate = new Date(ageDifference); // Convert to Date object
        return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age in years
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Date.now();
        const birthDate = userDetail.birthDate;
        const age = calculateAge(birthDate);
        console.log("Age is :->", age);
        console.log("User Detail of the Single User is :->", userDetail);

        const updatedUserDetail = {
            ...userDetail,
            image: "https://dummyjson.com/icon/williamg/128",
            age: age,
        };
        console.log("Updated User Detail is :->", updatedUserDetail);
        dispatch(addSingleUser({ ...updatedUserDetail, id }));

        // Clear form
        setUserDetail({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            birthDate: "",
            address: {
                address: "",
                city: "",
                state: "",
            },
            company: {
                name: "",
                title: "",
            },
            university: "",
            username: "",
        });

        toast.success("User added successfully!");
        navigate("/");
    };
    if (!onlineStatus) return <OfflinePage />;
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Add New User
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="text-sm font-medium text-gray-700 mb-2"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={userDetail.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="text-sm font-medium text-gray-700 mb-2"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={userDetail.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetail.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userDetail.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="birthDate"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={userDetail.birthDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userDetail.address.address}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    name="city"
                                    value={userDetail.address.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={userDetail.address.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="company"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="name"
                                value={userDetail.company.name}
                                onChange={handleCompanyChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="title"
                                value={userDetail.company.title}
                                onChange={handleCompanyChange}
                                placeholder="Job Title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="university"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                University
                            </label>
                            <input
                                type="text"
                                id="university"
                                name="university"
                                value={userDetail.university}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userDetail.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                            >
                                Add User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
