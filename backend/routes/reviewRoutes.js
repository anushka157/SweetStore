const express = require("express");
const router = express.Router();

const verifyCustomer = require("../middleware/customerAuth");

const {
  addNewReview,
  getReviewsById,
} = require("../controllers/reviewController");

// Add review
router.post(
  "/product/review",
  verifyCustomer,
  addNewReview
);

// Get reviews for a product
router.get(
  "/product/review/:productId",
  getReviewsById
);

module.exports = router;