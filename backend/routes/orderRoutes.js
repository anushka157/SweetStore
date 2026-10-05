
console.log("ORDER ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  orderCheckout,
  fetchOrderItemsBySellerId,
  fetchCustomerOrders,
  fetchCustomerOrderDetails,
    updateDeliveryStatus,
} = require("../controllers/orderController");

const verifyCustomer = require("../middleware/customerAuth");
const verifySeller = require("../middleware/verifySeller");
router.post(
  "/order/checkout",
  verifyCustomer,
  (req, res, next) => {
    console.log("CHECKOUT ROUTE HIT");
    next();
  },
  orderCheckout
);

router.get(
  "/order/my-orders",
  verifyCustomer,
  fetchCustomerOrders
);

router.get(
  "/order/my-orders/:orderId",
  verifyCustomer,
  fetchCustomerOrderDetails
);
router.put(
  "/order/delivery-status",
  verifySeller,
  updateDeliveryStatus
);
module.exports = router;