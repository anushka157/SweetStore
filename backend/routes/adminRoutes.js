
const express = require("express");

const router = express.Router();

const verifyAdmin =
  require("../middleware/verifyAdmin");

const {
  // PRODUCTS
  getPendingProducts,
  getAllSellerProducts,
  approveProduct,
  rejectProduct,
  getProductDetails,
  // SELLERS
  getPendingSellers,
  approveSeller,
  rejectSeller,

  // DELIVERY PARTNERS
  getPendingDeliveryPartners,
  approveDeliveryPartner,
  rejectDeliveryPartner,
  getUnassignedOrders,
    assignDeliveryPartner,
getAllOrders,
getApprovedDeliveryPartners,
} = require("../controllers/adminController");


// =====================================================
// PRODUCTS
// =====================================================

router.get(
  "/admin/products/pending",
  verifyAdmin,
  getPendingProducts
);

router.put(
  "/admin/products/:productId/approve",
  verifyAdmin,
  approveProduct
);

router.put(
  "/admin/products/:productId/reject",
  verifyAdmin,
  rejectProduct
);


// =====================================================
// SELLERS
// =====================================================

router.get(
  "/admin/sellers/pending",
  verifyAdmin,
  getPendingSellers
);

router.put(
  "/admin/sellers/:sellerId/approve",
  verifyAdmin,
  approveSeller
);

router.put(
  "/admin/sellers/:sellerId/reject",
  verifyAdmin,
  rejectSeller
);


// =====================================================
// DELIVERY PARTNERS
// =====================================================

router.get(
  "/admin/delivery-partners/pending",
  verifyAdmin,
  getPendingDeliveryPartners
);

router.put(
  "/admin/delivery-partners/:deliveryPartnerId/approve",
  verifyAdmin,
  approveDeliveryPartner
);

router.put(
  "/admin/delivery-partners/:deliveryPartnerId/reject",
  verifyAdmin,
  rejectDeliveryPartner
);

router.put(
  "/admin/orders/:orderItemId/assign-delivery-partner",
  verifyAdmin,
  assignDeliveryPartner
);

router.get(
  "/admin/orders",
  verifyAdmin,
  getUnassignedOrders
);
router.get(
  "/admin/products/all",
  verifyAdmin,
  getAllSellerProducts
);
router.get(
  "/admin/delivery-partners/approved",
  verifyAdmin,
  getApprovedDeliveryPartners
);

router.get(
  "/admin/products/:productId",
  verifyAdmin,
  getProductDetails
);


router.get(
  "/admin/orders/all",
  verifyAdmin,
  getAllOrders
);
module.exports = router;