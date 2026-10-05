import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// COMMON LOGIN SELECTION
import LoginSelection from "./LoginSelection";

// PROTECTED ROUTES
import ProtectedCustomerRoute from "./lib/components/ProtectedCustomerRoute";
import ProtectedSellerRoute from "./sellerSection/ProtectedSellerRoute";
import ProtectedAdminRoute from "./adminSection/ProtectedAdminRoute";
import ProtectedDeliveryPartnerRoute from "./lib/components/deliveryPartner/ProtectedDeliveryPartnerRoute";

// SELLER
import Seller from "./sellerSection/Seller";

import ProductListing, {
  loader as ProductListingLoader,
} from "./sellerSection/ProductListing";

import Orders, {
  loader as ordersLoader,
} from "./sellerSection/Orders";

// SELLER ORDER DETAILS
import SellerOrderDetails, {
  loader as sellerOrderDetailsLoader,
} from "./sellerSection/lib/components/OrderDetails";

import Reviews from "./sellerSection/Reviews";

import ProductDetails, {
  loader as productDetailsLoader,
} from "./sellerSection/lib/components/ProductDetails";

import Login, {
  action as loginAction,
} from "./sellerSection/sections/login/Login";

import Register, {
  action as registerAction,
} from "./sellerSection/sections/register/Register";

import SubmitProduct, {
  action as submitProductAction,
} from "./sellerSection/sections/inventory/submitProduct";

import ProfilePage from "./sellerSection/sections/profile/ProfilePage";

import EditProfile from "./sellerSection/sections/profile/EditProfle";

// CUSTOMER
import CustomerProductDetails, {
  loader as CustomerProductDetailsLoader,
} from "./lib/components/sections/productDetails/CustomerProductDetails";

import Product, {
  loader as productLoader,
} from "./lib/components/sections/products";

import {
  action as AddReviewAction,
} from "./lib/components/sections/review/AddReview";

import Header from "./lib/components/sections/Header/Header";

import Footer from "./lib/components/sections/Footer";

import Cart, {
  action as cartAction,
} from "./lib/components/sections/Header/Cart";

// ADMIN
import AdminLogin, {
  action as AdminLoginAction,
} from "./adminSection/AdminLogin";

import AdminDashboard from "./adminSection/AdminDashboard";

// CUSTOMER AUTH
import CustomerRegister, {
  action as CustomerRegisterAction,
} from "./lib/components/sections/register/CustomerRegister";

import CustomerLogin, {
  action as CustomerLoginAction,
} from "./lib/components/sections/login/CustomerLogin";

// CUSTOMER CHECKOUT / ORDERS
import Checkout from "./lib/components/sections/checkout/Checkout";

import MyOrders from "./lib/components/sections/myOrders/MyOrders";

// CUSTOMER ORDER DETAILS
import CustomerOrderDetails from "./lib/components/sections/myOrders/OrderDetails";

// =========================================================
// DELIVERY PARTNER
// =========================================================

import DeliveryPartnerLogin, {
  action as DeliveryPartnerLoginAction,
} from "./lib/components/deliveryPartner/DeliveryPartnerLogin";

import DeliveryPartnerRegister, {
  action as DeliveryPartnerRegisterAction,
} from "./lib/components/deliveryPartner/DeliveryPartnerRegister";
import DeliveryPartner from "./lib/components/deliveryPartner/DeliveryPartner";

import DeliveryPartnerDashboard from "./lib/components/deliveryPartner/DeliveryPartnerDashboard";

import MyDeliveries from "./lib/components/deliveryPartner/MyDeliveries";




// =========================================================
// ROOT
// =========================================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// =========================================================
// ROUTER
// =========================================================

