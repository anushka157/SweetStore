// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// interface Order {
//   order_id: string;
//   customer_id: string;
//   order_date: string;
//   payment_status: string;
//   total_amount: number;
// }

// export default function MyOrders() {
//     const navigate = useNavigate();

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("jwtCustomerToken");

//         if (!token) {
//           console.log("No customer token found");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(
//           "http://localhost:5005/order/my-orders",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();

// console.log("MY ORDERS =", data);

// if (response.ok) {
//   setOrders(data.orders || []);

//   console.log(
//     "ORDER IDS =",
//     (data.orders || []).map((order: Order) => order.order_id)
//   );
// } else {
//   console.log("ERROR =", data);
// }
//       } catch (error) {
//         console.log("FETCH ORDERS ERROR =", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-10">Loading orders...</p>;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center mt-10">
//         <h1 className="text-3xl font-bold">My Orders</h1>
//         <p className="mt-4">You have no orders yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#F2EEEC] min-h-screen p-6">

//       <h1 className="text-3xl font-bold text-[#763A12] mb-6 text-center">
//         My Orders
//       </h1>

//       <div className="max-w-5xl mx-auto space-y-4">

//         {orders.map((order) => (
//           <div
//             key={order.order_id}
//             className="bg-white rounded-lg shadow p-5"
//           >

//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">
//                   Order ID:
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   {order.order_id}
//                 </p>
//               </div>

//               <p
//  className={
//   order.payment_status === "Paid"
//     ? "text-green-600 font-semibold"
//     : order.payment_status === "COD"
//     ? "text-blue-600 font-semibold"
//     : "text-red-600 font-semibold"
// }          >
//                 {order.payment_status}
//               </p>
//             </div>

//             <div className="mt-4">
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(order.order_date).toLocaleString()}
//               </p>

//               <p>
//                 <strong>Total:</strong> ₹{order.total_amount}
//               </p>
//             </div>
//             <div className="mt-4 flex justify-end">
//   <button
//     onClick={() => navigate(`/my-orders/${order.order_id}`)}
//     className="px-5 py-2 bg-[#763A12] text-white rounded-lg hover:bg-[#AA4C0A] transition"
//   >
//     View Details
//   </button>
// </div>
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }
import { domain } from "../../../utils/domain";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  order_id: string;
  customer_id: string;
  order_date: string;
  payment_status: string;
  total_amount: number;
}

export default function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtCustomerToken");

        if (!token) {
          console.log("No customer token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${domain}/order/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("MY ORDERS =", data);

        if (response.ok) {
          setOrders(data.orders || []);

          console.log(
            "ORDER IDS =",
            (data.orders || []).map(
              (order: Order) => order.order_id
            )
          );
        } else {
          console.log("ERROR =", data);
        }
      } catch (error) {
        console.log("FETCH ORDERS ERROR =", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  {/* LOADING */}
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-center text-base sm:text-lg">
          Loading orders...
        </p>
      </div>
    );
  }

  {/* NO ORDERS */}
  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          My Orders
        </h1>

        <p className="mt-3 sm:mt-4 text-gray-600">
          You have no orders yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-[#F2EEEC]
        min-h-screen
        px-3
        sm:px-5
        md:px-6
        py-5
        sm:py-6
      "
    >
      {/* PAGE TITLE */}
      <h1
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-[#763A12]
          mb-5
          sm:mb-6
          text-center
        "
      >
        My Orders
      </h1>

      {/* ORDERS */}
      <div className="w-full max-w-5xl mx-auto space-y-4">

        {orders.map((order) => (
          <div
            key={order.order_id}
            className="
              bg-white
              rounded-lg
              shadow
              p-4
              sm:p-5
              overflow-hidden
            "
          >
            {/* ORDER HEADER */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                sm:items-center
                gap-3
              "
            >
              {/* ORDER ID */}
              <div className="min-w-0">
                <p className="font-semibold">
                  Order ID:
                </p>

                <p
                  className="
                    text-sm
                    text-gray-600
                    break-all
                    mt-1
                  "
                >
                  {order.order_id}
                </p>
              </div>

              {/* PAYMENT STATUS */}
              <p
                className={
                  order.payment_status === "Paid"
                    ? "text-green-600 font-semibold"
                    : order.payment_status === "COD"
                    ? "text-blue-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {order.payment_status}
              </p>
            </div>

            {/* ORDER INFORMATION */}
            <div className="mt-4 space-y-2 text-sm sm:text-base">
              <p className="break-words">
                <strong>Date:</strong>{" "}
                {new Date(order.order_date).toLocaleString()}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ₹{order.total_amount}
              </p>
            </div>

            {/* VIEW DETAILS */}
            <div
              className="
                mt-4
                flex
                justify-stretch
                sm:justify-end
              "
            >
              <button
                onClick={() =>
                  navigate(`/my-orders/${order.order_id}`)
                }
                className="
                  w-full
                  sm:w-auto
                  px-5
                  py-2.5
                  bg-[#763A12]
                  text-white
                  rounded-lg
                  hover:bg-[#AA4C0A]
                  transition
                "
              >
                View Details
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}