import React from "react";
import styled from "styled-components";

const LoginTypeSelector = ({ currentType, onTypeChange, isLoading }) => {
    const loginTypes = [
        { value: "user", label: "User", path: "/login" },
        { value: "recruiter", label: "Recruiter", path: "/login-recruiter" },
        { value: "company", label: "Company", path: "/login-company" },
        { value: "college", label: "College", path: "/login-college" }
    ];

    return (
        <SelectorWrapper>
            <div className="selector-container">
                {loginTypes.map((type) => (
                    <button
                        key={type.value}
                        className={`type-btn ${currentType === type.value ? "active" : ""}`}
                        onClick={() => onTypeChange(type)}
                        disabled={isLoading}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
        </SelectorWrapper>
    );
};

const SelectorWrapper = styled.div`
    .selector-container {
        margin-top: 20px;
        display: flex;
        background: #f8f9fa;
        border-radius: 8px;
        padding: 4px;
        margin-bottom: 20px;
    }

    .type-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: transparent;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #6c757d;

        &:hover:not(:disabled) {
            background: #a972ddff;
            color: white;
        }

        &.active {
            background: var(--color-accent);
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
`;

export default LoginTypeSelector;