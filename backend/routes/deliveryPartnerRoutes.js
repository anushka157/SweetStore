const express = require("express");

const {
  registerDeliveryPartner,
  validateDeliveryPartnerLogin,
  fetchAssignedOrders,
   updateDeliveryStatus,
} = require("../controllers/deliveryPartnerController");
const verifyDeliveryPartner = require("../middleware/verifyDeliveryPartner");
const router = express.Router();

console.log(
  "DELIVERY PARTNER ROUTES LOADED"
);


// REGISTER

router.post(
  "/delivery-partner/register",
  registerDeliveryPartner
);


// LOGIN

router.post(
  "/delivery-partner/login",
  validateDeliveryPartnerLogin
);

router.get(
  "/delivery-partner/orders",
  verifyDeliveryPartner,
  fetchAssignedOrders
);


router.put(
  "/delivery-partner/orders/:orderItemId/status",
  verifyDeliveryPartner,
  updateDeliveryStatus
);
module.exports = router;