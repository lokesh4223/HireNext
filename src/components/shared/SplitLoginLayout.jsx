import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../Logo";

const SplitLoginLayout = ({ children, role }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image array with your provided images, including the bluestock image as first
  const images = [
    "https://bluestock.in/cdn/login-1.webp",
    "https://images.academyocean.com/webflow/features/quiz-maker/Frame-4374-p-800.png",
    "https://images.academyocean.com/webflow/solution/sales_onboarding/main-Product-Training-p-800.png",
    "https://images.academyocean.com/webflow/solution/retail/Group-4343_1Group_4343.webp",
    "https://images.academyocean.com/webflow/solution/retail/Roadmap.webp",
    "https://hollanddigital.ie/media/images/default/section/600x400/Holland_Digital_EduVerse_LMS_Professional_3.png"
  ];

  // Auto slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

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
    max-width: 1200px;
    height: 792px; /* Increased from 720px to 792px (10% increase) */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;
  }
  
  /* Left side - Image Slideshow and Text */
  .left-panel {
    flex: 1;
    background-color: #C8C7CA;
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
    background: white;
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