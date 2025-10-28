/* eslint-disable react/prop-types */
import styled, { createGlobalStyle } from "styled-components";
import Logo from "../Logo";
import avatar from "../../assets/media/avatar.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { FiBell, FiMoreVertical, FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { FaWhatsapp, FaTwitter, FaRegBuilding, FaLinkedinIn, FaInstagram, FaUserShield, FaBriefcase, FaUsers, FaLock, FaFileContract } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose, IoLibrarySharp, IoTrendingUpSharp, IoRepeatSharp } from "react-icons/io5";
import { IoMdSchool, IoMdDocument, IoMdInformationCircle, IoMdPeople, IoIosStats } from "react-icons/io";
import { RiShareBoxLine, RiCoinsLine, RiMenuAddFill } from "react-icons/ri";
import { MdWorkOutline, MdManageAccounts } from "react-icons/md";
import { useState, useEffect } from "react";
import { RiCodeSSlashLine } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";

const CommonLinks = [
  {
    text: "Referrals",
    path: "referrals",
    icon: <RiShareBoxLine />,
  },
  {
    text: "Certificates",
    path: "certificates",
    icon: <IoMdDocument />,
  },
  {
    text: "HireNext Coins",
    path: "coins",
    icon: <RiCoinsLine />,
  },
  {
    text: "Support",
    path: "support",
    icon: <FiHelpCircle />,
  },
  {
    text: "Privacy Policy",
    path: "privacy-policy",
    icon: <FaLock />,
  },
  {
    text: "Terms of use",
    path: "terms",
    icon: <FaFileContract />,
  },
  {
    text: "Disclaimer Disclosure",
    path: "disclaimer",
    icon: <IoMdInformationCircle />,
  },
  {
    text: "About us",
    path: "about",
    icon: <IoMdPeople />,
  },
  {
    text: "Settings",
    path: "settings",
    icon: <FiSettings />,
  },
  {
    text: "FAQs",
    path: "faqs",
    icon: <FiHelpCircle />,
  },
  {
    text: "Logout",
    key: "logout",
    icon: <FiLogOut className="logout-icon" />,
  }
];

const AdminLinks = [
  {
    text: "Stats",
    path: "stats",
    icon: <IoIosStats />,
  },
  {
    text: "Admin",
    path: "admin",
    icon: <FaUserShield />,
  },
  {
    text: "Old Jobs Page",
    path: "all-jobs-admin",
    icon: <FaBriefcase />,
  },
  {
    text: "Manage Jobs",
    path: "manage-jobs-admin",
    icon: <FaBriefcase />,
  },
  {
    text: "Manage Users",
    path: "manage-users",
    icon: <FaUsers />,
  },
  {
    text: "Company Review",
    path: "company-review",
    icon: <FaRegBuilding />,
  },
  ...CommonLinks
];

const RecruiterLinks = [
  {
    text: "Add Job",
    path: "add-jobs",
    icon: <RiMenuAddFill />,
  },
  {
    text: "Manage Jobs",
    path: "manage-jobs",
    icon: <MdManageAccounts />,
  },
  {
    text: "Applications",
    path: "my-jobs",
    icon: <FaBriefcase />,
  },
  ...CommonLinks
];

const UserLinks = [
  {
    text: "Applications",
    path: "my-jobs",
    icon: <FaBriefcase />,
  },
  ...CommonLinks
];

