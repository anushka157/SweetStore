import { useLoaderData } from "react-router-dom";
import { getProductById } from "../../../data/productAPI";
import { CompleteProductDetails } from "../../../types/customerProductTypes";
import AddReviewComponent from "../review/AddReview";
import { getReviewById, sendReview } from "../../../data/reviewAPI";
import { productReviewType } from "../../../types/customerReviewTypes";
import ProductReviews from "../review/SeeAllReviews";
import { useState } from "react";
import { domain } from "../../../utils/domain";
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const productByIdReponse = await getProductById(productId || "");
  const reviewsByProductIdResponse = await getReviewById(productId || "");
  console.log(reviewsByProductIdResponse);
  return { productByIdReponse, reviewsByProductIdResponse };
}

export default function CustomerProductDetails() {
  const [dropRevies, setDropRevies] = useState(false);

  const loaderData = useLoaderData() as {
    productByIdReponse:
      | { completeProductDetails: CompleteProductDetails }
      | string;
    reviewsByProductIdResponse: { allReviews: productReviewType[] } | string;
  };
  if (typeof loaderData.productByIdReponse === "string") {
    return <p>{loaderData.productByIdReponse}</p>;
  }

  const productDetails = loaderData.productByIdReponse.completeProductDetails;
console.log("PRODUCT DETAILS =", productDetails);
console.log("IMAGE URL =", productDetails.signerUrl);
  const productReviews =
    typeof loaderData.reviewsByProductIdResponse === "string" ? (
      <div className="bg-background p-6">
        <h1 className="text-accent text-2xl font-bold text-center">
          Product Reviews
        </h1>
        <p className="text-accent font-semibold">No Reviews For this product</p>
      </div>
    ) : (
      <ProductReviews
        reviews={loaderData.reviewsByProductIdResponse.allReviews}
      />
    );

  return (
    <section className="w-full h-[100vh] flex flex-col md:flex-row gap-6 p-8 bg-[#F2EEEC]">
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-1/2 flex justify-center items-center bg-white rounded-lg shadow-md">
          <img
            className="h-full rounded-lg object-cover border border-[#763A12]"
            src={`${domain}/uploads/${productDetails.signerUrl}`}
            alt={`${productDetails.productName} Image`}
          />
        </div>
        <div className="bg-[#F5DE7A] p-4 rounded-lg shadow-md">
          <table className="w-full text-left text-[#763A12]">
            <tbody>
              <tr>
                <th className="pr-4 font-semibold">Seller Name:</th>
                <td>{productDetails.businessName}</td>
              </tr>
              <tr>
                <th className="pr-4 font-semibold">Store Location:</th>
                <td>{productDetails.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {dropRevies && productReviews}
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-[#F5DE7A] p-6 rounded-lg shadow-md flex-1">
          <table className="w-full text-left text-[#763A12]">
            <tbody>
              <tr>
                <td className="font-bold text-lg">
                  {productDetails.productName}
                </td>
              </tr>
              <tr>
                <td>{productDetails.productDescription}</td>
              </tr>
              <tr>
                <td className="text-xl font-semibold">
                  Price: {productDetails.price}
                </td>
              </tr>
              <tr>
                <td>
                  Category Type: {productDetails.categoryType.toUpperCase()}
                </td>
              </tr>
              <tr>
                <td>Category: {productDetails.category.toUpperCase()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-evenly bg-[#F5DE7A] p-4 rounded-lg shadow-md">
          <button
            onClick={() => setDropRevies((prev) => !prev)}
            className="px-6 py-3 bg-[#763A12] text-white rounded-lg shadow-md hover:bg-[#AA4C0A] transition-all"
          >
            See all Reviews
          </button>
        </div>
        <AddReviewComponent
          productId={productDetails.productId}
          sellerId={productDetails.sellerId}
        />
      </div>
    </section>
  );
}