const router = createBrowserRouter([
  // =========================================================
  // CUSTOMER SECTION
  // =========================================================

  {
    path: "/",

    element: <App />,

    children: [
      // -----------------------------------------------------
      // HOME - PUBLIC
      // -----------------------------------------------------

      {
        index: true,

        element: (
          <>
            <Header />

            <section className="my-2 mx-10 m-auto border">
              <Product />
            </section>

            <Footer />
          </>
        ),

        loader: productLoader,
      },

      // -----------------------------------------------------
      // PRODUCT DETAILS - PUBLIC
      // -----------------------------------------------------

      {
        path: "details",

        element: <CustomerProductDetails />,

        action: AddReviewAction,

        loader: CustomerProductDetailsLoader,
      },

      // -----------------------------------------------------
      // CART - PUBLIC
      // -----------------------------------------------------

      {
        path: "cart",

        action: cartAction,

        element: <Cart />,
      },

      // -----------------------------------------------------
      // CUSTOMER PROTECTED PAGES
      // -----------------------------------------------------

      {
        element: <ProtectedCustomerRoute />,

        children: [
          // CHECKOUT
          {
            path: "checkout",

            element: <Checkout />,
          },

          // MY ORDERS
          {
            path: "my-orders",

            element: <MyOrders />,
          },

          // CUSTOMER ORDER DETAILS
          {
            path: "my-orders/:orderId",

            element: <CustomerOrderDetails />,
          },
        ],
      },
    ],
  },

  // =========================================================
  // COMMON LOGIN SELECTION
  // =========================================================

  {
    path: "/login",

    element: <LoginSelection />,
  },

  // =========================================================
  // CUSTOMER REGISTER
  // =========================================================

  {
    path: "/customer/register",

    action: CustomerRegisterAction,

    element: <CustomerRegister />,
  },

  // =========================================================
  // CUSTOMER LOGIN
  // =========================================================

  {
    path: "/customer/login",

    action: CustomerLoginAction,

    element: <CustomerLogin />,
  },

  // =========================================================
  // ADMIN LOGIN - PUBLIC
  // =========================================================

  {
    path: "/admin/login",

    action: AdminLoginAction,

    element: <AdminLogin />,
  },

  // =========================================================
  // ADMIN PROTECTED SECTION
  // =========================================================

  {
    element: <ProtectedAdminRoute />,

    children: [
      {
        path: "/admin/dashboard",

        element: <AdminDashboard />,
      },
    ],
  },

  // =========================================================
  // SELLER SECTION
  // =========================================================

  {
    path: "/panel/seller",

    children: [
      // -----------------------------------------------------
      // SELLER REGISTER - PUBLIC
      // -----------------------------------------------------

      {
        path: "register",

        action: registerAction,

        element: <Register />,
      },

      // -----------------------------------------------------
      // SELLER LOGIN - PUBLIC
      // -----------------------------------------------------

      {
        path: "login",

        action: loginAction,

        element: <Login />,
      },

      // -----------------------------------------------------
      // SELLER PROTECTED SECTION
      // -----------------------------------------------------

      {
        element: <ProtectedSellerRoute />,

        children: [
          {
            element: <Seller />,

            children: [
              // SELLER HOME / PRODUCT LISTING
              {
                index: true,

                loader: ProductListingLoader,

                element: <ProductListing />,
              },

              // SELLER PROFILE
              {
                path: "profile",

                element: <ProfilePage />,
              },

              // EDIT SELLER PROFILE
              {
                path: "profile/edit",

                element: <EditProfile />,
              },

              // SELLER PRODUCT DETAILS
              {
                path: "product/:productId",

                element: <ProductDetails />,

                loader: productDetailsLoader,
              },

              // SELLER ORDERS
              {
                path: "orders",

                loader: ordersLoader,

                element: <Orders />,
              },

              // SELLER ORDER DETAILS
              {
                path: "orders/:orderId",

                element: <SellerOrderDetails />,

                loader: sellerOrderDetailsLoader,
              },

              // SELLER REVIEWS
              {
                path: "reviews",

                element: <Reviews />,
              },

              // SELLER ADD PRODUCT
              {
                path: "submitproudct",

                action: submitProductAction,

                element: <SubmitProduct />,
              },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================
  // DELIVERY PARTNER SECTION
  // =========================================================

  {
    path: "/panel/delivery-partner",

    children: [

      {
  // -----------------------------------------------------
  // DELIVERY PARTNER REGISTER - PUBLIC
  // -----------------------------------------------------

  path: "register",

  action: DeliveryPartnerRegisterAction,

  element: <DeliveryPartnerRegister />,
},
      // -----------------------------------------------------
      // DELIVERY PARTNER LOGIN - PUBLIC
      // -----------------------------------------------------

      {
        path: "login",

        action: DeliveryPartnerLoginAction,

        element: <DeliveryPartnerLogin />,
      },

      // -----------------------------------------------------
      // DELIVERY PARTNER PROTECTED SECTION
      // -----------------------------------------------------

      {
        element: <ProtectedDeliveryPartnerRoute />,

        children: [
          {
            element: <DeliveryPartner />,

            children: [
              // DELIVERY PARTNER DASHBOARD
              {
                index: true,

                element: <DeliveryPartnerDashboard />,
              },

              // DELIVERY PARTNER MY DELIVERIES
              {
                path: "orders",

                element: <MyDeliveries />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// =========================================================
// RENDER
// =========================================================

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);