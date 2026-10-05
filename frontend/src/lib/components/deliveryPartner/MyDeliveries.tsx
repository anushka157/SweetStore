// import { useEffect, useState } from "react";

// type Delivery = {
//   order_item_id: string;
//   order_id: string;
//   product_id: string;
//   seller_id: string;
//   quantity: number;
//   item_price: number;
//   total_price: number;
//   delivery_status: string;
//   delivery_partner_id: string;
//   order_date: string;
//   payment_status: string;
//   product_name: string;
// };

// export default function MyDeliveries() {
//   const [deliveries, setDeliveries] = useState<Delivery[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);
//   const [error, setError] = useState("");

//   async function fetchDeliveries() {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("jwtDeliveryPartnerToken");

//       if (!token) {
//         setError("Please login again.");
//         return;
//       }

//       const response = await fetch(
//         "http://localhost:5005/delivery-partner/orders",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Unable to fetch deliveries");
//         return;
//       }

//       setDeliveries(data.orders || []);
//     } catch (error) {
//       console.error("FETCH DELIVERIES ERROR =", error);
//       setError("Unable to connect to server");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchDeliveries();
//   }, []);

//   async function updateStatus(
//     orderItemId: string,
//     deliveryStatus: string
//   ) {
//     try {
//       const token = localStorage.getItem("jwtDeliveryPartnerToken");

//       if (!token) {
//         setError("Please login again.");
//         return;
//       }

//       setUpdatingId(orderItemId);
//       setError("");

//       const response = await fetch(
//         `http://localhost:5005/delivery-partner/orders/${orderItemId}/status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             deliveryStatus,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Unable to update delivery status");
//         return;
//       }

//       // Refresh deliveries after successful update
//       await fetchDeliveries();
//     } catch (error) {
//       console.error("UPDATE DELIVERY STATUS ERROR =", error);
//       setError("Unable to connect to server");
//     } finally {
//       setUpdatingId(null);
//     }
//   }

//   function getNextStatus(status: string) {
//     if (status === "Assigned") {
//       return "Picked Up";
//     }

//     if (status === "Picked Up") {
//       return "Out for Delivery";
//     }

//     if (status === "Out for Delivery") {
//       return "Delivered";
//     }

//     return null;
//   }

//   if (loading) {
//     return (
//       <section className="w-[86%] mx-auto py-10">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           <h1 className="text-3xl font-bold text-accent">
//             My Deliveries
//           </h1>

//           <p className="text-gray-500 mt-4">
//             Loading deliveries...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="w-[86%] mx-auto py-10">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           <p className="text-red-500">{error}</p>

//           <button
//             onClick={fetchDeliveries}
//             className="mt-4 bg-accent text-white px-5 py-2 rounded-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="w-[86%] mx-auto py-10">
//       <div className="bg-white rounded-xl shadow-md p-8">

//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-accent">
//               My Deliveries
//             </h1>

//             <p className="text-gray-600 mt-2">
//               Manage your assigned deliveries.
//             </p>
//           </div>

//           <button
//             onClick={fetchDeliveries}
//             className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
//           >
//             Refresh
//           </button>
//         </div>

//         {deliveries.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-gray-500">
//               No deliveries assigned to you.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">

//             {deliveries.map((delivery) => {
//               const nextStatus = getNextStatus(
//                 delivery.delivery_status
//               );

//               return (
//                 <div
//                   key={delivery.order_item_id}
//                   className="border rounded-xl p-6 shadow-sm"
//                 >
//                   <div className="flex justify-between items-start">

//                     <div>
//                       <h2 className="text-xl font-bold">
//                         {delivery.product_name}
//                       </h2>

//                       <p className="text-gray-600 mt-2">
//                         Order ID: {delivery.order_id}
//                       </p>

//                       <p className="text-gray-600">
//                         Quantity: {delivery.quantity}
//                       </p>

//                       <p className="text-gray-600">
//                         Total: ₹{delivery.total_price}
//                       </p>

//                       <p className="text-gray-600">
//                         Payment: {delivery.payment_status}
//                       </p>
//                     </div>

//                     <span className="px-4 py-2 rounded-full bg-gray-100 font-semibold">
//                       {delivery.delivery_status}
//                     </span>

//                   </div>

//                   {/* STATUS ACTIONS */}
//                   <div className="mt-6 flex flex-wrap gap-3">

//                     {nextStatus && (
//                       <button
//                         disabled={
//                           updatingId ===
//                           delivery.order_item_id
//                         }
//                         onClick={() =>
//                           updateStatus(
//                             delivery.order_item_id,
//                             nextStatus
//                           )
//                         }
//                         className="bg-accent text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
//                       >
//                         {updatingId ===
//                         delivery.order_item_id
//                           ? "Updating..."
//                           : `Mark as ${nextStatus}`}
//                       </button>
//                     )}

