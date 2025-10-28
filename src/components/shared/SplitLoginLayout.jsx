import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../Logo";

const SplitLoginLayout = ({ children, role }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Dummy image links for now - you can replace these with your actual links
  const images = [
    "https://bluestock.in/cdn/login-1.webp",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  ];

  // Auto slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Wrapper>
      <div className="container">
        {/* Left Panel - Branding with Image Slideshow */}
        <div className="left-panel">
          <div className="slideshow-container">
            <div className="slideshow">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`slide ${index === currentImageIndex ? 'active' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`Login illustration ${index + 1}`} 
                    className="login-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="welcome-text">
            <h1>Sign in</h1>
            <p>Welcome back! Sign in to access your account and continue your journey with us.</p>
            <div className="stats">
              Trusted by 600,000+ users | Free forever
            </div>
          </div>
        </div>
        
        {/* Right Panel - Login Form */}
        <div className="right-panel">
          <div className="logo-container">
            <Logo />
          </div>
          
          <div className="tabs">
            <div className={`tab ${role === 'user' ? 'active' : ''}`}>
              <a href="/login">User</a>
            </div>
            <div className={`tab ${role === 'recruiter' ? 'active' : ''}`}>
              <a href="/login-recruiter">Recruiter</a>
            </div>
            <div className={`tab ${role === 'company' ? 'active' : ''}`}>
              <a href="/login-company">Company</a>
            </div>
            <div className={`tab ${role === 'college' ? 'active' : ''}`}>
              <a href="/login-college">College</a>
            </div>
          </div>
          
          <div className="form-container">
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  
  .container {
    display: flex;
    width: 100%;
    max-width: 1000px;
    height: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;
  }
  
  /* Left side - Image Slideshow and Text */
  .left-panel {
    flex: 1;
    background-color: #dceef0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
    color: #333;
  }
  
  .slideshow-container {
    width: 100%;
    height: 70%;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .slideshow {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  
  .slide.active {
    opacity: 1;
  }
  
  .login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .welcome-text {
    text-align: center;
    padding: 20px;
    width: 100%;
  }
  
  .welcome-text h1 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  
  .welcome-text p {
    font-size: 16px;
    font-weight: 300;
    max-width: 300px;
    line-height: 1.4;
    margin: 0 auto 20px;
  }
  
  .stats {
    font-size: 14px;
    font-weight: 300;
    opacity: 0.9;
  }
  
  /* Right side - Login Form */
  .right-panel {
    flex: 1;
    background: #ffffff;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  /* Role Tabs */
  .tabs {
    display: flex;
    background: #f5f7fa;
    border-radius: 30px;
    padding: 4px;
    margin-bottom: 15px;
    flex-shrink: 0;
  }
  
  .tab {
    flex: 1;
    text-align: center;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab.active {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    color: #414BEA;
  }
  
  .tab:not(.active):hover {
    background: rgba(0, 0, 0, 0.03);
  }
  
  .tab a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  /* Form container with scroll */
  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .form-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .form-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .form-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  
  .form-container::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
  
  .form-container > div {
    display: flex;
    flex-direction: column;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
    }
    
    .left-panel {
      padding: 20px;
      min-height: 350px;
    }
    
    .slideshow-container {
      height: 60%;
    }
    
    .welcome-text h1 {
      font-size: 28px;
    }
    
    .welcome-text p {
      font-size: 14px;
      line-height: 1.3;
    }
    
    .right-panel {
      padding: 20px 30px;
    }
  }
`;

export default SplitLoginLayout;