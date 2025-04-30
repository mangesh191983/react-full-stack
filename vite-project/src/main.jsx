import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5aMBLcY7EC6DGJhYKUs6J_bt7ARR2_Dk",
  authDomain: "ract-fullstack-practise.firebaseapp.com",
  projectId: "ract-fullstack-practise",
  storageBucket: "ract-fullstack-practise.firebasestorage.app",
  messagingSenderId: "413011103523",
  appId: "1:413011103523:web:cab2eeb81b6c39521a8696",
  measurementId: "G-3SWWHE33GY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
