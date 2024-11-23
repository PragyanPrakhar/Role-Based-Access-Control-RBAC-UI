import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Briefcase,
    CreditCard,
    GraduationCap,
    Globe,
} from "lucide-react";
const UserProfileEdit = ({ user }) => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state) => state.user.users);
    if (!selector) {
        return <div>Loading...</div>;
    }
    useEffect(() => {
        setUserDetail(selector.find((user) => user.id === parseInt(id)));
    }, []);
    // setUserDetail(selector.find((user) => user.id === id));
    console.log("User Detail is :->", userDetail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prevState) => ({
            ...prevState,
            company: {
                ...prevState.company,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Detailn in Submit is :->", userDetail);
        dispatch(editUser({ id: userDetail?.id, userDetail: userDetail }));
        navigate("/");
        // You might want to add some feedback here, like a success message or redirect
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Edit User Profile
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                                >
                                    <User className="w-5 h-5 text-gray-500 mr-2" />
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={userDetail?.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                                >
                                    <User className="w-5 h-5 text-gray-500 mr-2" />
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={userDetail?.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetail?.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userDetail?.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="birthDate"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={userDetail?.birthDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userDetail?.address?.address}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    name="city"
                                    value={userDetail?.address?.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={userDetail?.address?.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="company"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="name"
                                value={userDetail?.company?.name}
                                onChange={handleCompanyChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="title"
                                value={userDetail?.company?.title}
                                onChange={handleCompanyChange}
                                placeholder="Job Title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="university"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <GraduationCap className="w-5 h-5 text-gray-500 mr-2" />
                                University
                            </label>
                            <input
                                type="text"
                                id="university"
                                name="university"
                                value={userDetail?.university}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="flex items-center text-sm font-medium text-gray-700 mb-2"
                            >
                                <Globe className="w-5 h-5 text-gray-500 mr-2" />
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userDetail?.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfileEdit;
