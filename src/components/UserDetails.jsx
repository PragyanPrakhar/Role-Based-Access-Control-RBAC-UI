// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// const UserDetails = ({ user }) => {
//     const [userDetails, setUserDetails] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         fetchUserDetails();
//     }, [id]);

//     const fetchUserDetails = async () => {
//         try {
//             const response = await fetch(`https://dummyjson.com/users/${id}`);
//             const data = await response.json();
//             setUserDetails(data);
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//         }
//     };

//     if (!userDetails) return <div>Loading...</div>;

//     return (
//         <div className="container mx-auto mt-10 p-4">
//             <h1 className="text-3xl font-bold mb-4">User Details</h1>
//             <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <p>
//                     <strong>Name:</strong> {userDetails.firstName}{" "}
//                     {userDetails.lastName}
//                 </p>
//                 <p>
//                     <strong>Email:</strong> {userDetails.email}
//                 </p>
//                 <p>
//                     <strong>Phone:</strong> {userDetails.phone}
//                 </p>
//                 <p>
//                     <strong>Company:</strong> {userDetails.company.name}
//                 </p>
//             </div>
//             <div className="flex gap-2">
//                 <Link
//                     to="/"
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Back to List
//                 </Link>
//                 {(user.role === "admin" || user.role === "editor") && (
//                     <Link
//                         to={`/edit/${id}`}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Edit User
//                     </Link>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import {
    Mail,
    Phone,
    Calendar,
    MapPin,
    Briefcase,
    CreditCard,
    GraduationCap,
    Globe,
    Bitcoin,
} from "lucide-react";

const UserDetails = ({ user }) => {
    const [userDetails, setUserDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/users/${id}`);
            const data = await response.json();
            setUserDetails(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    if (!userDetails) return <div><Loading/></div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-48 w-full object-cover md:w-48"
                            src={userDetails.image}
                            alt={`${userDetails.firstName} ${userDetails.lastName}`}
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            User Profile
                        </div>
                        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {userDetails.firstName} {userDetails.lastName}
                        </h1>
                        <p className="mt-2 text-xl text-gray-500">
                            {userDetails.company.title} at{" "}
                            {userDetails.company.name}
                        </p>
                        <div className="mt-4 flex justify-center">
                            {(user.role === "admin" ||
                                user.role === "editor") && (
                                <Link
                                    to={`/edit/${id}`}
                                    className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    Edit User
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard
                            icon={<Mail className="text-blue-500" />}
                            title="Contact"
                        >
                            <p>{userDetails.email}</p>
                            <p>{userDetails.phone}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<Calendar className="text-green-500" />}
                            title="Personal"
                        >
                            <p>Birth Date: {userDetails.birthDate}</p>
                            <p>Age: {userDetails.age}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<MapPin className="text-red-500" />}
                            title="Address"
                        >
                            <p>{userDetails.address.address}</p>
                            <p>
                                {userDetails.address.city},{" "}
                                {userDetails.address.state}{" "}
                                {userDetails.address.postalCode}
                            </p>
                            <p>{userDetails.address.country}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<Briefcase className="text-purple-500" />}
                            title="Work"
                        >
                            <p>{userDetails.company.name}</p>
                            <p>{userDetails.company.department}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<CreditCard className="text-yellow-500" />}
                            title="Bank Info"
                        >
                            <p>Card: {userDetails.bank.cardType}</p>
                            <p>Expires: {userDetails.bank.cardExpire}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<GraduationCap className="text-indigo-500" />}
                            title="Education"
                        >
                            <p>{userDetails.university}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<Globe className="text-teal-500" />}
                            title="Online"
                        >
                            <p>Username: {userDetails.username}</p>
                            <p>IP: {userDetails.ip}</p>
                        </InfoCard>
                        <InfoCard
                            icon={<Bitcoin className="text-orange-500" />}
                            title="Crypto"
                        >
                            <p>Coin: {userDetails.crypto.coin}</p>
                            <p>Network: {userDetails.crypto.network}</p>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ icon, title, children }) => (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex items-center mb-4">
            {icon}
            <h2 className="ml-2 text-xl font-semibold text-gray-800">
                {title}
            </h2>
        </div>
        <div className="text-gray-600">{children}</div>
    </div>
);

export default UserDetails;
