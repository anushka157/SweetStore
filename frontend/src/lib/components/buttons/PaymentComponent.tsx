
// export default PaymentComponent;
import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { CartItem } from "../../types/cartTypes";

const PaymentComponent = () => {

    const { error, isLoading, Razorpay } = useRazorpay();
    const handleCOD = async () => {

    try {

        console.log("COD BUTTON CLICKED");

        const mysqlOrderId =
            localStorage.getItem("currentOrderId");

        console.log(
            "MYSQL ORDER ID FOR COD =",
            mysqlOrderId
        );

        if (!mysqlOrderId) {

            alert(
                "Order ID not found. Please go back and checkout again."
            );

            return;
        }


        const response = await fetch(
            "http://localhost:5005/cod-payment",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    mysql_order_id: mysqlOrderId,
                }),
            }
        );


        const data = await response.json();

        console.log(
            "COD RESPONSE =",
            data
        );


        if (data.status === "ok") {

            alert(
                "Order placed successfully with Cash on Delivery! 🎉"
            );

            localStorage.removeItem("cart");

            window.location.href = "/";

        } else {

            alert(
                data.error ||
                "Unable to place COD order"
            );
        }


    } catch (error) {

        console.error(
            "COD ERROR =",
            error
        );

        alert(
            "Something went wrong while placing COD order"
        );
    }
};
    const handlePayment = async () => {

        try {

            console.log("PAY NOW CLICKED");

            const storedCart: CartItem[] =
                JSON.parse(localStorage.getItem("cart") || "[]");

            console.log("CART =", storedCart);

            if (!storedCart || storedCart.length === 0) {
                alert("Your cart is empty");
                return;
            }

            const amount = storedCart.reduce(
                (total, item) =>
                    total + item.price * item.quantity,
                0
            );

            console.log("TOTAL AMOUNT =", amount);


            // STEP 1: CREATE RAZORPAY ORDER
            const response = await fetch(
                "http://localhost:5005/create-order",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        amount: amount,
                        currency: "INR",
                    }),
                }
            );


            console.log(
                "CREATE ORDER STATUS =",
                response.status
            );


            const order = await response.json();

            console.log("RAZORPAY ORDER =", order);


            if (!response.ok) {
                alert(order.error || "Unable to create payment order");
                return;
            }


            // STEP 2: OPEN RAZORPAY CHECKOUT

            const options: RazorpayOrderOptions = {

                key: "rzp_test_TRDKahrBexATTz",

                amount: order.amount,

                currency: order.currency,

                name: "Indian Sweets And Savories",

                description: "SweetStore Order",

                order_id: order.id,


                handler: async (paymentResponse) => {

                    console.log(
                        "RAZORPAY PAYMENT RESPONSE =",
                        paymentResponse
                    );


                    // STEP 3: VERIFY PAYMENT
                    // const verifyResponse = await fetch(
                    //     "http://localhost:5005/verify-payment",
                    //     {
                    //         method: "POST",

                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },

                    //         body: JSON.stringify({
                    //             razorpay_order_id:
                    //                 paymentResponse.razorpay_order_id,

                    //             razorpay_payment_id:
                    //                 paymentResponse.razorpay_payment_id,

                    //             razorpay_signature:
                    //                 paymentResponse.razorpay_signature,
                    //         }),
                    //     }
                    // );
const mysqlOrderId =
    localStorage.getItem("currentOrderId");

console.log(
    "MYSQL ORDER ID =",
    mysqlOrderId
);

const verifyResponse = await fetch(
    "http://localhost:5005/verify-payment",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({

            razorpay_order_id:
                paymentResponse.razorpay_order_id,

            razorpay_payment_id:
                paymentResponse.razorpay_payment_id,

            razorpay_signature:
                paymentResponse.razorpay_signature,

            mysql_order_id:
                mysqlOrderId,
        }),
    }
);

                    const verifyData =
                        await verifyResponse.json();


                    console.log(
                        "VERIFY RESPONSE =",
                        verifyData
                    );


                    // if (verifyData.status === "ok") {

                    //     alert(
                    //         "Payment successful! 🎉"
                    //     );

                    // } 
                    if (verifyData.status === "ok") {
    alert("Payment successful! 🎉");

    localStorage.removeItem("cart");

    window.location.href = "/";
}
                    else {

                        alert(
                            "Payment verification failed"
                        );
                    }
                },


                // prefill: {
                //     name: "Anushka Shrivastava",
                // },
prefill: {
    name: "Anushka Shrivastava",
    email: "test@example.com",
    contact: "9999999999",
},

                theme: {
                    color: "#763A12",
                },
            };


            // console.log(
            //     "OPENING RAZORPAY CHECKOUT..."
            // );


            // const razorpayInstance =
            //     new Razorpay(options);

            // razorpayInstance.open();
            console.log("OPENING RAZORPAY CHECKOUT...");
console.log("RAZORPAY OPTIONS =", options);
console.log("RAZORPAY OBJECT =", Razorpay);

const razorpayInstance = new Razorpay(options);

console.log("RAZORPAY INSTANCE CREATED =", razorpayInstance);

razorpayInstance.open();

console.log("RAZORPAY OPEN CALLED");


        } catch (error) {

            console.error(
                "PAYMENT ERROR =",
                error
            );

            alert(
                "Something went wrong while starting payment"
            );
        }
    };


    return (
        <div className="min-h-full bg-[#F2EEEC] flex items-center justify-center">

            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">

                <h1 className="text-2xl font-bold text-[#763A12] mb-4 text-center">
                    Payment Page
                </h1>


                {isLoading && (
                    <p className="text-yellow-500 text-center">
                        Loading Razorpay...
                    </p>
                )}


                {error && (
                    <p className="text-red-500 text-center">
                        Error loading Razorpay: {error}
                    </p>
                )}


                <div className="flex flex-col items-center">

                    {/* <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="bg-[#E08600] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#AA4C0A] transition duration-300"
                    >
                        Pay Now
                    </button> */}
                    <div className="flex flex-col items-center gap-4 w-full">

    {/* ONLINE PAYMENT */}

    <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-[#E08600] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#AA4C0A] transition duration-300"
    >
        Pay Online
    </button>


    {/* COD */}

    <button
        onClick={handleCOD}
        className="w-full bg-[#763A12] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#5c2c0d] transition duration-300"
    >
        Cash on Delivery
    </button>

</div>

                </div>


                <div className="mt-4">

                    <p className="text-center text-[#763A12] text-sm">
                        Secure payments powered by Razorpay
                    </p>

                </div>

            </div>

        </div>
    );
};

export default PaymentComponent;