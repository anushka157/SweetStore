import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedDeliveryPartnerRoute() {
  const token = localStorage.getItem(
    "jwtDeliveryPartnerToken"
  );

  if (!token) {
    return (
      <Navigate
        to="/panel/delivery-partner/login"
        replace
      />
    );
  }

  return <Outlet />;
}