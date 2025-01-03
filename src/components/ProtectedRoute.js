// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = () => {
    // useEffect(() => {
    //     console.log('ProtectedRoute rendered, isAuthenticated:', isAuthenticated);
    // }, [isAuthenticated]);
    const isAuthenticated = !!localStorage.getItem('access');
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
