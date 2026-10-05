const Razorpay = require("razorpay");
require("dotenv").config();
const fs = require("fs");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const readData = () => {
  if (fs.existsSync("orders.json")) {
    const data = fs.readFileSync("orders.json");
    return JSON.parse(data);
  }
  return [];
};

// Function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync("orders.json")) {
  writeData([]);
}

async function createAnPaymentOrder(req, res) {
  try {
    const { amount, currency, reciept, notes } = req.body;

    const options = {
      amount: amount * 100, // Convert amout to paise
      currency,
      reciept,
      notes,
    };

    const order = await razorpay.orders.create(options);

    // Read current orders, add new order, and write back to the file

    const orders = readData();

    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      reciept: order.receipt,
      status: "created",
    });
    writeData(orders);

    res.json(order); // Send order details to frontend, including order ID
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
}

async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );
    if (isValidSignature) {
      // Update the order with payment details
      const orders = readData();
      const order = orders.find((o) => o.order_id === razorpay_order_id);
      if (order) {
        order.status = "paid";
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }
      res.status(200).json({ status: "ok" });
      console.log("Payment verification successful");
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
}

module.exports = {
  createAnPaymentOrder,
  verifyPayment,
};
