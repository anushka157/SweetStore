
import { useLoaderData } from "react-router-dom";
import { getAllProductsBySeller } from "../data/productAPI";
import { domain } from "../../../lib/utils/domain";
export async function loader({
  params,
}: {
  params: { productId?: string };
}) {
  if (!params.productId) {
    return "Product not found";
  }

  const response = await getAllProductsBySeller();

  if (typeof response === "string") {
    return response;
  }

  const product = response.allProductByIdResults?.find(
    (item: any) => item.product_id === params.productId
  );

  if (!product) {
    return "Product not found";
  }

  return product;
}

export default function ProductDetails() {
  const product = useLoaderData() as any;

  if (typeof product === "string") {
    return (
      <section className="min-h-[60vh] px-4 py-10 flex items-center justify-center text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-red-500">
          {product}
        </h2>
      </section>
    );
  }

  // Convert image filename into the backend image URL
  const imageUrl = product.image_url
    ? product.image_url.startsWith("http")
      ? product.image_url
      : `${domain}/uploads/${product.image_url}`
    : "";

  return (
    <section className="w-full px-3 sm:px-5 md:w-[90%] lg:w-[86%] mx-auto py-5 sm:py-8">
      <div className="bg-white border rounded-xl shadow-md p-4 sm:p-6 md:p-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-5 sm:mb-7">
          Product Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

          {/* PRODUCT IMAGE */}
          <div className="w-full h-[280px] sm:h-[350px] md:h-[400px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.product_name}
                className="
                  w-full
                  h-full
                  object-cover
                  rounded-xl
                  border
                "
              />
            ) : (
              <div
                className="
                  w-full
                  h-full
                  rounded-xl
                  border
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  text-sm
                  sm:text-base
                "
              >
                No Image Available
              </div>
            )}
          </div>

          {/* PRODUCT DETAILS */}
          <div className="space-y-3 sm:space-y-4 min-w-0">

            {/* PRODUCT NAME */}
            <h2 className="text-xl sm:text-2xl font-semibold break-words">
              {product.product_name}
            </h2>

            {/* PRICE */}
            <p className="text-base sm:text-lg">
              <span className="font-semibold">Price:</span>{" "}
              ₹{product.price}
            </p>

            {/* CATEGORY */}
            <p className="text-base sm:text-lg break-words">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>

            {/* APPROVAL STATUS */}
            <p className="text-base sm:text-lg break-words">
              <span className="font-semibold">
                Approval Status:
              </span>{" "}
              {product.approval_status}
            </p>

            {/* DESCRIPTION */}
            <div>
              <p className="font-semibold text-base sm:text-lg mb-1">
                Description:
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-6 break-words">
                {product.productDescription ||
                  product.product_description ||
                  "No description available"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}