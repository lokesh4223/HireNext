import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../context/UserContext";
import { SYSTEM_CONFIG } from "../config/system-config";
import SplitLoginLayout from "../components/shared/SplitLoginLayout";

const CollegeLogin = () => {
    const { user, handleFetchMe } = useUserContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // Mock login with Firebase
                toast.success("Mock login successful! Using Firebase authentication.");
                // In a real scenario, you would authenticate with Firebase email/password
                // For now, we'll just simulate a successful login
                setTimeout(() => {
                    navigate("/home", { replace: true });
                }, 1000);
            } else {
                const response = await axios.post(
                    `${SYSTEM_CONFIG.BASE_API_URL}/api/auth/login-college`,
                    data,
                    {
                        withCredentials: true,
                    }
                );
                const user = response?.data?.user;
                if (user?.role === 3 && user?.ac_status === 2) {
                    toast.warning(
                        <div>
                            Your account is temporarily on hold. <br/>
                            <a href="#" style={{color: '#007bff'}}>Click here to activate</a>
                        </div>,
                        { autoClose: 3000 }
                    );
                    setIsLoading(false);
                    return;
                }
                if (user?.role === 3 && user?.ac_status === 3) {
                    toast.error(
                        <div>
                            Your account has been permanently disabled.<br/>
                            <a href="#" style={{color: '#007bff'}}>Click here to appeal</a>
                        </div>,
                        { autoClose: 10000 }
                    );
                    setIsLoading(false);
                    return;
                }
                toast.success(response?.data?.message);
                handleFetchMe();
                reset();
                navigate("/home", { replace: true });
            }
        } catch (error) {
            if (SYSTEM_CONFIG.USE_MOCK_API || !SYSTEM_CONFIG.BASE_API_URL) {
                // Even in mock mode, show an error for invalid credentials
                toast.error("Invalid credentials. Using mock mode.");
            } else {
                toast.error(error?.response?.data || "Login failed. Please try again.");
            }
        }
        setIsLoading(false);
    };

    return (
        <SplitLoginLayout role="college">
            <ToastContainer 
                position="top-center"
                autoClose={10000}
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
                <h1>Login as College</h1>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                            })}
                        />
                        {errors?.email && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
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
                            })}
                        />
                        {errors?.password && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className="">
                    <p className="text-center text-[10px] font-semibold opacity-9 mt-3">
                        New as a College.
                        <Link className="ml-1 link" to="/register-college">
                            Create account
                        </Link>
                    </p>
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

    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
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
`;

export default CollegeLogin;