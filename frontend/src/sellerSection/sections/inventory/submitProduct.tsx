import { Form, useActionData } from "react-router-dom";
import { domain } from "../../../lib/utils/domain";

// export async function action({ request }: { request: Request }) {
//   const formdata = await request.formData();
//   const jwtToken = localStorage.getItem("jwtToken");

//     if (!jwtToken) {
//         return "You need to login first";
//     }
//   const response = await fetch(`${domain}/seller/addNewProduct`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//     body: formdata,
//   });
//   const parsedResponse = await response.json();
//   console.log(parsedResponse);
//   return { parsedResponse };
// }
export async function action({ request }: { request: Request }) {
  try {
    const formdata = await request.formData();

    const jwtToken = localStorage.getItem("jwtToken");

    console.log("JWT TOKEN EXISTS:", !!jwtToken);

    if (!jwtToken) {
      return {
        parsedResponse: {
          error: "You need to login first",
        },
        statusCode: 401,
      };
    }

    console.log("FORM DATA:");

    // for (const [key, value] of formdata.entries()) {
    //   if (value instanceof File) {
    //     console.log(key, value.name);
    //   } else {
    //     console.log(key, value);
    //   }
    // }
    formdata.forEach((value, key) => {
  if (value instanceof File) {
    console.log(key, value.name);
  } else {
    console.log(key, value);
  }
});

    const response = await fetch(
      `${domain}/seller/addNewProduct`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formdata,
      }
    );

    console.log("RESPONSE STATUS:", response.status);

    const parsedResponse = await response.json();

    console.log("BACKEND RESPONSE:", parsedResponse);

    return {
      parsedResponse,
      statusCode: response.status,
    };

  } catch (error) {
    console.error("SUBMIT PRODUCT ERROR:", error);

    return {
      parsedResponse: {
        error: "Something went wrong while submitting the product",
      },
      statusCode: 500,
    };
  }
}
export default function SubmitProduct() {
  // const actionData = useActionData() as {
  //   parsedResponse: {
  //     message?: string;
  //     error?: string;
  //   };
  //   statusCode: number;
  // };
 const actionData = useActionData() as
  | {
      parsedResponse: {
        message?: string;
        error?: string;
      };
      statusCode?: number;
    }
  | undefined;
  console.log("ACTION DATA =", actionData);
  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-background py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Title */}
        <p className="text-accent text-2xl font-bold mb-6 text-center">
          Submit a new product for approval
        </p>

        {/* Form */}
        <Form
          method="post"
          encType="multipart/form-data"
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          {/* Display Success/Error Message */}
          {/* {actionData && (
            <p
              className={`text-center mb-4 font-medium ${
                actionData.statusCode === 200
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {actionData.parsedResponse.message ||
                actionData.parsedResponse.error}
            </p>
          )} */}
          {actionData?.parsedResponse && (
  <p
    className={`text-center mb-4 font-medium ${
      actionData.statusCode === 200
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {actionData.parsedResponse?.message ||
      actionData.parsedResponse?.error}
  </p>
)}
          {/* Product Image */}
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-accent font-medium mb-2"
            >
              Product Image:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="file"
              name="productImage"
              id="productImage"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-accent font-medium mb-2"
            >
              Product Category:
            </label>
            <select
              required
              name="category"
              id="category"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="">Choose a Category</option>
              <optgroup label="Sweets">
                <option value="ladoo">Ladoo</option>
                <option value="burfi">Burfi</option>
                <option value="pak">Pak</option>
                <option value="ghewar">Ghewar</option>
                <option value="dessert">Dessert</option>
              </optgroup>
              <optgroup label="Savories">
                <option value="khakra">Khakra</option>
                <option value="murukku">Murukku</option>
                <option value="sev">Sev</option>
                <option value="snacks">Snacks</option>
              </optgroup>
            </select>
          </div>

          {/* Category Type */}
          <div className="mb-4">
            <label
              htmlFor="categoryType"
              className="block text-accent font-medium mb-2"
            >
              Product Type:
            </label>
            <select
              required
              name="categoryType"
              id="categoryType"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="">Choose Type</option>
              <option value="sweet">Sweet</option>
              <option value="savory">Savory</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-accent font-medium mb-2"
            >
              Product Name:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-accent font-medium mb-2"
            >
              Product Description:
            </label>
            <textarea
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none resize-none"
              name="productDescription"
              id="productDescription"
              rows={4}
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-accent font-medium mb-2"
            >
              Stock:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-accent font-medium mb-2"
            >
              Price:
            </label>
            <input
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-accent outline-none"
              type="number"
              name="price"
              id="price"
              placeholder="Enter product price"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-accent text-white font-medium rounded-md hover:bg-lighterAccent transition-transform transform hover:scale-105 focus:ring-2 focus:ring-lighterAccent focus:ring-offset-2 focus:outline-none"
          >
            Submit
          </button>
        </Form>
      </div>
    </section>
  );
}
