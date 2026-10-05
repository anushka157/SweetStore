import { Link, useLoaderData } from "react-router-dom";
import { getAllProductsBySeller } from "./lib/data/productAPI";
import { sellerProducts } from "./lib/types/sellerProductTypes";
import { useState } from "react";
import { domain } from "../lib/utils/domain";
export async function loader() {
  const response = await getAllProductsBySeller();

  return response;
}

export default function ProductListing() {
  const loaderData = useLoaderData() as
    | {
        allProductByIdResults: sellerProducts[];
      }
    | string;

  const [products, setProducts] = useState<sellerProducts[]>(
    typeof loaderData === "string"
      ? []
      : loaderData.allProductByIdResults
  );

  const [deletingProductId, setDeletingProductId] = useState<
    string | null
  >(null);

  const [deleteError, setDeleteError] = useState("");

  async function handleDelete(productId: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingProductId(productId);
      setDeleteError("");

      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setDeleteError("Please login again.");
        return;
      }

      const response = await fetch(
        `${domain}/seller/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setDeleteError(
          data.error || "Unable to delete product"
        );
        return;
      }

      // Remove deleted product from the screen
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.product_id !== productId
        )
      );

    } catch (error) {
      console.error(
        "DELETE PRODUCT ERROR =",
        error
      );

      setDeleteError(
        "Unable to connect to server"
      );
    } finally {
      setDeletingProductId(null);
    }
  }

  if (typeof loaderData === "string") {
    return (
      <section className="w-[86%] mx-auto py-8">

        <Link
          to={"submitproudct"}
          className="inline-block px-6 py-2 bg-accent text-white font-medium rounded-md shadow-md hover:shadow-lg hover:bg-lighterAccent transition-transform transform hover:scale-105 mb-5"
        >
          Add New Product
        </Link>

        <p className="text-center text-red-500 font-bold text-lg">
          {loaderData}
        </p>

      </section>
    );
  }

  return (
    <section className="w-[86%] mx-auto py-8">

      {/* Add New Product */}
      <Link
        to={"submitproudct"}
        className="inline-block px-6 py-2 bg-accent text-white font-medium rounded-md shadow-md hover:shadow-lg hover:bg-lighterAccent transition-transform transform hover:scale-105 mb-5"
      >
        Add New Product
      </Link>

      {/* Delete Error */}
      {deleteError && (
        <div className="mb-5 p-3 bg-red-100 border border-red-300 text-red-600 rounded-md">
          {deleteError}
        </div>
      )}

      {/* Product Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-md">

        <thead>
          <tr className="bg-accent text-white">

            <th className="border border-gray-300 p-3 text-center">
              Sr.
            </th>

            <th className="border border-gray-300 p-3 text-center">
              Title
            </th>

            <th className="border border-gray-300 p-3 text-center">
              Approval Status
            </th>

            <th className="border border-gray-300 p-3 text-center">
              Category
            </th>

            <th className="border border-gray-300 p-3 text-center">
              Price
            </th>

            <th className="border border-gray-300 p-3 text-center">
              Action
            </th>

          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center p-6 text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (

              <tr
                key={product.product_id}
                className="hover:bg-yellow-100 transition-colors duration-200"
              >

                <td className="border border-gray-300 p-3 text-center">
                  {index + 1}
                </td>

                <td className="border border-gray-300 p-3 text-center">
                  <Link
                    to={`product/${product.product_id}`}
                    className="text-blue-600 underline hover:no-underline hover:text-blue-800 transition-colors"
                  >
                    {product.product_name}
                  </Link>
                </td>

                <td
                  className={`border border-gray-300 p-3 text-center ${
                    product.approval_status === "approved"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {product.approval_status}
                </td>

                <td className="border border-gray-300 p-3 text-center">
                  {product.category}
                </td>

                <td className="border border-gray-300 p-3 text-center">
                  ₹{product.price}
                </td>

                <td className="border border-gray-300 p-3 text-center">

                  <button
                    type="button"
                    disabled={
                      deletingProductId ===
                      product.product_id
                    }
                    onClick={() =>
                      handleDelete(
                        product.product_id
                      )
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deletingProductId ===
                    product.product_id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </td>

              </tr>

            ))
          )}

        </tbody>

      </table>

    </section>
  );
}