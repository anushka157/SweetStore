const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("RAZORPAY KEY ID =", process.env.RAZORPAY_KEY_ID);
console.log(
    "RAZORPAY SECRET EXISTS =",
    !!process.env.RAZORPAY_KEY_SECRET
);
// CREATE RAZORPAY ORDER
router.post("/create-order", async (req, res) => {

    try {

        console.log("CREATE ORDER BODY =", req.body);

        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).json({
                error: "Amount and currency are required"
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: currency,
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        console.log("RAZORPAY ORDER =", order);

        return res.status(200).json(order);

    } catch (error) {

        console.log("CREATE ORDER ERROR =", error);

        return res.status(500).json({
            error: error.message
        });
    }
});




router.post("/verify-payment", (req, res) => {

    try {

        console.log("VERIFY PAYMENT BODY =", req.body);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            mysql_order_id
        } = req.body;


        // STEP 1: VERIFY RAZORPAY SIGNATURE

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");


        if (generatedSignature !== razorpay_signature) {

            console.log("PAYMENT SIGNATURE INVALID");

            return res.status(400).json({
                status: "failed",
                error: "Payment verification failed"
            });
        }


        console.log("PAYMENT VERIFIED SUCCESSFULLY");


        // STEP 2: SAVE RAZORPAY ORDER ID
        // AND MARK MYSQL ORDER AS PAID

        const updateQuery = `
            UPDATE orders
            SET
                payment_status = 'Paid',
                razorpay_order_id = ?
            WHERE order_id = ?
        `;


        connection.query(
            updateQuery,
            [razorpay_order_id, mysql_order_id],
            (error, result) => {

                if (error) {

                    console.log(
                        "MYSQL PAYMENT UPDATE ERROR =",
                        error
                    );

                    return res.status(500).json({
                        status: "failed",
                        error: "Payment verified but order update failed"
                    });
                }


                console.log(
                    "MYSQL ORDER UPDATED =",
                    result
                );


                if (result.affectedRows === 0) {

                    return res.status(404).json({
                        status: "failed",
                        error: "Order not found"
                    });
                }


                console.log(
                    "ORDER PAYMENT STATUS UPDATED TO PAID"
                );


                return res.status(200).json({
                    status: "ok",
                    message: "Payment verified and order marked as Paid"
                });

            }
        );


    } catch (error) {

        console.log(
            "VERIFY PAYMENT ERROR =",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
});


// // CASH ON DELIVERY
// router.post("/cod-payment", (req, res) => {

//     try {

//         console.log("COD PAYMENT BODY =", req.body);

//         const { mysql_order_id } = req.body;

//         if (!mysql_order_id) {
//             return res.status(400).json({
//                 status: "failed",
//                 error: "Order ID is required"
//             });
//         }

//         const updateQuery = `
//             UPDATE orders
//             SET payment_status = 'COD'
//             WHERE order_id = ?
//         `;

//         connection.query(
//             updateQuery,
//             [mysql_order_id],
//             (error, result) => {

//                 if (error) {

//                     console.log(
//                         "COD MYSQL UPDATE ERROR =",
//                         error
//                     );

//                     return res.status(500).json({
//                         status: "failed",
//                         error: "Unable to place COD order"
//                     });
//                 }

//                 console.log(
//                     "COD MYSQL ORDER UPDATED =",
//                     result
//                 );

//                 if (result.affectedRows === 0) {

//                     return res.status(404).json({
//                         status: "failed",
//                         error: "Order not found"
//                     });
//                 }

//                 console.log(
//                     "ORDER PAYMENT STATUS UPDATED TO COD"
//                 );

//                 return res.status(200).json({
//                     status: "ok",
//                     message: "COD order placed successfully"
//                 });

//             }
//         );

//     } catch (error) {

//         console.log(
//             "COD PAYMENT ERROR =",
//             error
//         );

//         return res.status(500).json({
//             status: "failed",
//             error: error.message
//         });
//     }
// });

// CASH ON DELIVERY
router.post("/cod-payment", (req, res) => {

    try {

        console.log("COD PAYMENT REQUEST =", req.body);

        const { mysql_order_id } = req.body;

        if (!mysql_order_id) {
            return res.status(400).json({
                status: "failed",
                error: "MySQL order ID is required"
            });
        }

        const updateQuery = `
            UPDATE orders
            SET payment_status = 'COD'
            WHERE order_id = ?
        `;

        connection.query(
            updateQuery,
            [mysql_order_id],
            (error, result) => {

                if (error) {

                    console.log(
                        "COD MYSQL UPDATE ERROR =",
                        error
                    );

                    return res.status(500).json({
                        status: "failed",
                        error: "Unable to place COD order"
                    });
                }

                console.log(
                    "COD MYSQL UPDATE RESULT =",
                    result
                );

                if (result.affectedRows === 0) {

                    return res.status(404).json({
                        status: "failed",
                        error: "Order not found"
                    });
                }

                console.log(
                    "ORDER PAYMENT STATUS UPDATED TO COD"
                );

                return res.status(200).json({
                    status: "ok",
                    message: "Order placed with Cash on Delivery"
                });
            }
        );

    } catch (error) {

        console.log(
            "COD PAYMENT ERROR =",
            error
        );

        return res.status(500).json({
            status: "failed",
            error: "Something went wrong"
        });
    }
});
module.exports = router;