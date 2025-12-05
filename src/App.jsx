import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 🔹 Auth Provider (must wrap everything)
import { AuthProvider } from "./context/AuthContext";

// 🔹 Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CameraTest from "./pages/CameraTest";
import RegisterFace from "./components/RegisterFace";
import FaceRecognition from "./components/FaceRecognition";

// 🔹 New Pages
import Student from "./pages/Student"; // 🔥 NEW FILE ADDED

// 🔹 Route Guards
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";

// 🔹 UI
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Routes (Student & Admin Both) */}
          <Route
            path="/camera-test"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <CameraTest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/face-register"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <RegisterFace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/face-recognition"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <FaceRecognition />
              </ProtectedRoute>
            }
          />

          {/* 🧑‍🏫 Admin Only */}
          <Route
            path="/dashboard"
            element={
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            }
          />

          {/* 🎓 Student Attendance Panel */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Student />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
