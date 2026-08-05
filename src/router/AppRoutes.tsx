import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes