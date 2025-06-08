import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import PricingPage from "./Pages/PricingPage";
import './App.css'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/pricingpage" element={<PricingPage />} />

              
                <Route path="*" element={<h2>404: Nie ma takiej strony</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
