import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import { Login, Landing, Error, Register, RecruiterLogin, RecruiterRegister, CollegeLogin, CollegeRegister, CompanyLogin, CompanyRegister } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "login-recruiter",
                element: <RecruiterLogin />,
            },
            {
                path: "register-recruiter",
                element: <RecruiterRegister />,
            },
            {
                path: "login-company",
                element: <CompanyLogin />,
            },
            {
                path: "register-company",
                element: <CompanyRegister />,
            },
            {
                path: "login-college",
                element: <CollegeLogin />,
            },
            {
                path: "register-college",
                element: <CollegeRegister />,
            },
        ],
    },
]);

export default router;