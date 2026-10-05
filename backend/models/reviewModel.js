const  connection  = require("../config/db");
const Review = {
  addReview: (data, callback) => {
    const query = `
               INSERT INTO review (
                review_id, product_id, customer_id, seller_id, rating, comment
               ) VALUES (
                ?,?,?,?,?,?
               )
        `
   const { reviewId, comment, rating, productId, sellerId, customerId } = data;
   connection.query(query, [ reviewId, productId, customerId, sellerId, rating, comment ], callback);
  },

  reviewById: (data, callback) => {
    const query =  `
        SELECT * FROM review WHERE product_id=?
    `
    const { incomingProductId } = data;
    connection.query(query, [ incomingProductId ], callback);
  }
};

module.exports = {
    Review
}
