import { useState } from "react";
import { useLoaderData } from "react-router-dom";import {
    getOrdersBySellerId,
    updateDeliveryStatus,
} from "../data/sellerOrderAPI";
import { OrderItems } from "../types/orderTypes";

export async function loader({
    params,
}: {
    params: { orderId?: string };
}) {
    const response = await getOrdersBySellerId();

    if (typeof response === "string") {
        return response;
    }

    const orderList =
        response.orderItemsBySellerIdResult as OrderItems[];

    const orderDetail = orderList.find(
        (order) => order.order_id === params.orderId
    );

    if (!orderDetail) {
        return "Order not found";
    }

    return orderDetail;
}

export default function OrderDetails() {

    const order = useLoaderData() as OrderItems | string;

    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<OrderItems["delivery_status"]>(
            typeof order === "string"
                ? "Pending"
                : order.delivery_status
        );

    if (typeof order === "string") {
        return (
            <section className="w-[86%] mx-auto py-8">
                <p className="text-red-600 text-center">
                    {order}
                </p>
            </section>
        );
    }

    const handleUpdateStatus = async () => {

        setUpdating(true);
        setMessage("");

        const result = await updateDeliveryStatus(
            order.order_item_id,
            selectedStatus
        );

        if (result.success) {

            setMessage(
                "Delivery status updated successfully."
            );

            setTimeout(() => {
                window.location.reload();
            }, 500);

        } else {

            setMessage(
                result.error ||
                "Unable to update delivery status."
            );

        }

        setUpdating(false);
    };

    return (
        <section className="w-[86%] mx-auto py-8">

            <div className="bg-white shadow-lg rounded-lg p-6">

                <h1 className="text-2xl font-bold text-[#763A12] mb-6">
                    Order Details
                </h1>

                <div className="border rounded-lg p-5">

                    <div className="mb-5">
                        <p className="font-semibold">
                            Order ID
                        </p>

                        <p className="text-gray-600 break-all">
                            {order.order_id}
                        </p>
                    </div>

                    <div className="mb-5">
                        <p className="font-semibold">
                            Product Name
                        </p>

                        <p className="text-gray-600">
                            {order.product_name}
                        </p>
                    </div>

                    <div className="mb-5">
                        <p className="font-semibold">
                            Quantity
                        </p>

                        <p className="text-gray-600">
                            {order.quantity}
                        </p>
                    </div>

                    <div className="mb-5">
                        <p className="font-semibold">
                            Order Price
                        </p>

                        <p className="text-gray-600">
                            ₹{order.total_price}
                        </p>
                    </div>

                    <div className="mb-5">

                        <p className="font-semibold mb-2">
                            Current Delivery Status
                        </p>

                        <span
                            className={
                                selectedStatus === "Delivered"
                                    ? "text-green-600 font-semibold"
                                    : selectedStatus === "Shipped"
                                    ? "text-blue-600 font-semibold"
                                    : selectedStatus === "Canceled"
                                    ? "text-red-600 font-semibold"
                                    : "text-yellow-600 font-semibold"
                            }
                        >
                            {selectedStatus}
                        </span>

                    </div>

                    <div className="mb-5">

                        <label className="font-semibold block mb-2">
                            Update Delivery Status
                        </label>

                        <select
                            value={selectedStatus}
                            onChange={(e) =>
                                setSelectedStatus(
                                    e.target.value as OrderItems["delivery_status"]
                                )
                            }
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                            <option value="Canceled">
                                Canceled
                            </option>

                        </select>

                    </div>

                    <button
                        onClick={handleUpdateStatus}
                        disabled={updating}
                        className="bg-[#763A12] text-white px-5 py-2 rounded-lg hover:bg-[#AA4C0A] disabled:opacity-50"
                    >
                        {updating
                            ? "Updating..."
                            : "Update Status"}
                    </button>

                    {message && (
                        <p className="mt-4 text-green-600">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </section>
    );
}