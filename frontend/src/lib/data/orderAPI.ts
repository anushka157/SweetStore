import { CartItem } from "../types/cartTypes";
import { domain } from "../utils/domain";


// export async function proceedToCheckOut(payload: any) {
//     try {
//         console.log("PAYLOAD =", payload);

        
//         const storedToken = localStorage.getItem("jwtCustomerToken");

// if (!storedToken) {
//     console.log("NO CUSTOMER TOKEN FOUND");
//     return "Please login first";
// }

// const jwtCustomerToken = JSON.parse(storedToken);

// console.log("jwtCustomerToken =", jwtCustomerToken);


//         const response = await fetch("http://localhost:5005/order/checkout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${jwtCustomerToken}`,
//             },
//             body: JSON.stringify(payload),
//         });

//         console.log("STATUS =", response.status);

//         const data = await response.json();

//         console.log("RESPONSE =", data);

//         return data;

//     } catch (error) {
//         console.log("CHECKOUT ERROR =", error);
//         return "Order fail";
//     }
// }
export async function proceedToCheckOut(payload: any) {
    try {
        console.log("PAYLOAD =", payload);

        const storedToken = localStorage.getItem("jwtCustomerToken");

        if (!storedToken) {
            console.log("NO CUSTOMER TOKEN FOUND");
            return "Please login first";
        }

        // Token is already a normal string, so DON'T use JSON.parse()
        const jwtCustomerToken = storedToken;

        console.log("jwtCustomerToken =", jwtCustomerToken);

        const response = await fetch(
            `${domain}/order/checkout`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtCustomerToken}`,
                },

                body: JSON.stringify(payload),
            }
        );

        console.log("STATUS =", response.status);

        const data = await response.json();

        console.log("RESPONSE =", data);

        return data;

    } catch (error) {
        console.log("CHECKOUT ERROR =", error);
        return "Order fail";
    }
}

export async function fetchMyOrders() {
    try {
        const storedToken = localStorage.getItem("jwtCustomerToken");

        if (!storedToken) {
            console.log("NO CUSTOMER TOKEN FOUND");
            return {
                error: "Please login first"
            };
        }

        const response = await fetch(
            `${domain}/order/my-orders`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            }
        );

        console.log("MY ORDERS STATUS =", response.status);

        const data = await response.json();

        console.log("MY ORDERS RESPONSE =", data);

        if (!response.ok) {
            return {
                error: data.error || "Unable to fetch orders"
            };
        }

        return data;

    } catch (error) {

        console.log("MY ORDERS ERROR =", error);

        return {
            error: "Something went wrong while fetching orders"
        };
    }
}
export async function fetchOrderDetails(orderId: string) {
  try {

    const storedToken = localStorage.getItem("jwtCustomerToken");

    if (!storedToken) {
      return {
        error: "Please login first"
      };
    }

    const response = await fetch(
      `${domain}/order/my-orders/${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    const data = await response.json();

    console.log("ORDER DETAILS RESPONSE =", data);

    if (!response.ok) {
      return {
        error: data.error || "Unable to fetch order details"
      };
    }

    return data;

  } catch (error) {

    console.log(
      "ORDER DETAILS ERROR =",
      error
    );

    return {
      error: "Something went wrong while fetching order details"
    };
  }
}