import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SYSTEM_CONFIG } from "../config/system-config";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const userContext = React.createContext();

const UserContext = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    // Handle Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                setUser({
                    status: true,
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    role: 3, // Default user role
                    ac_status: 1 // Active status
                });
            } else {
                // User is signed out
                setUser({ status: false });
            }
            setUserLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Mock function to simulate fetching user data
    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            // If using mock API or backend is not available, use Firebase user data
            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // User data is already handled by Firebase auth state listener
                setUserError({ status: false, message: "" });
            } else {
                // Try to connect to backend API
                const response = await axios.get(
                    `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/me`,
                    { withCredentials: true }
                );
                setUserError({ status: false, message: "" });
                setUser(response?.data?.result);
            }
        } catch (error) {
            // If backend is not available, use Firebase user data
            if (auth.currentUser) {
                setUser({
                    status: true,
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    role: 3, // Default user role
                    ac_status: 1 // Active status
                });
                setUserError({ status: false, message: "" });
            } else {
                setUserError({ status: true, message: error?.message });
                setUser({ status: false });
            }
        }
        setUserLoading(false);
    };

    // Handle Google authentication with Firebase
    const handleGoogleAuth = async (googleUser) => {
        setUserLoading(true);
        try {
            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // Use Firebase user data directly
                setUser({
                    status: true,
                    uid: googleUser.uid,
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                    photoURL: googleUser.photoURL,
                    role: 3, // Default user role
                    ac_status: 1 // Active status
                });
                return { success: true, message: "Successfully signed in with Google" };
            } else {
                // Try to connect to backend API
                const response = await axios.post(
                    `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/google`,
                    {
                        email: googleUser.email,
                        full_name: googleUser.displayName,
                        profile_photo: googleUser.photoURL,
                        google_uid: googleUser.uid,
                        signup_type: "g"
                    },
                    { withCredentials: true }
                );
                await handleFetchMe();
                return { success: true, message: response?.data?.message };
            }
        } catch (error) {
            // If backend is not available, use Firebase user data
            setUser({
                status: true,
                uid: googleUser.uid,
                email: googleUser.email,
                displayName: googleUser.displayName,
                photoURL: googleUser.photoURL,
                role: 3, // Default user role
                ac_status: 1 // Active status
            });
            const msg = error?.response?.data || error.message;
            setUserError({ status: true, message: msg });

            const isHibernated = msg?.message?.includes("hibernation");
            const isDeleted = msg?.message?.includes("deleted");

            if (isHibernated || isDeleted) {
                return {
                    success: false,
                    message: msg?.message || "Account access restricted.",
                    isBlocked: true
                };
            }

            // Still consider it a success since we have Firebase user data
            return { success: true, message: "Successfully signed in with Google (using Firebase)" };
        } finally {
            setUserLoading(false);
        }
    };

    // Handle Google authentication for recruiters with Firebase
    const handleGoogleAuthRecruiter = async (googleUser) => {
        setUserLoading(true);
        try {
            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // Use Firebase user data directly with recruiter role
                setUser({
                    status: true,
                    uid: googleUser.uid,
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                    photoURL: googleUser.photoURL,
                    role: 2, // Recruiter role
                    ac_status: 1 // Active status
                });
                return { success: true, message: "Successfully signed in as recruiter with Google" };
            } else {
                // Try to connect to backend API
                const response = await axios.post(
                    `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/google-recruiter`,
                    {
                        email: googleUser.email,
                        full_name: googleUser.displayName,
                        profile_photo: googleUser.photoURL,
                        google_uid: googleUser.uid,
                        signup_type: "g"
                    },
                    { withCredentials: true }
                );

                await handleFetchMe();  // Assuming this fetches current user info
                return { success: true, message: response?.data?.message };
            }
        } catch (error) {
            // If backend is not available, use Firebase user data
            setUser({
                status: true,
                uid: googleUser.uid,
                email: googleUser.email,
                displayName: googleUser.displayName,
                photoURL: googleUser.photoURL,
                role: 2, // Recruiter role
                ac_status: 1 // Active status
            });
            const msg = error?.response?.data || error.message;
            setUserError({ status: true, message: msg });

            // Still consider it a success since we have Firebase user data
            return { success: true, message: "Successfully signed in as recruiter with Google (using Firebase)" };
        } finally {
            setUserLoading(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            if (!SYSTEM_CONFIG.USE_MOCK_API && SYSTEM_CONFIG.BASE_API_URL) {
                // Try to logout from backend API
                await axios.post(
                    `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/logout`,
                    {},
                    { withCredentials: true }
                );
            }
            // Sign out from Firebase
            await auth.signOut();
        } catch (err) {
            console.error("Logout error", err.message);
            // Even if backend logout fails, sign out from Firebase
            await auth.signOut();
        } finally {
            setUser({ status: false });
        }
    };

    const passing = {
        userLoading,
        userError,
        user,
        handleFetchMe,
        handleGoogleAuth,
        handleGoogleAuthRecruiter,
        handleLogout,
    };

    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContext };