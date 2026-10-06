// // import AddToCart from "../buttons/AddToCart";

// // import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";
// // import Pagination from "../pagination/Pagination";
// // import { Link, useLoaderData } from "react-router-dom";
// // import { getAllProducts } from "../../data/productAPI";
// // import { productWithImage } from "../../types/customerProductTypes";

// // export async function loader({ request }: { request: Request }) {
// //   const url = new URL(request.url);
// //   const pageNo = parseInt(url.searchParams.get("pageNo") || "1");
// //   const response = await getAllProducts(pageNo);
// //   return response;
// // }

// // export default function Product() {
// //   const loaderActionData = useLoaderData() as
// //     | {
// //         totalPages: number;
// //         pageNo: number;
// //         withSignedImages: productWithImage[];
// //       }
// //     | string;
// //   console.log("Loader Data:", loaderActionData);
// //   if (typeof loaderActionData === "string") {
// //     return <p>{loaderActionData}</p>;
// //   }
// //   console.log("Loader Data:", loaderActionData);
// //   // const images = loaderActionData.withSignedImages;
// //   console.log("FULL DATA =", loaderActionData);
// // console.log("withSignedImages =", loaderActionData.withSignedImages);
// // //  const images = loaderActionData.withSignedImages || [];
// // //  if (!loaderActionData.withSignedImages) {
// // //   return <p>No products found</p>;
// // // }
// // //const images = loaderActionData?.withSignedImages ?? [];
// // const images = loaderActionData.withSignedImages || [];
// // if (!loaderActionData.withSignedImages) {
// //   return <p>No products found</p>;
// // }
// // if (images.length === 0) {
// //   return <p>No products available</p>;
// // }
// //   const renderImages = images.map((imagepath) => (
// //     <div key={imagepath.product_id} className="w-[20rem]  border bg-white  p-3">
// //       <div className="h-64">
// //         <img
// //           className=" bg-white w-full h-full rounded-xl object-cover border"
// //           src={imagepath.image_url}
// //           alt={imagepath.product_name}
// //         />
// //       </div>
// //       <div className=" *:mt-2">
// //         <Link
// //           to={`details?productId=${imagepath.product_id}`}
// //           className=" text-berkeleyBlue cursor-pointer"
// //         >
// //           {imagepath.product_name}
// //         </Link>
// //         <p className="flex w-1/2 gap-1">
// //           {[...Array(5)].map((start, index) => (
// //             <FaRegStar key={index} size={"20"} />
// //           ))}
// //         </p>
// //         <p>
// //           <span className="font-semibold">₹</span>
// //           <span className=" inline-block ml-1 text-4xl">{imagepath.price}</span>
// //         </p>
// //         <AddToCart
// //           productId={imagepath.product_id}
// //           sellerId={imagepath.seller_id}
// //           name={imagepath.product_name}
// //           price={imagepath.price}
// //           quantity={1}
// //         />
// //       </div>
// //     </div>
// //   ));

// //   return (
// //     <>
// //       <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(min-content,20rem))] justify-items-center items-center justify-center  bg-background gap-3 p-2">
// //         {renderImages}
// //       </div>
// //       <Pagination
// //         totalPages={loaderActionData.totalPages || 1}
// //         pageNo={loaderActionData.pageNo || 1}
// //       />
// //     </>
// //   );
// // }
// // import AddToCart from "../buttons/AddToCart";

// // import { FaRegStar } from "react-icons/fa";
// // import Pagination from "../pagination/Pagination";
// // import { Link, useLoaderData } from "react-router-dom";

// // import {
// //   getAllProducts,
// //   getAllProductsBySeller,
// // } from "../../data/productAPI";

// // import { productWithImage } from "../../types/customerProductTypes";

// // export async function loader({ request }: { request: Request }) {
// //   const url = new URL(request.url);
// //   const pageNo = parseInt(url.searchParams.get("pageNo") || "1");

// //   const sellerToken = localStorage.getItem("jwtToken");
// //   const customerToken = localStorage.getItem("jwtCustomerToken");

// //   // Seller -> only seller's products
// //   if (sellerToken && !customerToken) {
// //     const response = await getAllProductsBySeller();

// //     if (typeof response === "string") {
// //       return response;
// //     }

// //     return {
// //       totalPages: 1,
// //       pageNo: 1,
// //       withSignedImages: response.allProductByIdResults || [],
// //     };
// //   }

// //   // Customer / guest -> all products
// //   return await getAllProducts(pageNo);
// // }

// // export default function Product() {
// //   const loaderActionData = useLoaderData() as
// //     | {
// //         totalPages?: number;
// //         pageNo?: number;
// //         withSignedImages: productWithImage[];
// //       }
// //     | string;

// //   if (typeof loaderActionData === "string") {
// //     return <p>{loaderActionData}</p>;
// //   }

// //   const images = loaderActionData.withSignedImages || [];

// //   if (!loaderActionData.withSignedImages) {
// //     return <p>No products found</p>;
// //   }

// //   if (images.length === 0) {
// //     return <p>No products available</p>;
// //   }

// //   // Logged-in roles
// //   const sellerToken = localStorage.getItem("jwtToken");
// //   const customerToken = localStorage.getItem("jwtCustomerToken");

// //   const isSellerLoggedIn = !!sellerToken && !customerToken;
// //   const isCustomerLoggedIn = !!customerToken;

// //   const renderImages = images.map((imagepath) => (
// //     <div
// //       key={imagepath.product_id}
// //       className="w-[20rem] border bg-white p-3"
// //     >
// //       <div className="h-64">
// //         <img
// //           className="bg-white w-full h-full rounded-xl object-cover border"
// //           src={imagepath.image_url}
// //           alt={imagepath.product_name}
// //         />
// //       </div>

// //       <div className="*:mt-2">

// //         <Link
// //           to={`details?productId=${imagepath.product_id}`}
// //           className="text-berkeleyBlue cursor-pointer"
// //         >
// //           {imagepath.product_name}
// //         </Link>

// //         <p className="flex w-1/2 gap-1">
// //           {[...Array(5)].map((_, index) => (
// //             <FaRegStar key={index} size={20} />
// //           ))}
// //         </p>

// //         <p>
// //           <span className="font-semibold">₹</span>

// //           <span className="inline-block ml-1 text-4xl">
// //             {imagepath.price}
// //           </span>
// //         </p>

// //         {/* CUSTOMER ONLY */}
// //         {isCustomerLoggedIn && (
// //           <AddToCart
// //             productId={imagepath.product_id}
// //             sellerId={imagepath.seller_id}
// //             name={imagepath.product_name}
// //             price={imagepath.price}
// //             quantity={1}
// //           />
// //         )}

// //         {/* SELLER */}
// //         {isSellerLoggedIn && (
// //           <p className="mt-3 text-sm text-gray-500 font-medium">
// //             Your product
// //           </p>
// //         )}

// //         {/* NOT LOGGED IN */}
// //         {!isCustomerLoggedIn && !isSellerLoggedIn && (
// //           <p className="mt-3 text-sm text-gray-500">
// //             Login as a customer to add products to cart.
// //           </p>
// //         )}

// //       </div>
// //     </div>
// //   ));

// //   return (
// //     <>
// //       <div
// //         className="
// //           w-full
// //           grid
// //           grid-cols-[repeat(auto-fill,minmax(min-content,20rem))]
// //           justify-items-center
// //           items-center
// //           justify-center
// //           bg-background
// //           gap-3
// //           p-2
// //         "
// //       >
// //         {renderImages}
// //       </div>

// //       {/* Pagination is mainly for customer/public products */}
// //       {!isSellerLoggedIn && (
// //         <Pagination
// //           totalPages={loaderActionData.totalPages || 1}
// //           pageNo={loaderActionData.pageNo || 1}
// //         />
// //       )}
// //     </>
// //   );
// // }
// import AddToCart from "../buttons/AddToCart";

// import { FaRegStar } from "react-icons/fa";
// import Pagination from "../pagination/Pagination";
// import { Link, useLoaderData } from "react-router-dom";

// import {
//   getAllProducts,
//   getAllProductsBySeller,
// } from "../../data/productAPI";

// import { productWithImage } from "../../types/customerProductTypes";

// export async function loader({ request }: { request: Request }) {
//   const url = new URL(request.url);
//   const pageNo = parseInt(url.searchParams.get("pageNo") || "1");

//   const sellerToken = localStorage.getItem("jwtToken");
//   const customerToken = localStorage.getItem("jwtCustomerToken");

//   // Seller -> only seller's products
//   if (sellerToken && !customerToken) {
//     const response = await getAllProductsBySeller();

//     if (typeof response === "string") {
//       return response;
//     }

//     return {
//       totalPages: 1,
//       pageNo: 1,
//       withSignedImages: response.allProductByIdResults || [],
//     };
//   }

//   // Customer / guest -> all products
//   return await getAllProducts(pageNo);
// }

// export default function Product() {
//   const loaderActionData = useLoaderData() as
//     | {
//         totalPages?: number;
//         pageNo?: number;
//         withSignedImages: productWithImage[];
//       }
//     | string;

//   if (typeof loaderActionData === "string") {
//     return <p>{loaderActionData}</p>;
//   }

//   const images = loaderActionData.withSignedImages || [];

//   if (!loaderActionData.withSignedImages) {
//     return <p>No products found</p>;
//   }

//   if (images.length === 0) {
//     return <p>No products available</p>;
//   }

//   // Logged-in roles
//   const sellerToken = localStorage.getItem("jwtToken");
//   const customerToken = localStorage.getItem("jwtCustomerToken");

//   const isSellerLoggedIn = !!sellerToken && !customerToken;
//   const isCustomerLoggedIn = !!customerToken;

//   const renderImages = images.map((imagepath) => {
//     // Customer products may already have a complete image URL.
//     // Seller products return only the image filename.
//     const imageSrc =
//       imagepath.image_url &&
//       imagepath.image_url.startsWith("http")
//         ? imagepath.image_url
//         : imagepath.image_url
//           ? `http://localhost:5005/uploads/${imagepath.image_url}`
//           : "";

//     return (
//       <div
//         key={imagepath.product_id}
//         className="w-[20rem] border bg-white p-3"
//       >
//         <div className="h-64">
//           {imageSrc ? (
//             <img
//               className="bg-white w-full h-full rounded-xl object-cover border"
//               src={imageSrc}
//               alt={imagepath.product_name}
//             />
//           ) : (
//             <div className="w-full h-full rounded-xl border bg-gray-100 flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
//         </div>

//         <div className="*:mt-2">
//           <Link
//             to={`details?productId=${imagepath.product_id}`}
//             className="text-berkeleyBlue cursor-pointer"
//           >
//             {imagepath.product_name}
//           </Link>

//           <p className="flex w-1/2 gap-1">
//             {[...Array(5)].map((_, index) => (
//               <FaRegStar key={index} size={20} />
//             ))}
//           </p>

//           <p>
//             <span className="font-semibold">₹</span>

//             <span className="inline-block ml-1 text-4xl">
//               {imagepath.price}
//             </span>
//           </p>

//           {/* CUSTOMER ONLY */}
//           {isCustomerLoggedIn && (
//             <AddToCart
//               productId={imagepath.product_id}
//               sellerId={imagepath.seller_id}
//               name={imagepath.product_name}
//               price={imagepath.price}
//               quantity={1}
//             />
//           )}

//           {/* SELLER */}
//           {isSellerLoggedIn && (
//             <p className="mt-3 text-sm text-gray-500 font-medium">
//               Your product
//             </p>
//           )}

//           {/* NOT LOGGED IN */}
//           {!isCustomerLoggedIn && !isSellerLoggedIn && (
//             <p className="mt-3 text-sm text-gray-500">
//               Login as a customer to add products to cart.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   });

//   return (
//     <>
//       <div
//         className="
//           w-full
//           grid
//           grid-cols-[repeat(auto-fill,minmax(min-content,20rem))]
//           justify-items-center
//           items-center
//           justify-center
//           bg-background
//           gap-3
//           p-2
//         "
//       >
//         {renderImages}
//       </div>

//       {/* Pagination is mainly for customer/public products */}
//       {!isSellerLoggedIn && (
//         <Pagination
//           totalPages={loaderActionData.totalPages || 1}
//           pageNo={loaderActionData.pageNo || 1}
//         />
//       )}
//     </>
//   );
// }
import { domain } from "../../utils/domain";
import AddToCart from "../buttons/AddToCart";

import { FaRegStar } from "react-icons/fa";
import Pagination from "../pagination/Pagination";
import { Link, useLoaderData } from "react-router-dom";

import { getAllProducts, getAllProductsBySeller } from "../../data/productAPI";

import { productWithImage } from "../../types/customerProductTypes";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pageNo = parseInt(url.searchParams.get("pageNo") || "1");

  const sellerToken = localStorage.getItem("jwtToken");
  const customerToken = localStorage.getItem("jwtCustomerToken");

  // Seller -> only seller's products
  if (sellerToken && !customerToken) {
    const response = await getAllProductsBySeller();

    if (typeof response === "string") {
      return response;
    }

    return {
      totalPages: 1,
      pageNo: 1,
      withSignedImages: response.allProductByIdResults || [],
    };
  }

  // Customer / guest -> all products
  return await getAllProducts(pageNo);
}

