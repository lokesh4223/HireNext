import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/media/logo-main.webp";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";

const Logo = ({ size = 80 }) => {
    return (
        <Wrapper size={size}>
            <img src={logo} alt="HireNext logo" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    max-height: ${({ size }) => size}px;
    max-width: ${({ size }) => size * 2.3}px; /* maintain aspect ratio */

    a {
        display: flex;
        align-items: center;
    }

    img {
        height: 100%;
        width: auto;
        object-fit: contain;
    }

    @media screen and (max-width: 600px) {
        max-height: ${({ size }) => size * 0.8}px;
        max-width: ${({ size }) => size * 2}px;
    }
`;

export default Logo;