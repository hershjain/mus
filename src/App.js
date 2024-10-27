import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainApp from "./MainApp";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/app/*" element={<MainApp />} />
            </Routes>
        </Router>
    );
}

export default App;
