// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  RecaptchaVerifier 
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnWN-22ymC-cAzADifLlQJwpzk7dLp-dk",
  authDomain: "hirenext-88a3a.firebaseapp.com",
  databaseURL: "https://hirenext-88a3a-default-rtdb.firebaseio.com",
  projectId: "hirenext-88a3a",
  storageBucket: "hirenext-88a3a.firebasestorage.app",
  messagingSenderId: "642479715845",
  appId: "1:642479715845:web:0ba4a77c5275f1c5db0e6c",
  measurementId: "G-QGYGRJBCLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Analytics initialization failed:", error);
  }
}

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Function to set up recaptcha (only on client side)
const setUpRecaptcha = () => {
  if (typeof window !== "undefined" && auth) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
        }
      });
    } catch (error) {
      console.warn("RecaptchaVerifier setup failed:", error);
    }
  }
};

export { auth, googleProvider, analytics, setUpRecaptcha };