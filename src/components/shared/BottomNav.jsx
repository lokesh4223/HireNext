import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const BottomNav = () => {
    const { user } = useUserContext();
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isMoreModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMoreModalOpen]);

    const handleMoreClick = () => {
        setIsClosing(false);
        setIsMoreModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMoreModalOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const handleModalLinkClick = () => {
        handleCloseModal();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const moreItems = [
        { name: "Colleges", icon: "school-outline", color: "bg-yellow-100 text-yellow-600", path: "/colleges" },
        { name: "Companies", icon: "business-outline", color: "bg-pink-100 text-pink-600", path: "/companies" },
        { name: "Practice", icon: "repeat-outline", color: "bg-teal-100 text-teal-600", path: "#" },
        { name: "Courses", icon: "book-outline", color: "bg-blue-100 text-blue-600", path: "/dashboard/courses" },
        { name: "Scholarship", icon: "school-outline", color: "bg-green-100 text-green-600", path: "#" },
        { name: "Hackathons", icon: "code-slash-outline", color: "bg-purple-100 text-purple-600", path: "#" },
        { name: "Workshop", icon: "build-outline", color: "bg-orange-100 text-orange-600", path: "#" },
        { name: "Conference", icon: "people-outline", color: "bg-red-100 text-red-600", path: "#" },
        { name: "Tech Blog", icon: "newspaper-outline", color: "bg-indigo-100 text-indigo-600", path: "#" },
    ];

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-2 sm:hidden">
                {/* Home */}
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        "flex flex-col items-center text-sm " +
                        (isActive ? "text-blue-600" : "text-gray-500")
                    }
                    end
                >
                    <ion-icon name="home-outline" style={{ fontSize: "24px" }}></ion-icon>
                    Home
                </NavLink>

                {/* Jobs */}
                <NavLink
                    to="/all-jobs"
                    className={({ isActive }) =>
                        "flex flex-col items-center text-sm " +
                        (isActive ? "text-blue-600" : "text-gray-500")
                    }
                >
                    <ion-icon name="briefcase-outline" style={{ fontSize: "24px" }}></ion-icon>
                    Jobs
                </NavLink>

                <NavLink
                    to="/my-network"
                    className={({ isActive }) =>
                        "flex flex-col items-center text-sm " +
                        (isActive ? "text-blue-600" : "text-gray-500")
                    }
                >
                    <ion-icon name="add-circle-outline" style={{ fontSize: "24px" }}></ion-icon>
                    Network
                </NavLink>

                {/* Mentors */}
                <NavLink
                    to="/top-mentors"
                    className={({ isActive }) =>
                        "flex flex-col items-center text-sm " +
                        (isActive ? "text-blue-600" : "text-gray-500")
                    }
                >
                    <ion-icon name="people-outline" style={{ fontSize: "24px" }}></ion-icon>
                    Mentors
                </NavLink>

                {/* More */}
                <button
                    onClick={handleMoreClick}
                    className="flex flex-col items-center text-sm text-gray-500"
                >
                    <ion-icon name="apps-outline" style={{ fontSize: "24px" }}></ion-icon>
                    More
                </button>
            </div>

            {/* More Modal */}
            {(isMoreModalOpen || isClosing) && (
                <>
                    {/* Backdrop */}
                    <div 
                        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
                            isClosing ? 'opacity-20' : 'opacity-50'
                        }`}
                        onClick={handleBackdropClick}
                    ></div>
                    
                    {/* Modal */}
                    <div 
                        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-out ${
                            isClosing ? 'translate-y-full' : 'translate-y-0'
                        }`}
                    >
                        <div className="p-4 pb-6 relative">
                            {/* Drag handle */}
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                            
                            {/* Close button */}
                            <button 
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <ion-icon name="close-outline" style={{ fontSize: "24px" }}></ion-icon>
                            </button>
                            
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Explore More</h3>
                            
                            <div className="grid grid-cols-3 gap-4">
                                {moreItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        onClick={handleModalLinkClick}
                                        className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} mb-2`}>
                                            <ion-icon name={item.icon} style={{ fontSize: "20px" }}></ion-icon>
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default BottomNav;