import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedCustomerRoute() {
  const token = localStorage.getItem("jwtCustomerToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}