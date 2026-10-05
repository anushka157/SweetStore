import { useNavigate } from "react-router-dom";

export default function LoginSelection() {
  const navigate = useNavigate();

  const customerToken = localStorage.getItem("jwtCustomerToken");
  const sellerToken = localStorage.getItem("jwtToken");
  const adminToken = localStorage.getItem("jwtAdminToken");
  const deliveryPartnerToken = localStorage.getItem(
    "jwtDeliveryPartnerToken"
  );

  let currentRole = "";

  if (customerToken) {
    currentRole = "Customer";
  } else if (sellerToken) {
    currentRole = "Seller";
  } else if (adminToken) {
    currentRole = "Admin";
  } else if (deliveryPartnerToken) {
    currentRole = "Delivery Partner";
  }

  const switchToCustomer = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtAdminToken");
    localStorage.removeItem("jwtDeliveryPartnerToken");
    navigate("/customer/login");
  };

  const switchToSeller = () => {
    localStorage.removeItem("jwtCustomerToken");
    localStorage.removeItem("jwtAdminToken");
    localStorage.removeItem("jwtDeliveryPartnerToken");
    navigate("/panel/seller/login");
  };

  const switchToAdmin = () => {
    localStorage.removeItem("jwtCustomerToken");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtDeliveryPartnerToken");
    navigate("/admin/login");
  };

  const switchToDeliveryPartner = () => {
    localStorage.removeItem("jwtCustomerToken");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtAdminToken");
    navigate("/panel/delivery-partner/login");
  };

  const continueAsCustomer = () => {
    navigate("/");
  };

  const continueAsSeller = () => {
    navigate("/panel/seller/");
  };

  const continueAsAdmin = () => {
    navigate("/admin/dashboard");
  };

  const continueAsDeliveryPartner = () => {
    navigate("/panel/delivery-partner");
  };

  return (
    <section className="min-h-screen bg-[#f4f0ee] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-8">
        <img
          src="/main-logo.png"
          alt="Indian Sweets and Savories"
          className="w-56 mx-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#7b3f12] text-center">
          Welcome to SweetStore
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Choose how you want to continue
        </p>

        {/* CURRENT CUSTOMER */}
        {currentRole === "Customer" && (
          <div className="mt-8">

            <p className="text-center text-gray-700 mb-4">
              You are currently logged in as a <b>Customer</b>.
            </p>

            <button
              onClick={continueAsCustomer}
              className="w-full bg-[#7b3f12] text-white py-3 rounded-lg hover:bg-[#63300d] transition"
            >
              Continue as Customer
            </button>

            <button
              onClick={switchToSeller}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Seller
            </button>

            <button
              onClick={switchToAdmin}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Admin
            </button>

            <button
              onClick={switchToDeliveryPartner}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Delivery Partner
            </button>

          </div>
        )}

        {/* CURRENT SELLER */}
        {currentRole === "Seller" && (
          <div className="mt-8">

            <p className="text-center text-gray-700 mb-4">
              You are currently logged in as a <b>Seller</b>.
            </p>

            <button
              onClick={continueAsSeller}
              className="w-full bg-[#7b3f12] text-white py-3 rounded-lg hover:bg-[#63300d] transition"
            >
              Continue as Seller
            </button>

            <button
              onClick={switchToCustomer}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Customer
            </button>

            <button
              onClick={switchToAdmin}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Admin
            </button>

            <button
              onClick={switchToDeliveryPartner}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Delivery Partner
            </button>

          </div>
        )}

        {/* CURRENT ADMIN */}
        {currentRole === "Admin" && (
          <div className="mt-8">

            <p className="text-center text-gray-700 mb-4">
              You are currently logged in as an <b>Admin</b>.
            </p>

            <button
              onClick={continueAsAdmin}
              className="w-full bg-[#7b3f12] text-white py-3 rounded-lg hover:bg-[#63300d] transition"
            >
              Continue as Admin
            </button>

            <button
              onClick={switchToCustomer}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Customer
            </button>

            <button
              onClick={switchToSeller}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Seller
            </button>

            <button
              onClick={switchToDeliveryPartner}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Delivery Partner
            </button>

          </div>
        )}

        {/* CURRENT DELIVERY PARTNER */}
        {currentRole === "Delivery Partner" && (
          <div className="mt-8">

            <p className="text-center text-gray-700 mb-4">
              You are currently logged in as a{" "}
              <b>Delivery Partner</b>.
            </p>

            <button
              onClick={continueAsDeliveryPartner}
              className="w-full bg-[#7b3f12] text-white py-3 rounded-lg hover:bg-[#63300d] transition"
            >
              Continue as Delivery Partner
            </button>

            <button
              onClick={switchToCustomer}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Customer
            </button>

            <button
              onClick={switchToSeller}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Seller
            </button>

            <button
              onClick={switchToAdmin}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Switch to Admin
            </button>

          </div>
        )}

        {/* NO LOGIN */}
        {!currentRole && (
          <div className="mt-8">

            <button
              onClick={() => navigate("/customer/login")}
              className="w-full bg-[#7b3f12] text-white py-3 rounded-lg hover:bg-[#63300d] transition"
            >
              Continue as Customer
            </button>

            <button
              onClick={() => navigate("/panel/seller/login")}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Login as Seller
            </button>

            <button
              onClick={() => navigate("/admin/login")}
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Login as Admin
            </button>

            <button
              onClick={() =>
                navigate("/panel/delivery-partner/login")
              }
              className="w-full mt-4 border border-[#7b3f12] text-[#7b3f12] py-3 rounded-lg hover:bg-[#7b3f12] hover:text-white transition"
            >
              Login as Delivery Partner
            </button>

          </div>
        )}

      </div>
    </section>
  );
}