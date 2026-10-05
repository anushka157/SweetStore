import { useEffect, useState } from "react";
import { domain } from "../lib/utils/domain";
interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;
  category_type: string;
  price: number;
  stock: number;
  seller_id: string;
  approval_status: string;
  created_at: string;
  updated_at?: string;

  // Seller information
  seller_name?: string;
  seller_phone?: string;

  // Product image
  image_url?: string;
}

interface Seller {
  seller_id: string;
  registered_user_id: string;
  business_name: string;
  phone_number: string;
  approval_status: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  country?: string;
  zip_code?: string;
}

interface DeliveryPartner {
  delivery_partner_id: string;
  registered_user_id: string;
  name: string;
  phone_number: string;
  approval_status: string;
  email?: string;
}

interface Order {
  order_id: string;
  customer_id: string;
  order_date: string;
  payment_status: string;
  total_amount: number;
  razorpay_order_id?: string;

  order_item_id: string;
  product_id: string;
  seller_id: string;
  quantity: number;
  item_price: number;
  total_price: number;
  delivery_status: string;
  delivery_partner_id?: string | null;

  product_name?: string;

  seller_name?: string;

  delivery_partner_name?: string | null;
  delivery_partner_phone?: string | null;
}

const AdminDashboard = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([]);

  const [activeSection, setActiveSection] = useState<
    "products" | "sellers" | "sellerProducts" | "orders" | "deliveryPartners"
  >("products");

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [loadingSellers, setLoadingSellers] = useState(false);

  const [loadingSellerProducts, setLoadingSellerProducts] =
    useState(false);

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingDeliveryPartners, setLoadingDeliveryPartners] = useState(false);

  const [message, setMessage] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [loadingProductDetails, setLoadingProductDetails] =
    useState(false);

  const token = localStorage.getItem("jwtAdminToken");

  // =====================================================
  // IMAGE URL HELPER
  // =====================================================

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) {
      return "";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    let cleanPath = imageUrl.replace(/^\/+/, "");

    if (!cleanPath.startsWith("uploads/")) {
      cleanPath = `uploads/${cleanPath}`;
    }

return `${domain}/${cleanPath}`;
  };

  // =====================================================
  // FETCH PENDING PRODUCTS
  // =====================================================

  const fetchPendingProducts = async () => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingProducts(true);

      const response = await fetch(
        `${domain}/admin/products/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch products"
        );
        return;
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "Error fetching pending products:",
        error
      );

      setMessage("Unable to connect to server");
    } finally {
      setLoadingProducts(false);
    }
  };

  // =====================================================
  // FETCH PENDING SELLERS
  // =====================================================

  const fetchPendingSellers = async () => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingSellers(true);

      const response = await fetch(
        `${domain}/admin/sellers/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch sellers"
        );
        return;
      }

      setSellers(data.sellers || []);
    } catch (error) {
      console.error(
        "Error fetching pending sellers:",
        error
      );

      setMessage("Unable to connect to server");
    } finally {
      setLoadingSellers(false);
    }
  };

  // =====================================================
  // FETCH ALL SELLER PRODUCTS
  // =====================================================

  const fetchSellerProducts = async () => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingSellerProducts(true);

      const response = await fetch(
        `${domain}/admin/products/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch seller products"
        );
        return;
      }

      setSellerProducts(data.products || []);
    } catch (error) {
      console.error(
        "Error fetching seller products:",
        error
      );

      setMessage("Unable to connect to server");
    } finally {
      setLoadingSellerProducts(false);
    }
  };

  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

  const fetchAllOrders = async () => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingOrders(true);
      setMessage("");

      const response = await fetch(
        `${domain}/admin/orders/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch orders"
        );
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );

      setMessage("Unable to connect to server");
    } finally {
      setLoadingOrders(false);
    }
  };

  // =====================================================
  // FETCH PENDING DELIVERY PARTNERS
  // =====================================================

  const fetchPendingDeliveryPartners = async () => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingDeliveryPartners(true);
      setMessage("");

      const response = await fetch(
        `${domain}/admin/delivery-partners/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch delivery partners"
        );
        return;
      }

      setDeliveryPartners(data.deliveryPartners || []);
    } catch (error) {
      console.error(
        "Error fetching pending delivery partners:",
        error
      );

      setMessage("Unable to connect to server");
    } finally {
      setLoadingDeliveryPartners(false);
    }
  };

  // =====================================================
  // APPROVE DELIVERY PARTNER
  // =====================================================

  const handleApproveDeliveryPartner = async (
    deliveryPartnerId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/delivery-partners/${deliveryPartnerId}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to approve delivery partner"
        );
        return;
      }

      setMessage(
        "Delivery partner approved successfully"
      );

      setDeliveryPartners((currentPartners) =>
        currentPartners.filter(
          (partner) =>
            partner.delivery_partner_id !== deliveryPartnerId
        )
      );
    } catch (error) {
      console.error(
        "Approve delivery partner error:",
        error
      );

      setMessage("Unable to connect to server");
    }
  };

  // =====================================================
  // REJECT DELIVERY PARTNER
  // =====================================================

  const handleRejectDeliveryPartner = async (
    deliveryPartnerId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/delivery-partners/${deliveryPartnerId}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to reject delivery partner"
        );
        return;
      }

      setMessage(
        "Delivery partner rejected successfully"
      );

      setDeliveryPartners((currentPartners) =>
        currentPartners.filter(
          (partner) =>
            partner.delivery_partner_id !== deliveryPartnerId
        )
      );
    } catch (error) {
      console.error(
        "Reject delivery partner error:",
        error
      );

      setMessage("Unable to connect to server");
    }
  };

  // =====================================================
  // DELIVERY PARTNERS SECTION
  // =====================================================

  const handleDeliveryPartnersSection = () => {
    setActiveSection("deliveryPartners");
    setMessage("");

    fetchPendingDeliveryPartners();
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  // =====================================================
  // APPROVE PRODUCT
  // =====================================================

  const handleApproveProduct = async (
    productId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/products/${productId}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to approve product"
        );
        return;
      }

      setMessage(
        "Product approved successfully"
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.product_id !== productId
        )
      );

      fetchSellerProducts();
    } catch (error) {
      console.error(
        "Approve product error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // =====================================================
  // REJECT PRODUCT
  // =====================================================

  const handleRejectProduct = async (
    productId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/products/${productId}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to reject product"
        );
        return;
      }

      setMessage(
        "Product rejected successfully"
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.product_id !== productId
        )
      );

      fetchSellerProducts();
    } catch (error) {
      console.error(
        "Reject product error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // =====================================================
  // APPROVE SELLER
  // =====================================================

  const handleApproveSeller = async (
    sellerId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/sellers/${sellerId}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to approve seller"
        );
        return;
      }

      setMessage(
        "Seller approved successfully"
      );

      setSellers((currentSellers) =>
        currentSellers.filter(
          (seller) =>
            seller.seller_id !== sellerId
        )
      );
    } catch (error) {
      console.error(
        "Approve seller error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // =====================================================
  // REJECT SELLER
  // =====================================================

  const handleRejectSeller = async (
    sellerId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${domain}/admin/sellers/${sellerId}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to reject seller"
        );
        return;
      }

      setMessage(
        "Seller rejected successfully"
      );

      setSellers((currentSellers) =>
        currentSellers.filter(
          (seller) =>
            seller.seller_id !== sellerId
        )
      );
    } catch (error) {
      console.error(
        "Reject seller error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // =====================================================
  // SELLER SECTION
  // =====================================================

  const handleSellerSection = () => {
    setActiveSection("sellers");
    setMessage("");

    fetchPendingSellers();
  };

  // =====================================================
  // SELLER PRODUCTS SECTION
  // =====================================================

  const handleSellerProductsSection = () => {
    setActiveSection("sellerProducts");
    setMessage("");

    fetchSellerProducts();
  };

  // =====================================================
  // ORDERS SECTION
  // =====================================================

  const handleOrdersSection = () => {
    setActiveSection("orders");
    setMessage("");

    fetchAllOrders();
  };

  // =====================================================
  // VIEW PRODUCT DETAILS
  // =====================================================

  const handleViewProduct = async (
    productId: string
  ) => {
    try {
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      setLoadingProductDetails(true);
      setMessage("");

      const response = await fetch(
        `${domain}/admin/products/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Failed to fetch product details"
        );
        return;
      }

      console.log(
        "PRODUCT DETAILS =",
        data.product
      );

      console.log(
        "PRODUCT IMAGE URL =",
        data.product?.image_url
      );

      setSelectedProduct(data.product);
    } catch (error) {
      console.error(
        "GET PRODUCT DETAILS ERROR =",
        error
      );

      setMessage(
        "Unable to connect to server"
      );
    } finally {
      setLoadingProductDetails(false);
    }
  };

  // =====================================================
  // VIEW ORDER DETAILS
  // =====================================================

  const handleViewOrder = (
    order: Order
  ) => {
    setSelectedOrder(order);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "jwtAdminToken"
    );

    window.location.href = "/admin/login";
  };

  // =====================================================
  // DELIVERY STATUS COLOR
  // =====================================================

  const getDeliveryStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Out for Delivery":
        return "bg-blue-100 text-blue-700";

      case "Picked Up":
        return "bg-purple-100 text-purple-700";

      case "Assigned":
        return "bg-yellow-100 text-yellow-700";

      case "Shipped":
        return "bg-indigo-100 text-indigo-700";

      case "Failed Delivery":
        return "bg-red-100 text-red-700";

      case "Canceled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =====================================================
  // PAYMENT STATUS COLOR
  // =====================================================

  const getPaymentStatusClass = (
    status: string
  ) => {
    const lowerStatus =
      status?.toLowerCase();

    if (
      lowerStatus === "paid" ||
      lowerStatus === "completed" ||
      lowerStatus === "success"
    ) {
      return "bg-green-100 text-green-700";
    }

    if (
      lowerStatus === "failed" ||
      lowerStatus === "cancelled" ||
      lowerStatus === "canceled"
    ) {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold">
            SweetStore Admin
          </h1>

          <p className="text-gray-500 text-sm">
            Administration Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Logout
        </button>

      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <div className="flex flex-wrap gap-4 mb-8">

          {/* PRODUCT APPROVAL */}

          <button
            onClick={() => {
              setActiveSection("products");
              setMessage("");
            }}
            className={`px-5 py-2 rounded-md font-medium ${
              activeSection === "products"
                ? "bg-black text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Product Approval
          </button>


          {/* SELLER APPROVAL */}

          <button
            onClick={handleSellerSection}
            className={`px-5 py-2 rounded-md font-medium ${
              activeSection === "sellers"
                ? "bg-black text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Seller Approval
          </button>


          {/* SELLER PRODUCTS */}

          <button
            onClick={handleSellerProductsSection}
            className={`px-5 py-2 rounded-md font-medium ${
              activeSection === "sellerProducts"
                ? "bg-black text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Seller Products
          </button>


          {/* ORDERS */}

          <button
            onClick={handleOrdersSection}
            className={`px-5 py-2 rounded-md font-medium ${
              activeSection === "orders"
                ? "bg-black text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Orders
          </button>

          {/* DELIVERY PARTNERS */}

          <button
            onClick={handleDeliveryPartnersSection}
            className={`px-5 py-2 rounded-md font-medium ${
              activeSection === "deliveryPartners"
                ? "bg-black text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Delivery Partners
          </button>

        </div>


        {/* ================================================= */}
        {/* MESSAGE */}
        {/* ================================================= */}

        {message && (
          <div className="mb-5 bg-white border rounded-md px-4 py-3">
            {message}
          </div>
        )}


        {/* ================================================= */}
        {/* PRODUCT APPROVAL */}
        {/* ================================================= */}

        {activeSection === "products" && (

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-semibold">
                Pending Products
              </h2>

              <p className="text-gray-500">
                Review products submitted by sellers.
              </p>

            </div>


            {loadingProducts ? (

              <div className="bg-white rounded-lg p-8 text-center">
                Loading products...
              </div>

            ) : products.length === 0 ? (

              <div className="bg-white rounded-lg p-8 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No pending products
                </h3>

                <p className="text-gray-500 mt-2">
                  There are currently no products
                  waiting for approval.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {products.map((product) => (

                  <div
                    key={product.product_id}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >

                    <div className="flex justify-between gap-6">

                      <div className="flex-1">

                        <h3 className="text-xl font-semibold">
                          {product.product_name}
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {product.product_description}
                        </p>


                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

                          <div>
                            <p className="text-sm text-gray-500">
                              Category
                            </p>

                            <p className="font-medium">
                              {product.category}
                            </p>
                          </div>


                          <div>
                            <p className="text-sm text-gray-500">
                              Type
                            </p>

                            <p className="font-medium">
                              {product.category_type}
                            </p>
                          </div>


                          <div>
                            <p className="text-sm text-gray-500">
                              Price
                            </p>

                            <p className="font-medium">
                              ₹{product.price}
                            </p>
                          </div>


                          <div>
                            <p className="text-sm text-gray-500">
                              Stock
                            </p>

                            <p className="font-medium">
                              {product.stock}
                            </p>
                          </div>

                        </div>


                        <p className="text-xs text-gray-400 mt-4">
                          Product ID: {product.product_id}
                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex flex-col gap-3 justify-center">

                        <button
                          onClick={() =>
                            handleApproveProduct(
                              product.product_id
                            )
                          }
                          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
                        >
                          Approve
                        </button>


                        <button
                          onClick={() =>
                            handleRejectProduct(
                              product.product_id
                            )
                          }
                          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}


        {/* ================================================= */}
        {/* SELLER APPROVAL */}
        {/* ================================================= */}

        {activeSection === "sellers" && (

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-semibold">
                Pending Sellers
              </h2>

              <p className="text-gray-500">
                Review sellers waiting for approval.
              </p>

            </div>


            {loadingSellers ? (

              <div className="bg-white rounded-lg p-8 text-center">
                Loading sellers...
              </div>

            ) : sellers.length === 0 ? (

              <div className="bg-white rounded-lg p-8 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No pending sellers
                </h3>

                <p className="text-gray-500 mt-2">
                  There are currently no sellers
                  waiting for approval.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {sellers.map((seller) => (

                  <div
                    key={seller.seller_id}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >

                    <div className="flex justify-between gap-6">

                      <div className="flex-1">

                        <h3 className="text-xl font-semibold">
                          {seller.business_name}
                        </h3>


                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">

                          <div>

                            <p className="text-sm text-gray-500">
                              Phone Number
                            </p>

                            <p className="font-medium">
                              {seller.phone_number}
                            </p>

                          </div>


                          <div>

                            <p className="text-sm text-gray-500">
                              City
                            </p>

                            <p className="font-medium">
                              {seller.city || "-"}
                            </p>

                          </div>


                          <div>

                            <p className="text-sm text-gray-500">
                              Country
                            </p>

                            <p className="font-medium">
                              {seller.country || "-"}
                            </p>

                          </div>

                        </div>


                        <div className="mt-5">

                          <p className="text-sm text-gray-500">
                            Address
                          </p>

                          <p className="font-medium">

                            {seller.address_line_1 || "-"}

                            {seller.address_line_2
                              ? `, ${seller.address_line_2}`
                              : ""}

                          </p>

                        </div>


                        <div className="grid grid-cols-2 gap-5 mt-4">

                          <div>

                            <p className="text-sm text-gray-500">
                              ZIP Code
                            </p>

                            <p className="font-medium">
                              {seller.zip_code || "-"}
                            </p>

                          </div>


                          <div>

                            <p className="text-sm text-gray-500">
                              Seller ID
                            </p>

                            <p className="font-medium text-xs break-all">
                              {seller.seller_id}
                            </p>

                          </div>

                        </div>


                        <p className="text-sm text-yellow-600 mt-5 font-medium">
                          Status: {seller.approval_status}
                        </p>

                      </div>


                      {/* SELLER ACTIONS */}

                      <div className="flex flex-col gap-3 justify-center">

                        <button
                          onClick={() =>
                            handleApproveSeller(
                              seller.seller_id
                            )
                          }
                          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
                        >
                          Approve
                        </button>


                        <button
                          onClick={() =>
                            handleRejectSeller(
                              seller.seller_id
                            )
                          }
                          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}


        {/* ================================================= */}
        {/* SELLER PRODUCTS */}
        {/* ================================================= */}

        {activeSection === "sellerProducts" && (

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-semibold">
                Seller Products
              </h2>

              <p className="text-gray-500">
                View products submitted by sellers.
              </p>

            </div>


            {loadingSellerProducts ? (

              <div className="bg-white rounded-lg p-8 text-center">
                Loading seller products...
              </div>

            ) : sellerProducts.length === 0 ? (

              <div className="bg-white rounded-lg p-8 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No seller products found
                </h3>

                <p className="text-gray-500 mt-2">
                  There are currently no products
                  available.
                </p>

              </div>

            ) : (

              <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-50 border-b">

                    <tr>

                      <th className="p-4 text-left">
                        Product
                      </th>

                      <th className="p-4 text-left">
                        Seller
                      </th>

                      <th className="p-4 text-left">
                        Category
                      </th>

                      <th className="p-4 text-left">
                        Price
                      </th>

                      <th className="p-4 text-left">
                        Stock
                      </th>

                      <th className="p-4 text-left">
                        Status
                      </th>

                      <th className="p-4 text-left">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {sellerProducts.map((product) => (

                      <tr
                        key={product.product_id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >

                        <td className="p-4">

                          <div className="font-medium">
                            {product.product_name}
                          </div>

                          <div className="text-xs text-gray-400 break-all mt-1">
                            {product.product_id}
                          </div>

                        </td>


                        <td className="p-4">

                          <div className="font-medium">
                            {product.seller_name || "-"}
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            {product.seller_phone || "-"}
                          </div>

                        </td>


                        <td className="p-4">

                          <div>
                            {product.category}
                          </div>

                          <div className="text-xs text-gray-500">
                            {product.category_type}
                          </div>

                        </td>


                        <td className="p-4">
                          ₹{product.price}
                        </td>


                        <td className="p-4">
                          {product.stock}
                        </td>


                        <td className="p-4">

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              product.approval_status ===
                              "approved"
                                ? "bg-green-100 text-green-700"
                                : product.approval_status ===
                                  "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {product.approval_status}
                          </span>

                        </td>


                        <td className="p-4">

                          <button
                            onClick={() =>
                              handleViewProduct(
                                product.product_id
                              )
                            }
                            disabled={
                              loadingProductDetails
                            }
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                          >
                            {loadingProductDetails
                              ? "Loading..."
                              : "View"}
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        )}


        {/* ================================================= */}
        {/* DELIVERY PARTNERS */}
        {/* ================================================= */}

        {activeSection === "deliveryPartners" && (

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-semibold">
                Pending Delivery Partners
              </h2>

              <p className="text-gray-500">
                Review delivery partners waiting for approval.
              </p>

            </div>

            {loadingDeliveryPartners ? (

              <div className="bg-white rounded-lg p-8 text-center">
                Loading delivery partners...
              </div>

            ) : deliveryPartners.length === 0 ? (

              <div className="bg-white rounded-lg p-8 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No pending delivery partners
                </h3>

                <p className="text-gray-500 mt-2">
                  There are currently no delivery partners
                  waiting for approval.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {deliveryPartners.map((partner) => (

                  <div
                    key={partner.delivery_partner_id}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >

                    <div className="flex justify-between gap-6">

                      <div className="flex-1">

                        <h3 className="text-xl font-semibold">
                          {partner.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

                          <div>
                            <p className="text-sm text-gray-500">
                              Email
                            </p>

                            <p className="font-medium break-all">
                              {partner.email || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Phone Number
                            </p>

                            <p className="font-medium">
                              {partner.phone_number}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Approval Status
                            </p>

                            <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                              {partner.approval_status}
                            </span>
                          </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                          <div>
                            <p className="text-sm text-gray-500">
                              Delivery Partner ID
                            </p>

                            <p className="font-medium text-xs break-all">
                              {partner.delivery_partner_id}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Registered User ID
                            </p>

                            <p className="font-medium text-xs break-all">
                              {partner.registered_user_id}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* DELIVERY PARTNER ACTIONS */}

                      <div className="flex flex-col gap-3 justify-center">

                        <button
                          onClick={() =>
                            handleApproveDeliveryPartner(
                              partner.delivery_partner_id
                            )
                          }
                          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleRejectDeliveryPartner(
                              partner.delivery_partner_id
                            )
                          }
                          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}

        {/* ================================================= */}
        {/* ORDERS */}
        {/* ================================================= */}

        {activeSection === "orders" && (

          <section>

            <div className="mb-6">

              <h2 className="text-2xl font-semibold">
                All Orders
              </h2>

              <p className="text-gray-500">
                View and monitor all customer orders.
              </p>

            </div>


            {loadingOrders ? (

              <div className="bg-white rounded-lg p-8 text-center">
                Loading orders...
              </div>

            ) : orders.length === 0 ? (

              <div className="bg-white rounded-lg p-8 text-center shadow-sm">

                <h3 className="text-lg font-semibold">
                  No orders found
                </h3>

                <p className="text-gray-500 mt-2">
                  There are currently no customer orders.
                </p>

              </div>

            ) : (

              <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">

                <table className="w-full min-w-[1200px]">

                  <thead className="bg-gray-50 border-b">

                    <tr>

                      <th className="p-4 text-left">
                        Order
                      </th>

                      <th className="p-4 text-left">
                        Customer
                      </th>

                      <th className="p-4 text-left">
                        Product
                      </th>

                      <th className="p-4 text-left">
                        Seller
                      </th>

                      <th className="p-4 text-left">
                        Quantity
                      </th>

                      <th className="p-4 text-left">
                        Amount
                      </th>

                      <th className="p-4 text-left">
                        Payment
                      </th>

                      <th className="p-4 text-left">
                        Delivery Partner
                      </th>

                      <th className="p-4 text-left">
                        Delivery Status
                      </th>

                      <th className="p-4 text-left">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {orders.map((order) => (

                      <tr
                        key={order.order_item_id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >

                        {/* ORDER */}

                        <td className="p-4">

                          <div className="font-medium">
                            {order.order_id}
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            {order.order_date
                              ? new Date(
                                  order.order_date
                                ).toLocaleString()
                              : "-"}
                          </div>

                        </td>


                        {/* CUSTOMER */}

                        <td className="p-4">

                          <div className="font-medium">
                            Customer
                          </div>

                          <div className="text-xs text-gray-500 break-all">
                            {order.customer_id}
                          </div>

                        </td>


                        {/* PRODUCT */}

                        <td className="p-4">

                          <div className="font-medium">
                            {order.product_name || "-"}
                          </div>

                          <div className="text-xs text-gray-500 break-all mt-1">
                            {order.product_id}
                          </div>

                        </td>


                        {/* SELLER */}

                        <td className="p-4">

                          <div className="font-medium">
                            {order.seller_name || "-"}
                          </div>

                          <div className="text-xs text-gray-500 break-all">
                            {order.seller_id}
                          </div>

                        </td>


                        {/* QUANTITY */}

                        <td className="p-4">
                          {order.quantity}
                        </td>


                        {/* AMOUNT */}

                        <td className="p-4">

                          <div className="font-medium">
                            ₹
                            {Number(
                              order.total_price || 0
                            ).toFixed(2)}
                          </div>

                          <div className="text-xs text-gray-500">
                            ₹
                            {Number(
                              order.item_price || 0
                            ).toFixed(2)}{" "}
                            each
                          </div>

                        </td>


                        {/* PAYMENT */}

                        <td className="p-4">

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusClass(
                              order.payment_status
                            )}`}
                          >
                            {order.payment_status || "-"}
                          </span>

                        </td>


                        {/* DELIVERY PARTNER */}

                        <td className="p-4">

                          {order.delivery_partner_name ? (

                            <div>

                              <div className="font-medium">
                                {
                                  order.delivery_partner_name
                                }
                              </div>

                              <div className="text-xs text-gray-500">
                                {
                                  order.delivery_partner_phone ||
                                  "-"
                                }
                              </div>

                            </div>

                          ) : (

                            <span className="text-gray-400">
                              Not Assigned
                            </span>

                          )}

                        </td>


                        {/* DELIVERY STATUS */}

                        <td className="p-4">

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDeliveryStatusClass(
                              order.delivery_status
                            )}`}
                          >
                            {order.delivery_status || "-"}
                          </span>

                        </td>


                        {/* ACTION */}

                        <td className="p-4">

                          <button
                            onClick={() =>
                              handleViewOrder(order)
                            }
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        )}

      </main>


      {/* ================================================= */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ================================================= */}

      {selectedProduct && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex justify-between items-center border-b px-6 py-4">

              <h2 className="text-2xl font-bold">
                Product Details
              </h2>

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* PRODUCT IMAGE */}

                <div>

                  <div className="flex items-center justify-center bg-gray-100 rounded-lg min-h-[350px] p-6">

                    {selectedProduct.image_url ? (

                      <img
                        src={getImageUrl(
                          selectedProduct.image_url
                        )}
                        alt={
                          selectedProduct.product_name
                        }
                        className="max-h-[320px] max-w-full object-contain rounded-lg"
                        onError={(event) => {
                          console.error(
                            "IMAGE FAILED TO LOAD:",
                            getImageUrl(
                              selectedProduct.image_url
                            )
                          );

                          event.currentTarget.style.display =
                            "none";

                          const parent =
                            event.currentTarget
                              .parentElement;

                          if (parent) {
                            const errorText =
                              document.createElement(
                                "p"
                              );

                            errorText.className =
                              "text-red-500 text-center";

                            errorText.innerText =
                              "Product image could not be loaded";

                            parent.appendChild(
                              errorText
                            );
                          }
                        }}
                      />

                    ) : (

                      <div className="text-center">

                        <p className="text-gray-400">
                          No product image available
                        </p>

                      </div>

                    )}

                  </div>


                  {selectedProduct.image_url && (

                    <p className="text-xs text-gray-400 mt-2 break-all">
                      Image:{" "}
                      {getImageUrl(
                        selectedProduct.image_url
                      )}
                    </p>

                  )}

                </div>


                {/* PRODUCT INFORMATION */}

                <div>

                  <h3 className="text-2xl font-bold mb-3">
                    {selectedProduct.product_name}
                  </h3>


                  <p className="text-gray-600 mb-6">
                    {selectedProduct.product_description ||
                      "No description available"}
                  </p>


                  <div className="space-y-4">

                    {/* CATEGORY */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Category
                      </p>

                      <p className="font-medium">
                        {selectedProduct.category ||
                          "-"}
                      </p>

                    </div>


                    {/* CATEGORY TYPE */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Category Type
                      </p>

                      <p className="font-medium">
                        {selectedProduct.category_type ||
                          "-"}
                      </p>

                    </div>


                    {/* PRICE */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Price
                      </p>

                      <p className="font-medium text-lg">
                        ₹{selectedProduct.price}
                      </p>

                    </div>


                    {/* STOCK */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Stock
                      </p>

                      <p className="font-medium">
                        {selectedProduct.stock}
                      </p>

                    </div>


                    {/* APPROVAL STATUS */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Approval Status
                      </p>

                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProduct.approval_status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : selectedProduct.approval_status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {
                          selectedProduct.approval_status
                        }
                      </span>

                    </div>


                    {/* CREATED DATE */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Created At
                      </p>

                      <p className="font-medium">
                        {selectedProduct.created_at
                          ? new Date(
                              selectedProduct.created_at
                            ).toLocaleString()
                          : "-"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* SELLER INFORMATION */}

              <div className="border-t mt-8 pt-6">

                <h3 className="text-xl font-semibold mb-5">
                  Seller Information
                </h3>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* BUSINESS NAME */}

                  <div>

                    <p className="text-sm text-gray-500">
                      Business Name
                    </p>

                    <p className="font-medium">
                      {selectedProduct.seller_name ||
                        "-"}
                    </p>

                  </div>


                  {/* PHONE */}

                  <div>

                    <p className="text-sm text-gray-500">
                      Phone Number
                    </p>

                    <p className="font-medium">
                      {selectedProduct.seller_phone ||
                        "-"}
                    </p>

                  </div>


                  {/* SELLER ID */}

                  <div>

                    <p className="text-sm text-gray-500">
                      Seller ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedProduct.seller_id}
                    </p>

                  </div>


                  {/* PRODUCT ID */}

                  <div>

                    <p className="text-sm text-gray-500">
                      Product ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedProduct.product_id}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="border-t px-6 py-4 flex justify-end">

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* ORDER DETAILS MODAL */}
      {/* ================================================= */}

      {selectedOrder && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex justify-between items-center border-b px-6 py-4">

              <div>

                <h2 className="text-2xl font-bold">
                  Order Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Order ID: {selectedOrder.order_id}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6">

              {/* ORDER INFORMATION */}

              <div>

                <h3 className="text-lg font-semibold mb-4">
                  Order Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.order_id}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="font-medium">
                      {selectedOrder.order_date
                        ? new Date(
                            selectedOrder.order_date
                          ).toLocaleString()
                        : "-"}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Customer ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.customer_id}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusClass(
                        selectedOrder.payment_status
                      )}`}
                    >
                      {selectedOrder.payment_status ||
                        "-"}
                    </span>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Order Total
                    </p>

                    <p className="font-medium text-lg">
                      ₹
                      {Number(
                        selectedOrder.total_amount || 0
                      ).toFixed(2)}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Razorpay Order ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.razorpay_order_id ||
                        "Not applicable"}
                    </p>

                  </div>

                </div>

              </div>


              {/* ITEM INFORMATION */}

              <div className="border-t mt-8 pt-6">

                <h3 className="text-lg font-semibold mb-4">
                  Order Item
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Product
                    </p>

                    <p className="font-medium">
                      {selectedOrder.product_name ||
                        "-"}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Product ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.product_id}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Quantity
                    </p>

                    <p className="font-medium">
                      {selectedOrder.quantity}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Item Price
                    </p>

                    <p className="font-medium">
                      ₹
                      {Number(
                        selectedOrder.item_price || 0
                      ).toFixed(2)}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Item Total
                    </p>

                    <p className="font-medium">
                      ₹
                      {Number(
                        selectedOrder.total_price || 0
                      ).toFixed(2)}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Order Item ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.order_item_id}
                    </p>

                  </div>

                </div>

              </div>


              {/* SELLER */}

              <div className="border-t mt-8 pt-6">

                <h3 className="text-lg font-semibold mb-4">
                  Seller Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Seller
                    </p>

                    <p className="font-medium">
                      {selectedOrder.seller_name ||
                        "-"}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Seller ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.seller_id}
                    </p>

                  </div>

                </div>

              </div>


              {/* DELIVERY */}

              <div className="border-t mt-8 pt-6">

                <h3 className="text-lg font-semibold mb-4">
                  Delivery Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Delivery Status
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getDeliveryStatusClass(
                        selectedOrder.delivery_status
                      )}`}
                    >
                      {selectedOrder.delivery_status ||
                        "-"}
                    </span>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Delivery Partner
                    </p>

                    <p className="font-medium">
                      {selectedOrder.delivery_partner_name ||
                        "Not Assigned"}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Partner Phone
                    </p>

                    <p className="font-medium">
                      {selectedOrder.delivery_partner_phone ||
                        "-"}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Delivery Partner ID
                    </p>

                    <p className="font-medium text-xs break-all">
                      {selectedOrder.delivery_partner_id ||
                        "Not Assigned"}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="border-t px-6 py-4 flex justify-end">

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminDashboard;