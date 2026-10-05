// import React, { useState, useEffect } from "react";
// import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
// import { CartItem } from "../../../types/cartTypes";
// import { proceedToCheckOut } from "../../../data/orderAPI";

// // export async function action() {
// //   const storedCart: CartItem[] =
// //     JSON.parse(localStorage.getItem("cart") || "[]") || [];
// //   const totalAmount = storedCart.reduce(
// //     (total, item) => total + item.price * item.quantity,
// //     0
// //   );
// //   const response = await proceedToCheckOut({ cart: storedCart, totalAmount });

// //   if (response.message) {
// //     return redirect("/checkout");
// //   }

// //   return response || "";
// // }
// export async function action() {
//   const storedCart: CartItem[] =
//     JSON.parse(localStorage.getItem("cart") || "[]") || [];

//   const totalAmount = storedCart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const response = await proceedToCheckOut({
//     cart: storedCart,
//     totalAmount,
//   });

//   console.log("CHECKOUT RESPONSE =", response);

//   // if (response?.message) {
//   //   return redirect("/checkout");
//   // }
// if (response.message) {
//     localStorage.setItem("currentOrderId", response.orderId);
//     return redirect("/checkout");
// }
//   return {
//     error: response?.error || "Unable to proceed to checkout",
//   };
// }

// export default function Cart() {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   //const actioData = (useActionData() as string) || "";
// const actionData = useActionData() as {
//   error?: string;
// };
//   console.log(cart);
//   // Load cart data from localStorage
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
//     setCart(storedCart);
//   }, []);



//   const increaseQuantity = (productId: string) => {
//   const updatedCart = cart.map((item) => {
//     if (item.productId === productId) {
//       return {
//         ...item,
//         quantity: item.quantity + 1,
//       };
//     }

//     return item;
//   });

//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
// };


// const decreaseQuantity = (productId: string) => {
//   const updatedCart = cart
//     .map((item) => {
//       if (item.productId === productId) {
//         return {
//           ...item,
//           quantity: item.quantity - 1,
//         };
//       }

//       return item;
//     })
//     .filter((item) => item.quantity > 0);

