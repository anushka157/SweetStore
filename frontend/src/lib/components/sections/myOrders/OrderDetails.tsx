// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchOrderDetails } from "../../../data/orderAPI";

// interface OrderItem {
//   order_item_id: string;
//   product_id: string;
//   seller_id: string;
//   quantity: number;
//   item_price: number;
//   total_price: number;
//   delivery_status: string;
//   product_name: string;
// }

// interface OrderDetailsType {
//   order_id: string;
//   order_date: string;
//   payment_status: string;
//   total_amount: number;
// }

// interface OrderResponse extends OrderDetailsType {
//   order_item_id: string;
//   product_id: string;
//   seller_id: string;
//   quantity: number;
//   item_price: number;
//   total_price: number;
//   delivery_status: string;
//   product_name: string;
// }

// export default function OrderDetails() {

//   const { orderId } = useParams();

//   const [order, setOrder] = useState<OrderResponse[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const loadOrder = async () => {

//       if (!orderId) {
//         setLoading(false);
//         return;
//       }

//       const response = await fetchOrderDetails(orderId);

//       console.log("ORDER DETAILS =", response);

//       if (
//         typeof response === "object" &&
//         "order" in response
//       ) {
//         setOrder(response.order);
//       }

//       setLoading(false);
//     };

//     loadOrder();

//   }, [orderId]);

//   if (loading) {
//     return (
//       <p className="text-center mt-10">
//         Loading order details...
//       </p>
//     );
//   }

//   if (order.length === 0) {
//     return (
//       <div className="text-center mt-10">
//         <h1 className="text-2xl font-bold">
//           Order Not Found
//         </h1>
//       </div>
//     );
//   }

//   const orderInfo = order[0];

//   return (
//     <div className="bg-[#F2EEEC] min-h-screen p-6">

//       <div className="max-w-5xl mx-auto">

//         <h1 className="text-3xl font-bold text-[#763A12] text-center mb-6">
//           Order Details
//         </h1>

//         <div className="bg-white rounded-lg shadow p-6">

//           <div className="flex justify-between items-start">

//             <div>
//               <p className="font-semibold">
//                 Order ID
//               </p>

//               <p className="text-sm text-gray-600">
//                 {orderInfo.order_id}
//               </p>
//             </div>

//             <p
//               className={
//                 orderInfo.payment_status === "Paid"
//                   ? "text-green-600 font-semibold"
//                   : orderInfo.payment_status === "COD"
//                   ? "text-blue-600 font-semibold"
//                   : "text-red-600 font-semibold"
//               }
//             >
//               {orderInfo.payment_status}
//             </p>

//           </div>

//           <div className="mt-4">

//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(
//                 orderInfo.order_date
//               ).toLocaleString()}
//             </p>

//             <p className="mt-2">
//               <strong>Total:</strong>{" "}
//               ₹{orderInfo.total_amount}
//             </p>

//           </div>

//         </div>

//         <div className="bg-white rounded-lg shadow p-6 mt-6">

//           <h2 className="text-xl font-bold text-[#763A12] mb-4">
//             Products
//           </h2>

//           <div className="space-y-4">

//             {order.map((item) => (

//               <div
//                 key={item.order_item_id}
//                 className="border rounded-lg p-4"
//               >

//                 <div className="flex justify-between">

//                   <div>
//                     <p className="font-semibold">
//                       {item.product_name}
//                     </p>

//                     <p className="text-gray-600">
//                       Quantity: {item.quantity}
//                     </p>

//                     <p className="text-gray-600">
//                       Price: ₹{item.item_price}
//                     </p>
//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold">
//                       ₹{item.total_price}
//                     </p>

//                     <p className="mt-2 text-sm">
//                       Delivery:{" "}
//                       <span className="font-semibold">
//                         {item.delivery_status}
//                       </span>
//                     </p>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderDetails } from "../../../data/orderAPI";

interface OrderItem {
  order_item_id: string;
  product_id: string;
  seller_id: string;
  quantity: number;
  item_price: number;
  total_price: number;
  delivery_status: string;
  product_name: string;
}

interface OrderDetailsType {
  order_id: string;
  order_date: string;
  payment_status: string;
  total_amount: number;
}

interface OrderResponse extends OrderDetailsType {
  order_item_id: string;
  product_id: string;
  seller_id: string;
  quantity: number;
  item_price: number;
  total_price: number;
  delivery_status: string;
  product_name: string;
}

export default function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const response = await fetchOrderDetails(orderId);

      console.log("ORDER DETAILS =", response);

      if (
        typeof response === "object" &&
        "order" in response
      ) {
        setOrder(response.order);
      }

      setLoading(false);
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-center text-base sm:text-lg">
          Loading order details...
        </p>
      </div>
    );
  }

  if (order.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Order Not Found
          </h1>
        </div>
      </div>
    );
  }

  const orderInfo = order[0];

  return (
    <div className="bg-[#F2EEEC] min-h-screen px-3 sm:px-4 md:px-6 py-5 sm:py-6">
      <div className="w-full max-w-5xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#763A12] text-center mb-5 sm:mb-6">
          Order Details
        </h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-5 md:p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

            <div className="min-w-0">
              <p className="font-semibold text-base sm:text-lg">
                Order ID
              </p>

              <p className="text-sm sm:text-base text-gray-600 break-all mt-1">
                {orderInfo.order_id}
              </p>
            </div>

            <p
              className={
                orderInfo.payment_status === "Paid"
                  ? "text-green-600 font-semibold"
                  : orderInfo.payment_status === "COD"
                  ? "text-blue-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {orderInfo.payment_status}
            </p>

          </div>

          <div className="mt-4 space-y-2 text-sm sm:text-base">

            <p className="break-words">
              <strong>Date:</strong>{" "}
              {new Date(
                orderInfo.order_date
              ).toLocaleString()}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              ₹{orderInfo.total_amount}
            </p>

          </div>

        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-5 md:p-6 mt-5 sm:mt-6">

          <h2 className="text-lg sm:text-xl font-bold text-[#763A12] mb-4">
            Products
          </h2>

          <div className="space-y-4">

            {order.map((item) => (

              <div
                key={item.order_item_id}
                className="border rounded-lg p-4 sm:p-5"
              >

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                  {/* Product Information */}
                  <div className="min-w-0">

                    <p className="font-semibold text-base sm:text-lg break-words">
                      {item.product_name}
                    </p>

                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      Price: ₹{item.item_price}
                    </p>

                  </div>

                  {/* Price + Delivery */}
                  <div className="sm:text-right">

                    <p className="font-semibold text-base sm:text-lg">
                      ₹{item.total_price}
                    </p>

                    <p className="mt-2 text-sm sm:text-base">
                      Delivery:{" "}
                      <span
                        className={
                          item.delivery_status === "Delivered"
                            ? "font-semibold text-green-600"
                            : item.delivery_status === "Canceled"
                            ? "font-semibold text-red-600"
                            : item.delivery_status === "Out for Delivery"
                            ? "font-semibold text-blue-600"
                            : "font-semibold text-yellow-600"
                        }
                      >
                        {item.delivery_status}
                      </span>
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}