//                     {delivery.delivery_status !==
//                       "Delivered" &&
//                       delivery.delivery_status !==
//                         "Failed Delivery" && (
//                         <button
//                           disabled={
//                             updatingId ===
//                             delivery.order_item_id
//                           }
//                           onClick={() =>
//                             updateStatus(
//                               delivery.order_item_id,
//                               "Failed Delivery"
//                             )
//                           }
//                           className="border border-red-500 text-red-500 px-5 py-2 rounded-lg font-semibold hover:bg-red-50 disabled:opacity-50"
//                         >
//                           Failed Delivery
//                         </button>
//                       )}

//                     {delivery.delivery_status ===
//                       "Delivered" && (
//                       <span className="text-green-600 font-semibold py-2">
//                         ✓ Delivery Completed
//                       </span>
//                     )}

//                   </div>
//                 </div>
//               );
//             })}

//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { domain } from "../../utils/domain";

type Delivery = {
  order_item_id: string;
  order_id: string;
  product_id: string;
  seller_id: string;
  quantity: number;
  item_price: number;
  total_price: number;
  delivery_status: string;
  delivery_partner_id: string;
  order_date: string;
  payment_status: string;
  product_name: string;
};

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function fetchDeliveries() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("jwtDeliveryPartnerToken");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(
        `${domain}/delivery-partner/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to fetch deliveries");
        return;
      }

      setDeliveries(data.orders || []);
    } catch (error) {
      console.error("FETCH DELIVERIES ERROR =", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeliveries();
  }, []);

  async function updateStatus(
    orderItemId: string,
    deliveryStatus: string
  ) {
    try {
      const token = localStorage.getItem("jwtDeliveryPartnerToken");

      if (!token) {
        setError("Please login again.");
        return;
      }

      setUpdatingId(orderItemId);
      setError("");

      const response = await fetch(
        `${domain}/delivery-partner/orders/${orderItemId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to update delivery status");
        return;
      }

      await fetchDeliveries();
    } catch (error) {
      console.error("UPDATE DELIVERY STATUS ERROR =", error);
      setError("Unable to connect to server");
    } finally {
      setUpdatingId(null);
    }
  }

  function getNextStatus(status: string) {
    if (status === "Assigned") {
      return "Picked Up";
    }

    if (status === "Picked Up") {
      return "Out for Delivery";
    }

    if (status === "Out for Delivery") {
      return "Delivered";
    }

    return null;
  }

  if (loading) {
    return (
      <section className="w-[86%] mx-auto py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-accent">
            My Deliveries
          </h1>

          <p className="text-gray-500 mt-4">
            Loading deliveries...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-[86%] mx-auto py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-red-500">{error}</p>

          <button
            onClick={fetchDeliveries}
            className="mt-4 bg-accent text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-[86%] mx-auto py-10">
      <div className="bg-white rounded-xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-accent">
              My Deliveries
            </h1>

            <p className="text-gray-600 mt-2">
              Manage your assigned deliveries.
            </p>
          </div>

          <button
            onClick={fetchDeliveries}
            className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        {deliveries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No deliveries assigned to you.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {deliveries.map((delivery) => {
              const nextStatus = getNextStatus(
                delivery.delivery_status
              );

              return (
                <div
                  key={delivery.order_item_id}
                  className="border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-xl font-bold">
                        {delivery.product_name}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        Order ID: {delivery.order_id}
                      </p>

                      <p className="text-gray-600">
                        Quantity: {delivery.quantity}
                      </p>

                      <p className="text-gray-600">
                        Total: ₹{delivery.total_price}
                      </p>

                      <p className="text-gray-600">
                        Payment: {delivery.payment_status}
                      </p>
                    </div>

                    <span className="px-4 py-2 rounded-full bg-gray-100 font-semibold">
                      {delivery.delivery_status}
                    </span>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">

                    {nextStatus && (
                      <button
                        disabled={
                          updatingId ===
                          delivery.order_item_id
                        }
                        onClick={() =>
                          updateStatus(
                            delivery.order_item_id,
                            nextStatus
                          )
                        }
                        className="bg-accent text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
                      >
                        {updatingId ===
                        delivery.order_item_id
                          ? "Updating..."
                          : `Mark as ${nextStatus}`}
                      </button>
                    )}

                    {delivery.delivery_status !==
                      "Delivered" &&
                      delivery.delivery_status !==
                        "Failed Delivery" && (
                        <button
                          disabled={
                            updatingId ===
                            delivery.order_item_id
                          }
                          onClick={() =>
                            updateStatus(
                              delivery.order_item_id,
                              "Failed Delivery"
                            )
                          }
                          className="border border-red-500 text-red-500 px-5 py-2 rounded-lg font-semibold hover:bg-red-50 disabled:opacity-50"
                        >
                          Failed Delivery
                        </button>
                      )}

                    {delivery.delivery_status ===
                      "Delivered" && (
                      <span className="text-green-600 font-semibold py-2">
                        ✓ Delivery Completed
                      </span>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}