//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
// };
//   // Function to remove an item from the cart
//   const deleteItem = (productId: string) => {
//     const updatedCart = cart.filter((item) => item.productId !== productId);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     alert("Item removed from cart!");
//   };

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="bg-[#F2EEEC] p-4 m-4 rounded shadow">
//       {/* //<p>{actioData}</p> */}
//       {actionData?.error && (
//   <p className="text-red-600 text-center mb-4">
//     {actionData.error}
//   </p>
// )}
//       <h1 className="text-center text-4xl mb-4">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p className="text-center text-4xl text-[#AA4C0A]">
//           Your cart is empty!
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-[#E08600] rounded">
//             <thead className="bg-[#EFBF38]">
//               <tr>
//                 <th className="border border-[#E08600] px-4 py-2 text-left">
//                   Product Name
//                 </th>
//                 <th className="border border-[#E08600] px-4 py-2 text-left">
//                   Quantity
//                 </th>
//                 <th className="border border-[#E08600] px-4 py-2 text-left">
//                   Price
//                 </th>
//                 <th className="border border-[#E08600] px-4 py-2 text-left">
//                   Total
//                 </th>
//                 <th className="border border-[#E08600] px-4 py-2 text-left">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item) => (
//                 <tr
//                   key={item.productId}
//                   className="odd:bg-[#F5DE7A] even:bg-[#F2EEEC]"
//                 >
//                   <td className="border border-[#E08600] px-4 py-2">
//                     {item.name}
//                   </td>
//                   {/* <td className="border border-[#E08600] px-4 py-2">
//                     {item.quantity}
//                   </td> */}
//                   <td className="border border-[#E08600] px-4 py-2">
//   <div className="flex items-center gap-2">

//     <button
//       type="button"
//       onClick={() => decreaseQuantity(item.productId)}
//       className="bg-[#AA4C0A] text-white w-8 h-8 rounded font-bold hover:bg-[#763A12]"
//     >
//       −
//     </button>

//     <span className="font-semibold w-8 text-center">
//       {item.quantity}
//     </span>

//     <button
//       type="button"
//       onClick={() => increaseQuantity(item.productId)}
//       className="bg-[#E08600] text-white w-8 h-8 rounded font-bold hover:bg-[#AA4C0A]"
//     >
//       +
//     </button>

//   </div>
// </td>
//                   <td className="border border-[#E08600] px-4 py-2">
//                     ₹{item.price}
//                   </td>
//                   <td className="border border-[#E08600] px-4 py-2">
//                     ₹{item.quantity * item.price}
//                   </td>
//                   <td className="border border-[#E08600] px-4 py-2">
//                     <button
//                       className="bg-[#E08600] hover:bg-[#AA4C0A] text-white py-1 px-3 rounded"
//                       onClick={() => deleteItem(item.productId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <h2 className="text-right text-2xl mt-4">
//         Total Price: <span className="text-[#f1a208]">₹{totalPrice}</span>
//       </h2>
//       <div className="text-right mt-4">
//         {cart.length > 0 && (
//           <Form method="post">
//             <button
//               className="bg-[#E08600] hover:bg-[#AA4C0A] text-white py-2 px-4 rounded"
//               type="submit"
//             >
//               Proceed to Checkout
//             </button>
//           </Form>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import { CartItem } from "../../../types/cartTypes";
import { proceedToCheckOut } from "../../../data/orderAPI";

export async function action() {
  const storedCart: CartItem[] =
    JSON.parse(localStorage.getItem("cart") || "[]") || [];

  const totalAmount = storedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const response = await proceedToCheckOut({
    cart: storedCart,
    totalAmount,
  });

  console.log("CHECKOUT RESPONSE =", response);

  if (response.message) {
    localStorage.setItem("currentOrderId", response.orderId);
    return redirect("/checkout");
  }

  return {
    error: response?.error || "Unable to proceed to checkout",
  };
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const actionData = useActionData() as {
    error?: string;
  };

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart") || "[]") || [];

    setCart(storedCart);
  }, []);

  const increaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId: string) => {
    const updatedCart = cart
      .map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to remove an item from the cart
  const deleteItem = (productId: string) => {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Item removed from cart!");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className="
        bg-[#F2EEEC]
        p-3
        sm:p-4
        m-2
        sm:m-4
        rounded
        shadow
      "
    >
      {/* ERROR MESSAGE */}
      {actionData?.error && (
        <p className="text-red-600 text-center text-sm sm:text-base mb-4">
          {actionData.error}
        </p>
      )}

      {/* PAGE TITLE */}
      <h1
        className="
          text-center
          text-2xl
          sm:text-3xl
          md:text-4xl
          mb-4
          font-semibold
        "
      >
        Your Cart
      </h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <p
          className="
            text-center
            text-2xl
            sm:text-3xl
            md:text-4xl
            text-[#AA4C0A]
            py-8
          "
        >
          Your cart is empty!
        </p>
      ) : (
        <>
          {/* CART TABLE */}
          <div className="w-full overflow-x-auto rounded">
            <table
              className="
                min-w-[650px]
                w-full
                border-collapse
                border
                border-[#E08600]
                text-sm
                sm:text-base
              "
            >
              <thead className="bg-[#EFBF38]">
                <tr>
                  <th className="border border-[#E08600] px-3 sm:px-4 py-2 text-left">
                    Product Name
                  </th>

                  <th className="border border-[#E08600] px-3 sm:px-4 py-2 text-left">
                    Quantity
                  </th>

                  <th className="border border-[#E08600] px-3 sm:px-4 py-2 text-left">
                    Price
                  </th>

                  <th className="border border-[#E08600] px-3 sm:px-4 py-2 text-left">
                    Total
                  </th>

                  <th className="border border-[#E08600] px-3 sm:px-4 py-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.productId}
                    className="odd:bg-[#F5DE7A] even:bg-[#F2EEEC]"
                  >
                    {/* PRODUCT NAME */}
                    <td className="border border-[#E08600] px-3 sm:px-4 py-3 break-words">
                      {item.name}
                    </td>

                    {/* QUANTITY */}
                    <td className="border border-[#E08600] px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.productId)
                          }
                          className="
                            bg-[#AA4C0A]
                            text-white
                            w-8
                            h-8
                            rounded
                            font-bold
                            hover:bg-[#763A12]
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          −
                        </button>

                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.productId)
                          }
                          className="
                            bg-[#E08600]
                            text-white
                            w-8
                            h-8
                            rounded
                            font-bold
                            hover:bg-[#AA4C0A]
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          +
                        </button>

                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="border border-[#E08600] px-3 sm:px-4 py-3 whitespace-nowrap">
                      ₹{item.price}
                    </td>

                    {/* TOTAL */}
                    <td className="border border-[#E08600] px-3 sm:px-4 py-3 whitespace-nowrap font-medium">
                      ₹{item.quantity * item.price}
                    </td>

                    {/* DELETE */}
                    <td className="border border-[#E08600] px-3 sm:px-4 py-3">
                      <button
                        type="button"
                        className="
                          bg-[#E08600]
                          hover:bg-[#AA4C0A]
                          text-white
                          py-1.5
                          px-3
                          rounded
                          whitespace-nowrap
                        "
                        onClick={() =>
                          deleteItem(item.productId)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTAL PRICE */}
          <div className="mt-4 text-right">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Total Price:{" "}
              <span className="text-[#f1a208]">
                ₹{totalPrice}
              </span>
            </h2>
          </div>

          {/* CHECKOUT BUTTON */}
          <div className="mt-4 flex justify-end">
            <Form method="post" className="w-full sm:w-auto">
              <button
                className="
                  bg-[#E08600]
                  hover:bg-[#AA4C0A]
                  text-white
                  py-2.5
                  px-4
                  rounded
                  w-full
                  sm:w-auto
                  transition
                "
                type="submit"
              >
                Proceed to Checkout
              </button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}