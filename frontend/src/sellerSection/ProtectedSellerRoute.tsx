import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedSellerRoute() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}