import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DeliveryPartner() {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(
      "jwtDeliveryPartnerToken"
    );

    navigate(
      "/panel/delivery-partner/login"
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <header className="flex justify-between items-center py-4 px-6 border-b-2 border-accent bg-background">

        <Link to="/">
          <img
            className="w-40"
            src="/main-logo.png"
            alt="Main Logo"
          />
        </Link>

        <nav>
          <ul className="flex space-x-6 items-center">

            <li>
              <Link
                to="/panel/delivery-partner"
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/panel/delivery-partner/orders"
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                My Deliveries
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Logout
              </button>
            </li>

          </ul>
        </nav>

      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}