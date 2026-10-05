const { v4: uuidv4 } = require("uuid");
const { Review } = require("../models/reviewModel");

async function addNewReview(req, res) {
  const productDetails = req.body;
  const { customer_id: customerId } = req.customer_id;
  try {
    const reviewId = uuidv4();
    const addReviewResults = await addReviewHelper({
      reviewId,
      ...productDetails,
      customerId,
    });
   if(addReviewResults.error || addReviewResults.affectedRows < 1){
    return res.status(422).json({
        error: "Review not add"
    })
   }
   return res.status(201).json({
    message: "Review added successfully"
   })
   
  } catch (error) {
    console.log(error);
  }
}

async function getReviewsById(req, res) {
  const incomingProductId = req.params.productId;
  try {
    const reviewByIdResults = await reviewByIdHelper({ incomingProductId });
    if (!Array.isArray(reviewByIdResults) || reviewByIdResults.length === 0) {
      return res.status(404).json({
        error: "No reviews found for this Product",
      });
    }

    return res.status(200).json({
      allReviews: reviewByIdResults,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// HELPER FUNCTIONS

function addReviewHelper(data) {
  return new Promise((resolve, reject) => {
    Review.addReview(data, (error, results) => {
      if (error) return reject({error: "Something went wrong"});
      return resolve(results);
    });
  });
}

function reviewByIdHelper(data) {
  return new Promise((resolve, reject) => {
    Review.reviewById(data, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

module.exports = {
  addNewReview,
  getReviewsById,
};

// { reviewId, comment, rating, productId, sellerId, customerId }
