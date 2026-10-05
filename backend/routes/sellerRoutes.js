const multer = require("multer");
const express = require("express");
const path = require("path");

const verifySeller = require("../middleware/verifySeller");

const {
  fetchAllProductsBySellerId,
  updateSellerProfile,
  deleteProduct,
} = require("../controllers/sellerController");

const {
  addNewProduct,
} = require("../controllers/productController");

const {
  fetchOrderItemsBySellerId,
} = require("../controllers/orderController");

// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },

});

const upload = multer({
  storage,
});

// =====================================================
// ROUTER
// =====================================================

const router = express.Router();

console.log("SELLER ROUTES LOADED");

// =====================================================
// GET SELLER PRODUCTS
// =====================================================

router.get(
  "/seller/products",
  verifySeller,
  fetchAllProductsBySellerId
);

// =====================================================
// ADD NEW PRODUCT
// =====================================================

router.post(
  "/seller/addNewProduct",
  verifySeller,
  upload.single("productImage"),
  addNewProduct
);

// =====================================================
// GET SELLER ORDERS
// =====================================================

router.get(
  "/seller/orders",
  verifySeller,
  fetchOrderItemsBySellerId
);

// =====================================================
// UPDATE SELLER PROFILE
// =====================================================

router.put(
  "/seller/profile",
  verifySeller,
  updateSellerProfile
);

// =====================================================
// DELETE SELLER PRODUCT
// =====================================================

router.delete(
  "/seller/products/:productId",
  verifySeller,
  deleteProduct
);

// =====================================================
// EXPORT
// =====================================================

module.exports = router;