import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainApp from "./MainApp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const isAuthenticated = !!localStorage.getItem('access');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* Protect routes by nesting them under ProtectedRoute */}
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/app/*" element={<MainApp />} />
                    {/* Add more protected routes as needed */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
