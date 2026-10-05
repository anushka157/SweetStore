import { Link, useLoaderData } from "react-router-dom";
import { getOrdersBySellerId } from "./lib/data/sellerOrderAPI";
import { OrderItems } from "./lib/types/orderTypes";

export async function loader() {
  const response = await getOrdersBySellerId();

  return response;
}

export default function Orders() {
  const loaderData = useLoaderData() as
    | {
        orderItemsBySellerIdResult: OrderItems[];
      }
    | string;

  if (typeof loaderData === "string") return <p>{loaderData}</p>;

  const orderList = loaderData.orderItemsBySellerIdResult;

  const renderOrderList = orderList.map((order, index) => (
    <tr
      key={index}
      className="hover:bg-yellow-50 transition-colors duration-200"
    >
      <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
  <td className="border border-gray-300 p-3 text-center truncate">
    <Link
        to={`${order.order_id}`}
        className="text-blue-600 underline hover:no-underline"
    >
        {order.order_id}
    </Link>
</td>
      <td className="border border-gray-300 p-3 text-center">
        <Link
          to={`${order.order_id}`}
          className="text-blue-600 underline hover:no-underline"
        >
          {order.product_name}
        </Link>
      </td>
      <td
        className={`border border-gray-300 p-3 text-center ${
          order.delivery_status === "Delivered"
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }`}
      >
        {order.delivery_status}
      </td>
      <td className="border border-gray-300 p-3 text-center">
        ₹{order.total_price}
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] mx-auto py-8">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-accent text-white">
            <th className="border border-gray-300 p-3 text-center">Sr.</th>
            <th className="border border-gray-300 p-3 text-center">Order ID</th>
            <th className="border border-gray-300 p-3 text-center">
              Product Name
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Order Status
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Order Price
            </th>
          </tr>
        </thead>
        <tbody>{renderOrderList}</tbody>
      </table>
    </section>
  );
}
