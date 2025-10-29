import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../utils/googleAuth";
import { SYSTEM_CONFIG } from "../config/system-config";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SplitLoginLayout from "../components/shared/SplitLoginLayout";

const RecruiterRegister = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const [isPasswordMatched, setIsPasswordMatched] = useState({
        status: true,
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const { user } = useUserContext();
    const navigate = useNavigate();

    // Collect all error messages
    const getErrorMessages = () => {
        const errorMessages = [];
        
        // Password mismatch error
        if (!isPasswordMatched.status) {
            errorMessages.push(isPasswordMatched.message);
        }
        
        // Form field errors
        Object.keys(errors).forEach(key => {
            if (errors[key]?.message) {
                errorMessages.push(errors[key].message);
            }
        });
        
        return errorMessages;
    };

    const onSubmit = async (data) => {
        const { full_name, username, email, location_id, gender, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setIsPasswordMatched({
                status: false,
                message: "Both password not matched.",
            });
            return;
        } else {
            setIsLoading(true);
            
            toast.info("Registration under progress, wait a second...", {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false
            });
            
            try {
                if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                    // Use Firebase for registration in mock mode
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    
                    // Dismiss the progress toast and show success toast
                    toast.dismiss();
                    toast.success("Recruiter registration successful with Firebase!", {
                        autoClose: 3000,
                        onClose: () => navigate("/login-recruiter")
                    });
                    
                    reset();
                } else {
                    // Use backend API for registration
                    const user = { full_name, username, email, location_id, gender, password, signup_type: "e" };
                    const response = await axios.post(
                        `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/register-recruiter`,
                        user
                    );

                    toast.dismiss();
                    toast.success("Registration successfully!", {
                        autoClose: 3000,
                        onClose: () => navigate("/login-recruiter")
                    });
                    
                    reset();
                }
            } catch (error) {
                toast.dismiss();
                toast.error(error?.response?.data || error.message || "Registration failed!", { 
                    autoClose: 5000 
                });
            }
        }
        setIsLoading(false);
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            const { user, error } = await signInWithGoogle();
            
            if (error) {
                // Handle unauthorized domain error specifically
                if (error.code === 'auth/unauthorized-domain') {
                    toast.error("Google Sign-In is not authorized for this domain. Please contact the administrator.", { 
                        autoClose: 7000 
                    });
                } else {
                    throw new Error(error.message);
                }
                return;
            }

            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // Use Firebase user data directly in mock mode
                // For recruiter registration, we would need to implement a specific handler
                toast.success("Google Sign Up Successful! Please Login.");
                navigate("/login-recruiter");
            } else {
                // Send Google user data to your backend
                const response = await axios.post(`${SYSTEM_CONFIG.BASE_API_URL}/api/auth/google-recruiter`, {
                    email: user.email,
                    full_name: user.displayName,
                    profile_photo: user.photoURL,
                    google_uid: user.uid,
                    signup_type: "g" // 'g' for Google signup
                });

                toast.success(response?.data?.message || "Google Sign Up Successful! Please Login.");
                navigate("/dashboard");
            }
        } catch (error) {
            // Handle unauthorized domain error specifically
            if (error.code === 'auth/unauthorized-domain') {
                toast.error("Google Sign-In is not authorized for this domain. Please contact the administrator.", { 
                    autoClose: 7000 
                });
            } else {
                toast.error(error?.response?.data || error.message || "Google Sign Up Failed! Please try again.");
            }
        }
        setIsGoogleLoading(false);
    };

    // to hide the popup
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsPasswordMatched({ status: true, message: "" });
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isPasswordMatched.status]);

    return (
        <SplitLoginLayout role="recruiter" alerts={getErrorMessages()}>
            <ToastContainer
                position="top-right"
                zIndex={1000}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <FormWrapper>
                <h1>Register as Recruiter</h1>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="form-row">
                    <div className="row">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        autoComplete="off"
                        placeholder="Enter your full name"
                        {...register("full_name", {
                          required: {
                            value: true,
                            message: "Full Name is required",
                          },
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="row">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email@example.com"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "A valid email is required",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                    </div>
                    
                    <div className="row">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Enter mobile number"
                        {...register("mobile", {
                          required: {
                            value: true,
                            message: "Mobile number is required",
                          },
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="row">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Type Here"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                          maxLength: {
                            value: 20,
                            message: "Password is too long(max 20char)",
                          },
                          minLength: {
                            value: 8,
                            message: "Password is too short (min 8char)",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                            message: "At least one uppercase,one special char and one number",
                          },
                        })}
                      />
                    </div>
                    
                    <div className="row">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: {
                            value: true,
                            message: "Password confirmation is required",
                          },
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="row checkbox-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register("termsAccepted", {
                          required: {
                            value: true,
                            message: "You must accept the terms and conditions",
                          },
                        })}
                      />
                      <span className="checkmark"></span>
                      I accept the terms and conditions
                    </label>
                  </div>
                  
                  <div className="flex justify-center">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                {/* Google Sign Up Button */}
                <div className="google-btn-container">
                    <button 
                        type="button" 
                        className="google-btn"
                        onClick={handleGoogleSignUp}
                        disabled={isGoogleLoading}
                    >
                        <FcGoogle className="google-icon" />
                        {isGoogleLoading ? "Processing..." : "Continue with Google"}
                    </button>
                </div>
                <div className="">
                    <p className="text-center text-[10px] font-semibold opacity-9 mt-3">
                        Already have an account?
                        <Link className="ml-1 link" to="/login-recruiter">
                            Login now
                        </Link>
                    </p>
                </div>
                <div className="alternate-register">
                    <button 
                        type="button" 
                        className="user-btn" 
                        onClick={() => navigate("/register")} 
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register as User"}
                    </button>
                </div>
            </FormWrapper>
        </SplitLoginLayout>
    );
};

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    
    h1 {
        margin-top: 10px;
        text-align: center;
        text-transform: capitalize;
        font-size: calc(1rem + 0.5vw);
        font-weight: 600;
        color: var(--color-primary);
    }
    form {
        margin-top: 15px;
    }

    /* Form row for inline fields */
    .form-row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .form-row > .row {
        flex: 1;
        margin-bottom: 0;
    }

    /* Google Button Styles */
    .google-btn-container {
        margin: 15px 0;
        display: flex;
        justify-content: center;
    }
    .google-btn {
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: white;
        border: 1px solid #d6d8e6;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .google-btn:hover {
        background: #f8f8f8;
    }
    .google-btn:disabled {
        background: #f0f0f0;
        cursor: not-allowed;
    }
    .google-icon {
        font-size: 18px;
    }

    /* Divider Styles */
    .divider {
        display: flex;
        align-items: center;
        margin: 15px 0;
        color: #777;
        font-size: 12px;
    }
    .divider::before,
    .divider::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #d6d8e6;
    }
    .divider::before {
        margin-right: 10px;
    }
    .divider::after {
        margin-left: 10px;
    }

    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .row label {
        font-size: 12px;
        color: var(--color-black);
        font-weight: 400;
        margin-bottom: 2px;
    }

    .row input {
        flex: 1;
        padding: 8px 10px;
        border: 1px solid #d6d8e6;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease-out;
    }

    .row input:focus {
        outline: none;
        box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
    }

    .row input::placeholder {
        color: var(--color-black);
        opacity: 0.7;
    }

    button[type="submit"] {
        min-width: 90px;
        padding: 8px;
        font-size: 16px;
        letter-spacing: 1px;
        background: var(--color-accent);
        color: var(--color-white);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin: 10px auto 0;
        transition: background 0.2s ease-out;
    }

    button[type="submit"]:hover {
        background: var(--color-primary);
    }
    button[type="submit"]:disabled {
        background: var(--color-gray);
        color: var(--color-black);
        cursor: not-allowed;
    }

    /* Blue box button for "Register as User" */
    .alternate-register {
        margin-top: 15px;
    }
    
    .user-btn {
        width: 100%;
        padding: 12px;
        font-size: 15px;
        font-weight: 600;
        background-color: #414BEA;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        box-shadow: 0 4px 6px rgba(65, 75, 234, 0.2);
    }

    .user-btn:hover {
        background-color: #3339d1;
        box-shadow: 0 6px 8px rgba(65, 75, 234, 0.3);
    }

    .user-btn:disabled {
        background-color: #c4c4c4;
        cursor: not-allowed;
        box-shadow: none;
    }

    p {
        margin-top: 10px;
        margin-bottom: 0;
    }

    p .link {
        text-transform: capitalize;
        color: var(--color-primary);
    }
    p .link:hover {
        text-decoration: underline;
    }
    
    /* Checkbox styling */
    .checkbox-row {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--color-black);
        font-weight: 400;
        cursor: pointer;
        gap: 4px; /* Further reduce gap between checkbox and text */
    }
    
    .checkbox-label input {
        width: auto;
        margin: 0; /* Remove default margins */
    }
`;

export default RecruiterRegister;