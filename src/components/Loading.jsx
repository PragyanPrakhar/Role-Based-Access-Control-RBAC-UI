import React from "react";
import OfflinePage from "./OfflinePage";
import UseOnlineStatus from "../utils/useOnlineStatus";
const UniqueLoader = () => {
    const onlineStatus = UseOnlineStatus();
    if (!onlineStatus) return <OfflinePage />;
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="relative w-64 h-64">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 rounded-full border-4 border-white opacity-75 animate-pulse`}
                        style={{
                            animationDelay: `${index * 0.3}s`,
                            transform: `scale(${1 - index * 0.2})`,
                        }}
                    ></div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold animate-bounce">
                        Loading...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UniqueLoader;
