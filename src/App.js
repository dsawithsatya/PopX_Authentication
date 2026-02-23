import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';
import { isAuthenticated, getCurrentUser } from './utils/auth';

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
