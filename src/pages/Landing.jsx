import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../utils/googleAuth";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/css/wrappers/LandingPage";
import Navbar from "../components/shared/Navbar";
import Brands from "../components/Home Page/Brands";
import Categories from "../components/Home Page/Categories";
import FeaturedCompanies from "../components/Home Page/FeaturedCompanies";
import TopSection from "../components/Home Page/TopSection";
import Introducing from "../components/Home Page/Introducing";
import BottomNav from "../components/shared/BottomNav";
import { useUserContext } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterMain from "./FooterMain";

const Landing = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const { user, handleGoogleAuth } = useUserContext();
    const navigate = useNavigate();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showEmployerDropdown && !e.target.closest('.employer-dropdown-wrapper')) {
                setShowEmployerDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showEmployerDropdown]);

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
    }, []);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            const { user, error } = await signInWithGoogle();
            if (error) throw new Error(error.message);

            const result = await handleGoogleAuth(user);

            if (!result.success) {
                if (result.isBlocked) {
                    toast.info(
                        <div>
                            {result.message}<br/>
                            <a href="#" style={{ color: "#007bff" }}>
                                Click here to activate your account
                            </a>
                        </div>,
                        { autoClose: 10000 }
                    );
                } else {
                    toast.error(result.message);
                }
                return;
            }

            toast.success(result?.message || "Signed in successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
        setIsGoogleLoading(false);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} theme="light"/>
            <div>
                <Navbar navbarRef={navbarRef} />
                
                <Wrapper ref={heroRef}>
                    {user?.ac_status && user?.role === 3 && <BottomNav />}
                </Wrapper>
                
                <TopSection 
                    showEmployerDropdown={showEmployerDropdown}
                    setShowEmployerDropdown={setShowEmployerDropdown}
                />
                <Introducing/>
                <Categories />
                <FeaturedCompanies />
                <Brands />
            </div>
            <FooterMain />
        </>
    );
};

export default Landing;