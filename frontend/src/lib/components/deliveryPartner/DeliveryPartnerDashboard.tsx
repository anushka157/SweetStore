// import { useEffect, useState } from "react";

// type Delivery = {
//   delivery_status: string;
// };

// export default function DeliveryPartnerDashboard() {
//   const [deliveries, setDeliveries] = useState<Delivery[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchDeliveries() {
//     try {
//       const token = localStorage.getItem("jwtDeliveryPartnerToken");

//       if (!token) return;

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
//         console.error("DASHBOARD DELIVERY ERROR =", data);
//         return;
//       }

//       setDeliveries(data.orders || []);
//     } catch (error) {
//       console.error("FETCH DASHBOARD DELIVERIES ERROR =", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchDeliveries();
//   }, []);

//   // Active deliveries = everything except Delivered and Failed Delivery
//   const assignedCount = deliveries.filter(
//     (delivery) =>
//       delivery.delivery_status !== "Delivered" &&
//       delivery.delivery_status !== "Failed Delivery"
//   ).length;

//   const pickedUpCount = deliveries.filter(
//     (delivery) => delivery.delivery_status === "Picked Up"
//   ).length;

//   const outForDeliveryCount = deliveries.filter(
//     (delivery) => delivery.delivery_status === "Out for Delivery"
//   ).length;

//   const deliveredCount = deliveries.filter(
//     (delivery) => delivery.delivery_status === "Delivered"
//   ).length;

//   if (loading) {
//     return (
//       <section className="w-[86%] mx-auto py-10">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           <h1 className="text-3xl font-bold text-accent">
//             Delivery Partner Dashboard
//           </h1>

//           <p className="text-gray-500 mt-4">
//             Loading dashboard...
//           </p>
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
//               Delivery Partner Dashboard
//             </h1>

//             <p className="text-gray-600 mt-2">
//               Welcome to your delivery dashboard.
//             </p>
//           </div>

//           <button
//             onClick={fetchDeliveries}
//             className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
//           >
//             Refresh
//           </button>
//         </div>

//         <div className="grid md:grid-cols-4 gap-6">

//           {/* Assigned Deliveries */}
//           <div className="border rounded-xl p-6">
//             <h2 className="text-lg font-semibold">
//               Assigned Deliveries
//             </h2>

//             <p className="text-3xl font-bold text-accent mt-3">
//               {assignedCount}
//             </p>

//             <p className="text-sm text-gray-500 mt-2">
//               Active deliveries
//             </p>
//           </div>

//           {/* Picked Up */}
//           <div className="border rounded-xl p-6">
//             <h2 className="text-lg font-semibold">
//               Picked Up
//             </h2>

//             <p className="text-3xl font-bold text-accent mt-3">
//               {pickedUpCount}
//             </p>
//           </div>

//           {/* Out for Delivery */}
//           <div className="border rounded-xl p-6">
//             <h2 className="text-lg font-semibold">
//               Out for Delivery
//             </h2>

//             <p className="text-3xl font-bold text-accent mt-3">
//               {outForDeliveryCount}
//             </p>
//           </div>

//           {/* Delivered */}
//           <div className="border rounded-xl p-6">
//             <h2 className="text-lg font-semibold">
//               Delivered
//             </h2>

//             <p className="text-3xl font-bold text-accent mt-3">
//               {deliveredCount}
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { domain } from "../../utils/domain";

type Delivery = {
  delivery_status: string;
};

export default function DeliveryPartnerDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDeliveries() {
    try {
      const token = localStorage.getItem("jwtDeliveryPartnerToken");

      if (!token) return;

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
        console.error("DASHBOARD DELIVERY ERROR =", data);
        return;
      }

      setDeliveries(data.orders || []);
    } catch (error) {
      console.error("FETCH DASHBOARD DELIVERIES ERROR =", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const assignedCount = deliveries.filter(
    (delivery) =>
      delivery.delivery_status !== "Delivered" &&
      delivery.delivery_status !== "Failed Delivery"
  ).length;

  const pickedUpCount = deliveries.filter(
    (delivery) => delivery.delivery_status === "Picked Up"
  ).length;

  const outForDeliveryCount = deliveries.filter(
    (delivery) => delivery.delivery_status === "Out for Delivery"
  ).length;

  const deliveredCount = deliveries.filter(
    (delivery) => delivery.delivery_status === "Delivered"
  ).length;

  if (loading) {
    return (
      <section className="w-[86%] mx-auto py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-accent">
            Delivery Partner Dashboard
          </h1>

          <p className="text-gray-500 mt-4">
            Loading dashboard...
          </p>
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
              Delivery Partner Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome to your delivery dashboard.
            </p>
          </div>

          <button
            onClick={fetchDeliveries}
            className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Assigned Deliveries
            </h2>

            <p className="text-3xl font-bold text-accent mt-3">
              {assignedCount}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Active deliveries
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Picked Up
            </h2>

            <p className="text-3xl font-bold text-accent mt-3">
              {pickedUpCount}
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Out for Delivery
            </h2>

            <p className="text-3xl font-bold text-accent mt-3">
              {outForDeliveryCount}
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Delivered
            </h2>

            <p className="text-3xl font-bold text-accent mt-3">
              {deliveredCount}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}