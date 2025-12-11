// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../layouts/AppLayout';

const ProtectedRoute = ({ role }) => {
  const { session, profile, loading } = useAuth();

  // Wait for loading to be false to ensure session/profile data is finalized.
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to the landing page
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // If a role is required and the user's role does not match, block access
  if (role && profile?.role !== role) {
    // If a student tries to access an admin URL, redirect them to their dashboard
    if (profile?.role === 'student') {
        return <Navigate to="/student/dashboard" replace />;
    }
    // For any other unexpected role, default to landing
    return <Navigate to="/" replace />;
  }

  // If all checks pass, show the page layout
  return <AppLayout />;
};

export default ProtectedRoute;