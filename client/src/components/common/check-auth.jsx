import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckAuth({ children }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  // 🚫 Not logged in & not on auth route
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    console.log("Redirecting to /auth/register because user is not authenticated");
    return <Navigate to="/auth/register" replace />;
  }

  // 🔒 Logged in & trying to access auth page
  if (
    isAuthenticated &&
    location.pathname.startsWith("/auth")
  ) {
    const role = user?.role?.toLowerCase(); // case-insensitive check
    if (role === "admin") {
      console.log("Redirecting to /admin/dashboard because user is admin");
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      console.log("Redirecting to /shop/home because user is regular");
      return <Navigate to="/shop/home" replace />;
    }
  }

  // 🔓 Otherwise allow access
  return children || <Outlet />;
}

export default CheckAuth;
