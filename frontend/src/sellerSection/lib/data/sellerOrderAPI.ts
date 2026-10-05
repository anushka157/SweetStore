//import { domain } from "../../../lib/utils/domain";

// export async function getOrdersBySellerId() {
//     const jwtToken = localStorage.getItem("jwtToken");

//     if (!jwtToken) {
//         return "You need to login first";
//     }

//     try {
//         const response = await fetch(`${domain}/seller/orders`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//             },
//         });

//         const parsedResponse = await response.json();

//         if (response.status === 401) return "You need to login first";

//         if (response.status === 200) {
//             return parsedResponse;
//         } else {
//             throw new Error("Something went wrong");
//         }

//     } catch (error) {
//         if (error instanceof Error) {
//             return error.message;
//         }

//         return "Couldn't fetch Products";
//     }
// }

import { domain } from "../../../lib/utils/domain";

export async function getOrdersBySellerId() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return "You need to login first";
    }

    try {
        const response = await fetch(`${domain}/seller/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        const responseText = await response.text();

        console.log("SELLER ORDERS STATUS =", response.status);
        console.log("SELLER ORDERS URL =", `${domain}/seller/orders`);
        console.log("SELLER ORDERS RESPONSE =", responseText);

        if (response.status === 401) {
            return "You need to login first";
        }

        if (!response.ok) {
            return `Server error ${response.status}: ${responseText}`;
        }

        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.log("JSON PARSE ERROR =", error);
            return "Server returned an invalid response";
        }

    } catch (error) {
        console.log("GET SELLER ORDERS ERROR =", error);

        if (error instanceof Error) {
            return error.message;
        }

        return "Couldn't fetch Orders";
    }
}
// UPDATE DELIVERY STATUS
export async function updateDeliveryStatus(
    orderItemId: string,
    deliveryStatus: string
) {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        return {
            success: false,
            error: "You need to login first",
        };
    }

    try {
        const response = await fetch(`${domain}/order/delivery-status`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },

            body: JSON.stringify({
                orderItemId,
                deliveryStatus,
            }),
        });

        const parsedResponse = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error:
                    parsedResponse.error ||
                    "Unable to update delivery status",
            };
        }

        return {
            success: true,
            data: parsedResponse,
        };

    } catch (error) {
        console.error("UPDATE DELIVERY STATUS ERROR =", error);

        return {
            success: false,
            error: "Something went wrong while updating delivery status",
        };
    }
}