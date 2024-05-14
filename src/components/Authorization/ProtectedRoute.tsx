import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface IProtectedRoute {
  allowedRoles: number[];
}
const ProtectedRoute = ({ allowedRoles }: IProtectedRoute) => {
  const location = useLocation();
  const { auth } = useAuth();
  console.log(auth);

  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