export default function Product() {
  const loaderActionData = useLoaderData() as
    | {
        totalPages?: number;
        pageNo?: number;
        withSignedImages: productWithImage[];
      }
    | string;

  if (typeof loaderActionData === "string") {
    return (
      <p className="p-4 sm:p-6 text-center text-red-500">{loaderActionData}</p>
    );
  }

  const images = loaderActionData.withSignedImages || [];

  if (!loaderActionData.withSignedImages) {
    return <p className="p-4 sm:p-6 text-center">No products found</p>;
  }

  if (images.length === 0) {
    return <p className="p-4 sm:p-6 text-center">No products available</p>;
  }

  // Logged-in roles
  const sellerToken = localStorage.getItem("jwtToken");
  const customerToken = localStorage.getItem("jwtCustomerToken");

  const isSellerLoggedIn = !!sellerToken && !customerToken;
  const isCustomerLoggedIn = !!customerToken;

  const renderImages = images.map((imagepath) => {
    // Customer products may already have a complete image URL.
    // Seller products return only the image filename.
    console.log("HOME PRODUCTS IMAGE DATA =", images);
    const imageSrc = imagepath.image_url
      ? imagepath.image_url.startsWith("http")
        ? imagepath.image_url
        : imagepath.image_url.startsWith("/")
          ? `${domain}${imagepath.image_url}`
          : `${domain}/uploads/${imagepath.image_url}`
      : "";
    return (
      <div
        key={imagepath.product_id}
        className="
          w-full
          max-w-[20rem]
          border
          border-gray-200
          bg-white
          rounded-xl
          p-3
          shadow-sm
          hover:shadow-md
          transition-shadow
          flex
          flex-col
        "
      >
        {/* PRODUCT IMAGE */}
        <div className="h-44 min-[400px]:h-48 sm:h-56 md:h-64 w-full">
          {imageSrc ? (
            <img
              className="
                bg-white
                w-full
                h-full
                rounded-xl
                object-cover
                border
              "
              src={imageSrc}
              alt={imagepath.product_name}
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
              "
            >
              No Image
            </div>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="mt-3 flex flex-col flex-1">
          {/* PRODUCT NAME */}
          <Link
            to={`details?productId=${imagepath.product_id}`}
            className="
              text-berkeleyBlue
              cursor-pointer
              font-semibold
              text-sm
              min-[400px]:text-base
              sm:text-lg
              line-clamp-2
              min-h-[2.5rem]
              hover:underline
              break-words
            "
          >
            {imagepath.product_name}
          </Link>

          {/* STARS */}
          <p className="flex gap-1 mt-2">
            {[...Array(5)].map((_, index) => (
              <FaRegStar key={index} size={17} className="sm:w-5 sm:h-5" />
            ))}
          </p>

          {/* PRICE */}
          <p className="mt-2 flex items-center">
            <span className="font-semibold text-base sm:text-lg">₹</span>

            <span
              className="
                inline-block
                ml-1
                text-xl
                min-[400px]:text-2xl
                sm:text-3xl
                font-semibold
              "
            >
              {imagepath.price}
            </span>
          </p>

          {/* CUSTOMER ONLY */}
          {isCustomerLoggedIn && (
            <div className="mt-3 w-full">
              <AddToCart
                productId={imagepath.product_id}
                sellerId={imagepath.seller_id}
                name={imagepath.product_name}
                price={imagepath.price}
                quantity={1}
              />
            </div>
          )}

          {/* SELLER */}
          {isSellerLoggedIn && (
            <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium">
              Your product
            </p>
          )}

          {/* NOT LOGGED IN */}
          {!isCustomerLoggedIn && !isSellerLoggedIn && (
            <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-5">
              Login as a customer to add products to cart.
            </p>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      {/* PRODUCT GRID */}
      <div
        className="
          w-full
          grid
          grid-cols-1
          min-[400px]:grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          justify-items-center
          bg-background
          gap-3
          min-[400px]:gap-4
          sm:gap-5
          p-3
          sm:p-4
        "
      >
        {renderImages}
      </div>

      {/* PAGINATION */}
      {!isSellerLoggedIn && (
        <div className="px-3 sm:px-4 py-4 overflow-x-auto">
          <Pagination
            totalPages={loaderActionData.totalPages || 1}
            pageNo={loaderActionData.pageNo || 1}
          />
        </div>
      )}
    </>
  );
}