const Navbar = ({ navbarRef }) => {
    const { user, handleLogout } = useUserContext();
    const navigate = useNavigate();
    const profilePhoto = user?.profile_photo;
    const [showSheet, setShowSheet] = useState(false);
    const [showInfoDrawer, setShowInfoDrawer] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isInfoClosing, setIsInfoClosing] = useState(false);
    const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
    const [showMoreDropdown, setShowMoreDropdown] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowSheet(false);
            setIsClosing(false);
        }, 300);
    };

    const handleInfoClose = () => {
        setIsInfoClosing(true);
        setTimeout(() => {
            setShowInfoDrawer(false);
            setIsInfoClosing(false);
        }, 300);
    };

    const getLinks = () => {
        if (!user) return [];
        switch(user.role) {
            case 1: return AdminLinks;
            case 2: return RecruiterLinks;
            case 3: return UserLinks;
            default: return CommonLinks;
        }
    };

    const handleLinkClick = (item) => {
        if (item.key === "logout") {
            handleLogout();
            navigate("/login");
        } else if (item.path === "all-jobs") {
            navigate("/all-jobs");
            handleInfoClose();
        } else if (item.path) {
            navigate(`/dashboard/${item.path}`);
            handleInfoClose();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showEmployerDropdown && !e.target.closest('.employer-dropdown-wrapper')) {
                setShowEmployerDropdown(false);
            }
            if (showMoreDropdown && !e.target.closest('.more-dropdown-wrapper')) {
                setShowMoreDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showEmployerDropdown, showMoreDropdown]);

    useEffect(() => {
        if (showSheet || showInfoDrawer) {
            document.body.classList.add('no-scroll', 'blur-background');
        } else {
            document.body.classList.remove('no-scroll', 'blur-background');
        }

        return () => {
            document.body.classList.remove('no-scroll', 'blur-background');
        };
    }, [showSheet, showInfoDrawer]);

    return (
        <Wrapper ref={navbarRef}>
            <div className="container">
                <div className="logo-container">
                    <Link to={user?.ac_status ? "/home" : "/"}>
                        <Logo />
                    </Link>
                </div>

                {user?.ac_status && (
                    <div className="nav-links">
                        <NavLink to="/home" className="nav-link">Home</NavLink>
                        <NavLink to="/top-mentors" className="nav-link">Mentors</NavLink>
                        <NavLink to="/all-jobs" className="nav-link">Jobs</NavLink>
                        <NavLink to="/colleges" className="nav-link">Colleges</NavLink>
                        <NavLink to="/companies" className="nav-link">Companies</NavLink>
                        <NavLink to="/my-network" className="nav-link">Network</NavLink>

                        <div className="more-dropdown-wrapper">
                            <div 
                                className="dropdown-toggle" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMoreDropdown(!showMoreDropdown);
                                }}
                            >
                                More
                                <span className="dropdown-arrow">
                                    {showMoreDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </span>
                            </div>
                            
                            {showMoreDropdown && (
                                <div className="dropdown-menu more-menu">
                                    <NavLink to="/dashboard/courses" className="more-dropdown-item">
                                        <IoMdSchool className="dropdown-icon" />
                                        Courses
                                    </NavLink>
                                    <div className="more-dropdown-item">
                                        <IoMdSchool className="dropdown-icon" />
                                        Scholarship
                                    </div>
                                    <div className="more-dropdown-item">
                                        <RiCodeSSlashLine/>
                                        Hackathons
                                    </div>
                                    <div className="more-dropdown-item">
                                        <MdWorkOutline className="dropdown-icon" />
                                        Workshop
                                    </div>
                                    <div className="more-dropdown-item">
                                        <IoMdPeople className="dropdown-icon" />
                                        Conference
                                    </div>
                                    <div className="more-dropdown-item">
                                        <IoNewspaperOutline className="dropdown-icon" />
                                        Tech Blog
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="desktop-search-container">
                            <div className="search-bar">
                                <svg className="absolute right-3 top-4 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 22 22">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                type="text" 
                                placeholder="Search here..." 
                                className="search-input"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {user?.ac_status ? (
                    <div className="icon-group">
                        <div className="icon-button notification-icon" onClick={() => navigate("/dashboard/notifications")}>
                            <FiBell className="icon" />
                            <span className="notification-dot"></span>
                        </div>

                        <div className="icon-button" onClick={() => setShowSheet(true)}>
                            <FaWhatsapp className="whatsapp-icon" />
                        </div>

                        <div className="combined-profile-btn" onClick={() => setShowInfoDrawer(true)}>
                            <div className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <img
                                src={profilePhoto || avatar}
                                alt="profile"
                                className="profile-pic"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="auth-actions">
                        <NavLink className="login-btn" to="/login">
                            Login
                        </NavLink>
                        <div className="divider"></div>
                            <div className="employer-dropdown-wrapper">
                                <div 
                                    className="dropdown-toggle" 
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    setShowEmployerDropdown(!showEmployerDropdown);
                                    }}
                                >
                                    For employers
                                    <span className="dropdown-arrow">
                                    {showEmployerDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                </div>
                            
                                {showEmployerDropdown && (
                                    <div className="dropdown-menu">
                                    <NavLink 
                                        to="/login-recruiter" 
                                        className="dropdown-item"
                                        onClick={() => setShowEmployerDropdown(false)}
                                    >
                                        Recruiter Login
                                    </NavLink>
                                    <NavLink 
                                        to="/login-company" 
                                        className="dropdown-item"
                                        onClick={() => setShowEmployerDropdown(false)}
                                    >
                                        Company Login
                                    </NavLink>
                                    <NavLink 
                                        to="#" 
                                        className="dropdown-item"
                                        onClick={() => setShowEmployerDropdown(false)}
                                    >
                                        College T&P
                                    </NavLink>
                                    <NavLink 
                                        to="#" 
                                        className="dropdown-item"
                                        onClick={() => setShowEmployerDropdown(false)}
                                    >
                                        Mentor Login
                                    </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                )}
            </div>

            {/* Bottom Sheet */}
            {showSheet && (
                <div className="sheet-overlay" onClick={handleClose}>
                    <div
                        className={`sheet-content ${isClosing ? "slideDown" : "slideUp"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-button" onClick={handleClose}>
                            <IoClose />
                        </button>

                        <h2>Stay Connected with HireNext</h2>
                        <p>
                            Follow us on our social media handles to stay updated with the latest
                            features, financial insights, and exciting developments in the world of
                            fintech. Don't miss out – connect with us today!
                        </p>

                        <div className="social-row">
                            <a href="#" className="social-box">
                                <div className="icon-container whatsapp">
                                    <FaWhatsapp className="icon" style={{ color: "white" }} />
                                </div>
                                <span className="label whatsapp-label">WhatsApp</span>
                            </a>
                            <a href="#" className="social-box">
                                <div className="icon-container twitter">
                                    <FaTwitter className="icon" style={{ color: "white" }} />
                                </div>
                                <span className="label twitter-label">Twitter</span>
                            </a>
                            <a href="#" className="social-box">
                                <div className="icon-container linkedin">
                                    <FaLinkedinIn className="icon" style={{ color: "white" }} />
                                </div>
                                <span className="label linkedin-label">LinkedIn</span>
                            </a>
                            <a href="#" className="social-box">
                                <div className="icon-container instagram">
                                    <FaInstagram className="icon" style={{ color: "white" }} />
                                </div>
                                <span className="label instagram-label">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Drawer */}
            {showInfoDrawer && (
                <div className="info-overlay" onClick={handleInfoClose}>
                    <div
                        className={`info-drawer ${isInfoClosing ? "slideRight" : "slideLeft"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="drawer-header">
                            <button className="close-button" onClick={handleInfoClose}>
                                <IoClose />
                            </button>
                        </div>
                        <div className="drawer-content">
                            {/* Add Profile Completion Component Here */}
                            <div className="profile-completion-drawer">
                            </div>
                            
                            {getLinks().map((item, index) => (
                                <div 
                                key={index} 
                                className="drawer-item"
                                onClick={() => handleLinkClick(item)}
                                >
                                <span className="drawer-icon">{item.icon}</span>
                                <span className="drawer-text">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: sticky;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 0.7rem 0;
    background-color: var(--color-white);
    z-index: 1000;
    top: 0;

    .container {
        width: 100%;
        max-width: 1300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
    }

    @media (max-width: 768px) {
        height: 55px;
    }

    .logo-container {
        max-width: 120px;
    }

    .nav-item {
        font-size: 16px;
        font-weight: 500;
        margin-left: 20px;
        color: var(--color-black);
    }

    .desktop-search-container {
        display: block;
        height: 36px;
    }

    .search-bar {
        position: relative;
        display: flex;
        align-items: center;
        width: 250px;
        height: 36px;
    }

    .search-input {
        width: 100%;
        padding: 10px 16px 10px 40px;
        border: 1.5px solid #e1e5e9;
        border-radius: 24px;
        background: #f8f9fa;
        font-size: 14px;
        outline: none;
        transition: all 0.3s ease;
        font-weight: 400;
        height: 36px;

        &:focus {
        border-color: #414FEA;
        background: white;
        box-shadow: 0 0 0 3px rgba(65, 79, 234, 0.1);
        }

        &::placeholder {
        color: #6c757d;
        font-weight: 400;
        }
    }

    .search-bar .search-icon {
        position: absolute;
        left: 16px;
        color: #6c757d;
        font-size: 18px;
        z-index: 1;
    }

    /* Hide search bar on mobile */
    @media (max-width: 768px) {
        .desktop-search-container {
        display: none;
        }
    }

    .icon-group {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .combined-profile-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 24px;
        padding: 4px 8px 4px 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            background: #e9ecef;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
    }

    .profile-pic {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-completion-drawer {
        padding: 15px;
        margin-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
    }

    .nav-link {
        color: #333;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        transition: color 0.2s;
        
        &:hover, &.active {
            color: #414FEA;
        }
    }

    .hamburger-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 20px;
        height: 15px;
        cursor: pointer;
    }

    .hamburger-icon span {
        display: block;
        height: 2px;
        width: 100%;
        background-color: currentColor;
        border-radius: 1px;
        transition: all 0.3s ease;
    }

    .hamburger-icon span:nth-child(1) {
        width: 50%;
    }

    .hamburger-icon span:nth-child(2) {
        width: 75%;
    }

    .hamburger-icon span:nth-child(3) {
        width: 100%;
    }

    .hamburger-icon:hover span {
        width: 100%;
    }

    .more-dropdown-wrapper {
        position: relative;
    }

    .more-menu {
        min-width: 200px;
        right: 0;
        left: -60px;
    }

    .more-dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        white-space: nowrap;
    }

    .dropdown-icon {
        font-size: 18px;
        color: #666;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }

    .icon-button {
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        font-size: 22px;
        color: #333;
        display: block;
    }

    .whatsapp-icon {
        color: #25D366;
        font-size: 22px;
    }

    .notification-icon {
        position: relative;
        display: flex;
    }

    .auth-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .login-btn {
        color: #414FEA;
        background-color: white;
        border: 1px solid #414FEA;
        padding: 7px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.3s ease;
        text-decoration: none;

        &:hover {
            background-color: #414FEA;
            color: white;
        }
    }

    .divider {
        height: 20px;
        width: 1px;
        background-color: #ddd;
    }

    .employer-dropdown {
        position: relative;
    }

    .dropdown-toggle {
        display: flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        color: #333;
        font-weight: 500;
        cursor: pointer;
        padding: 5px 0;
        position: relative;

        &:hover {
            color: #414FEA;
        }
    }

    .dropdown-arrow {
        display: flex;
        align-items: center;
        font-size: 16px;
        transition: transform 0.2s ease;
    }

    .employer-dropdown-wrapper {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 8px 0;
        min-width: 180px;
        z-index: 1001;
        animation: fadeInDropdown 0.2s ease-out;
        margin-right: -30px;
    }

    @keyframes fadeInDropdown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .dropdown-item {
        padding: 8px 16px;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        display: block;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f5f5f5;
        }
    }

    /* Mobile styles */
    @media screen and (max-width: 600px) {
        .dropdown-menu {
            min-width: 160px;
        }

        .dropdown-item {
            font-size: 13px;
            padding: 6px 12px;
        }
    }

    @media screen and (max-width: 600px) {
        .auth-actions {
            gap: 8px;
        }

        .login-btn {
            padding: 5px 15px;
            font-size: 13px;
        }

        .dropdown-toggle {
            font-size: 13px;
        }

        .dropdown-arrow {
            font-size: 14px;
        }

        .dropdown-menu {
            min-width: 160px;
        }

        .dropdown-item {
            font-size: 13px;
            padding: 6px 12px;
        }
    }

    .notification-dot {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 8px;
        height: 8px;
        background-color: #FF3B30;
        border-radius: 50%;
        border: 1px solid white;
    }

    .combined-profile-btn .hamburger-icon {
        width: 16px;
        height: 16px;
        margin-left: 4px;
    }

    .combined-profile-btn .hamburger-icon span {
        height: 1.5px;
    }

    @media screen and (max-width: 600px) {
        .combined-profile-btn {
            padding: 3px 6px 3px 3px;
            gap: 6px;
        }
        
        .profile-pic {
            width: 24px;
            height: 24px;
        }
        
        .combined-profile-btn .hamburger-icon {
            width: 14px;
            height: 14px;
        }
    }

    /* Bottom Sheet */
    .sheet-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 9999;
    }

    .sheet-content {
        background: white;
        width: 100%;
        max-width: 600px;
        padding: 20px 20px 30px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: relative;
        animation-duration: 0.3s;
        animation-fill-mode: both;
    }

    .slideUp {
        animation-name: slideUp;
        z-index: 100000;
    }

    .slideDown {
        animation-name: slideDown;
    }

    .close-button {
        position: absolute;
        top: 12px;
        left: 12px;
        background: transparent;
        border: none;
        font-size: 26px;
        color: #666;
        cursor: pointer;
    }

    .sheet-content h2 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
        text-align: center;
    }

    .sheet-content p {
        font-size: 13px;
        margin-bottom: 20px;
        text-align: center;
        padding: 0 6px;
    }

    /* Social Icons Section */
    .social-row {
        display: flex;
        justify-content: space-around;
        gap: 10px;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .social-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        width: 70px;
    }

    .icon-container {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
    }

    .social-icon {
        font-size: 20px;
        color: white;
    }

    .label {
        font-size: 12px;
        font-weight: 500;
    }

    /* WhatsApp */
    .whatsapp {
        background-color: #25D366;
    }
    .whatsapp-label {
        color: #25D366;
    }

    /* Twitter */
    .twitter {
        background-color: #1DA1F2;
    }
    .twitter-label {
        color: #1DA1F2;
    }

    /* LinkedIn */
    .linkedin {
        background-color: #0A66C2;
    }
    .linkedin-label {
        color: #0A66C2;
    }

    /* Instagram */
    .instagram {
        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
    }
    .instagram-label {
        color: #E1306C;
    }

    /* Info Drawer Styles */
    .info-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: flex-end;
        z-index: 9999;
    }

    .info-drawer {
        background: white;
        width: fit-content;
        height: 100%;
        padding: 20px;
        position: relative;
        animation-duration: 0.3s;
        animation-fill-mode: both;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }

    .slideLeft {
        animation-name: slideLeft;
    }

    .slideRight {
        animation-name: slideRight;
    }

    .drawer-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
    }

    .drawer-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        height: calc(100% - 40px);
    }

    .drawer-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f5f5f5;
        }
    }

    .drawer-icon {
        font-size: 20px;
        color: #555;
        display: flex;
    }

    .drawer-text {
        font-size: 15px;
        font-weight: 500;
        color: #333;
    }

    .logout-icon {
        color: #ff4444;
    }

    @keyframes slideLeft {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0%);
            opacity: 1;
        }
    }

    @keyframes slideRight {
        from {
            transform: translateX(0%);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translateY(0%);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    @media screen and (max-width: 600px) {
        padding: 0.5rem 0;

        .container {
            padding: 0 12px;
        }

        .logo-container {
            max-width: 100px;
        }

        .nav-item {
            font-size: 14px;
        }

        .login-btn {
            padding: 5px 10px;
            font-size: 13px;
        }

        .icon-group {
            gap: 15px;
        }

        .icon, .whatsapp-icon {
            font-size: 20px;
        }

        .profile {
            width: 30px;
            height: 30px;
        }

        /* Mobile adjustments for social icons */
        .social-box {
            width: 60px;
        }

        .icon-container {
            width: 40px;
            height: 40px;
        }

        .social-icon {
            font-size: 18px;
        }

        .label {
            font-size: 11px;
        }

        /* Info drawer mobile adjustments */
        .info-drawer {
            width: fit-content;
        }

        .drawer-item {
            padding: 8px 10px;
            gap: 12px;
        }

        .drawer-icon {
            font-size: 18px;
        }

        .drawer-text {
            font-size: 14px;
        }
    }
`;

const GlobalStyle = createGlobalStyle`
  body.no-scroll {
    overflow: hidden;
    height: 100vh;
  }
  
  body.blur-background {
    filter: blur(5px);
  }
  
  .sheet-content, .info-drawer {
    filter: none !important;
  }
`;

export default Navbar;