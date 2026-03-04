// src/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZR8RWOP72WMQz5FRQqr2gIJDBX4sazwo",
    authDomain: "berrybeansofficial.firebaseapp.com",
    projectId: "berrybeansofficial",
    storageBucket: "berrybeansofficial.firebasestorage.app",
    messagingSenderId: "542652999446",
    appId: "1:542652999446:web:240934b32660cf954d5237",
    measurementId: "G-16F207TVSZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
