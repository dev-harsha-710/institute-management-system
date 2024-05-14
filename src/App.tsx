import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./features/UserManagement/Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/layout";
import ResetPassword from "./features/UserManagement/Pages/ResetPassword";
import RegistrationForm from "./features/UserManagement/Pages/RegistrationForm";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./features/UserManagement/Pages/Dashboard";
import Cards from "./components/Cards/Cards";
import Courses from "./features/Courses/Pages/Courses";
import ProtectedRoute from "./components/Authorization/ProtectedRoute";
import { UserRole } from "./utils/RolesEnum";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Layout sidebar={<Sidebar />} />}>
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    UserRole.ADMIN,
                    UserRole.FACULTY,
                    UserRole.STUDENT,
                  ]}
                />
              }
            >
              <Route path="/" element={<Courses />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
              <Route path="/income" element={<Courses />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
