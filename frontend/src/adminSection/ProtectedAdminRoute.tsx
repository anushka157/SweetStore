// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedAdminRoute() {
//   const token = localStorage.getItem("jwtAdminToken");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem("jwtAdminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}