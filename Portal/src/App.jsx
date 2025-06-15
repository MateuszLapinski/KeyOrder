import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import PricingPage from './Pages/PricingPage';
import RegisterPage from './Pages/RegisterPage';
import './App.css';
import RegisterPage2 from './Pages/RegisterPage2';


export const AuthContext = createContext({
    auth: { user: null, token: null },
    setAuth: () => { },
});

export default function App() {
    const [auth, setAuth] = useState({ user: null, token: null });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/register2" element={<RegisterPage2 />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}