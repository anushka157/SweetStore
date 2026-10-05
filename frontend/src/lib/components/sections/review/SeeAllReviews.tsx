import React from "react";
import { productReviewType } from "../../../types/customerReviewTypes";

type ProductReviewProps = {
  reviews: productReviewType[];
};

const ProductReviews: React.FC<ProductReviewProps> = ({ reviews }) => {
    console.log(reviews)
  return (
    <div className="bg-background p-6">
      <h1 className="text-accent text-2xl font-bold text-center">Product Reviews</h1>
      <div className="mt-6">
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="border border-lighterAccent rounded-lg p-4 mb-4 bg-lighterYellowish"
          >
            <p className="text-orangeee">Rating: {review.rating}</p>
            <p className="text-accent">Comment: {review.comment}</p>
            <p className="text-lighterAccent">
              Date: {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
