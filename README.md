# HireNext - Job Portal Application

A comprehensive job portal application built with React, Vite, and Firebase authentication. This application supports multiple user roles including job seekers, recruiters, companies, and colleges.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [User Roles](#user-roles)
- [Mock API Mode](#mock-api-mode)
- [Troubleshooting](#troubleshooting)

## Features

- **Multi-role Authentication**: Supports job seekers, recruiters, companies, and colleges
- **Google OAuth Integration**: One-click sign-in with Google accounts
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Role-based Access**: Different dashboards and features for each user type
- **Landing Page**: Marketing sections with job categories, featured companies, and testimonials
- **Toast Notifications**: User feedback system with react-toastify
- **Form Validation**: Comprehensive form validation with react-hook-form

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, styled-components
- **UI Libraries**: @mui/material, react-icons
- **State Management**: Redux Toolkit, React Redux
- **Routing**: react-router-dom
- **API & Data**: axios, @tanstack/react-query
- **Authentication**: Firebase Authentication, Google Auth
- **Forms**: react-hook-form
- **Animation & Media**: @lottiefiles/dotlottie-react, react-circular-progressbar
- **Dev Tools**: ESLint, PostCSS, autoprefixer

## Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher) or yarn
- Firebase account (for authentication)
- Git (optional, for version control)

## Installation

1. Clone the repository (or navigate to your project directory):
   ```bash
   cd c:\landing-login-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   Or if you're using yarn:
   ```bash
   yarn install
   ```

## Firebase Configuration

This application uses Firebase for authentication. To set up Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Register your app in the Firebase project settings
4. Copy your Firebase configuration values

Update the Firebase configuration in `src/firebase.js` with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Firebase Configuration (optional if directly configured in firebase.js)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# API Configuration
VITE_BASE_API_URL=http://localhost:3000
VITE_BASE_CLIENT_URL=http://localhost:5173

# Enable mock mode to work without backend API
VITE_USE_MOCK_API=true
```

## Running the Application

To start the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

Or with yarn:
```bash
yarn build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
c:\landing-login-app/
├── public/                 # Static assets
│   ├── data/               # JSON data files
│   └── robots.txt          # Robots.txt file
├── src/
│   ├── Layout/             # Layout components
│   ├── Router/             # Routing configuration
│   ├── assets/             # Media assets and CSS wrappers
│   ├── components/         # Reusable UI components
│   │   ├── Home Page/      # Landing page components
│   │   └── shared/         # Shared components
│   ├── config/             # Configuration files
│   ├── context/            # React context providers
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   ├── App.css             # Global styles
│   ├── firebase.js         # Firebase configuration
│   ├── index.css           # Tailwind CSS imports
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## Authentication

The application supports two authentication methods:

1. **Email/Password Registration**: Users can create accounts with email and password
2. **Google OAuth**: One-click sign-in with Google accounts

### Authentication Flow

1. Users can register through role-specific registration pages
2. After registration, users can log in through role-specific login pages
3. Firebase Authentication handles user sessions
4. User context is managed through React Context API

## User Roles

The application supports four distinct user roles:

1. **Job Seekers**: 
   - Registration: `/register`
   - Login: `/login`

2. **Recruiters**: 
   - Registration: `/register-recruiter`
   - Login: `/login-recruiter`

3. **Companies**: 
   - Registration: `/register-company`
   - Login: `/login-company`

4. **Colleges**: 
   - Registration: `/register-college`
   - Login: `/login-college`

## Mock API Mode

When a backend API is not available, the application can run in mock mode:

1. Set `VITE_USE_MOCK_API=true` in your `.env` file
2. The application will use Firebase Authentication directly without backend API calls
3. All authentication features will work without a backend server

To disable mock mode:
1. Set `VITE_USE_MOCK_API=false` in your `.env` file
2. Ensure your backend API is running at the configured URL (default: `http://localhost:3000`)

## Troubleshooting

### Common Issues

1. **"Failed to load resource: net::ERR_CONNECTION_REFUSED"**
   - Solution: Enable mock mode by setting `VITE_USE_MOCK_API=true` in your `.env` file

2. **Firebase configuration errors**
   - Solution: Ensure your Firebase configuration values are correctly set in `src/firebase.js`

3. **Google Sign-In popup blocked**
   - Solution: Make sure you're not using any popup blockers and that third-party cookies are enabled

4. **Installation fails**
   - Solution: Clear npm cache with `npm cache clean --force` and try again

### Development Tips

1. Use `npm run dev` to start the development server with hot reloading
2. Use `npm run lint` to check for code quality issues
3. The application is designed to work without a backend in mock mode
4. All environment variables must be prefixed with `VITE_` to be accessible in the client-side code

## Contributing

This project is configured to work locally without GitHub integration as per user preferences. To contribute:

1. Make changes to the local codebase
2. Test thoroughly using `npm run dev`
3. Build and preview using `npm run build` and `npm run preview`

## License

This project is proprietary and intended for local use only.

## Support

For issues with the application setup or configuration, please refer to the troubleshooting section above or contact the development team.