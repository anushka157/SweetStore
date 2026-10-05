// // import { useState } from "react";
// // import { availableSavories, availableSweets } from "../../../data/filterData";
// // import Filter from "../Filters";
// // import { Search } from "../Header/Search";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Header() {
// //   const [drop, setDrop] = useState({
// //     sweets: false,
// //     savories: false,
// //     search: false,
// //   });

// //   const navigate = useNavigate();

// //   const renderSweets = availableSweets.map((sweet, index) => (
// //     <li key={index} className="filters w-full mt-1 ">
// //       <label htmlFor={sweet} className="flex  gap-2 items-center select-none">
// //         <input
// //           type="checkbox"
// //           name={sweet}
// //           id={sweet}
// //           value={sweet}
// //           className="
            
// //             shrink-0
// //             appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
// //             focus:outline-none
// //             disabled:border-gray-600 disabled:bg-gray-600
// //             "
// //         />
// //         {sweet}
// //       </label>
// //     </li>
// //   ));

// //   const renderSavories = availableSavories.map((savroy, index) => (
// //     <li key={index} className="filters  mx-1 mt-1">
// //       <label
// //         htmlFor={savroy}
// //         className="flex w-full gap-2 items-center select-none"
// //       >
// //         <input
// //           type="checkbox"
// //           name={savroy}
// //           id={savroy}
// //           value={savroy}
// //           className="
// //           shrink-0
// //           appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
// //           focus:outline-none
// //           disabled:border-gray-600 disabled:bg-gray-600
// //           "
// //         />
// //         {savroy}
// //       </label>
// //     </li>
// //   ));
// //   return (
// //     <header className="select-none flex justify-between bg-berkeleyBlue py-2 bg-white">
// //       <section className="ml-4">
// //         <img src="main-logo.png" alt="" className="w-[11rem]" />
// //       </section>
// //       {drop.search && <Search />}
// //       <section className="text-xl min-w-[20rem]  flex justify-around items-center">
// //         {/* <span
// //           onClick={() =>
// //             setDrop((drop) => ({
// //               ...drop,
// //               savories: false,
// //               sweets: !drop.sweets,
// //             }))
// //           }
// //           className="underline cursor-pointer hover:no-underline relative"
// //         >
// //           Sweets
// //           <section
// //             className={` bg-white p-3 border rounded-sm min-w-[15rem] absolute left-[-1rem] ${
// //               !drop.sweets ? "hidden" : ""
// //             }`}
// //           >
// //             <div className="mb-4 text-indigoDye">All Sweets</div>
// //             <ul>{renderSweets}</ul>
// //           </section>
// //         </span>
// //         <span
// //           onClick={() =>
// //             setDrop((drop) => ({
// //               ...drop,
// //               sweets: false,
// //               savories: !drop.savories,
// //             }))
// //           }
// //           className="underline cursor-pointer hover:no-underline relative"
// //         >
// //           Savories
// //           <section
// //             className={`bg-white p-3 border rounded-sm min-w-[15rem] absolute left-[-1rem] ${
// //               !drop.savories ? "hidden" : ""
// //             }`}
// //           >
// //             <div className="mb-4 text-indigoDye">All Savories</div>
// //             <ul>{renderSavories}</ul>
// //           </section>
// //         </span> */}
// //       </section>
// //       <Link
// //         to="/panel/seller/login"
// //         className="px-4 py-2 bg-orangeee text-white font-medium rounded-lg shadow-md hover:bg-lighterAccent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
// //       >
// //         Login as a Seller
// //       </Link>
// //       <section className="flex gap-[1rem] items-center justify-end mr-[5rem]">
// //         <svg
// //           className="w-[1.7rem] inline-block text-yellowish"
// //           xmlns="http://www.w3.org/2000/svg"
// //           viewBox="0 0 512 512"
// //         >
// //           <path
// //             fill="currentColor"
// //             d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
// //           />
// //         </svg>
// //         <svg
// //           onClick={() => navigate("/cart")}
// //           className="w-[1.7rem] text-yellowish"
// //           xmlns="http://www.w3.org/2000/svg"
// //           viewBox="0 0 576 512"
// //         >
// //           <path
// //             fill="currentColor"
// //             d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
// //           />
// //         </svg>
// //         <svg
// //           className="w-[1.4rem] text-yellowish"
// //           xmlns="http://www.w3.org/2000/svg"
// //           viewBox="0 0 448 512"
// //         >
// //           <path
// //             fill="currentColor"
// //             d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
// //           />
// //         </svg>
// //       </section>
// //     </header>
// //   );
// // }
// // import { useState } from "react";
// // import { availableSavories, availableSweets } from "../../../data/filterData";
// // import Filter from "../Filters";
// // import { Search } from "../Header/Search";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Header() {
// //   const [drop, setDrop] = useState({
// //     sweets: false,
// //     savories: false,
// //     search: false,
// //   });

// //   const navigate = useNavigate();

// //   const renderSweets = availableSweets.map((sweet, index) => (
// //     <li key={index} className="filters w-full mt-1">
// //       <label htmlFor={sweet} className="flex gap-2 items-center select-none">
// //         <input
// //           type="checkbox"
// //           name={sweet}
// //           id={sweet}
// //           value={sweet}
// //           className="
// //             shrink-0
// //             appearance-none w-6 h-6 border-2 rounded-md checked:bg-citron
// //             focus:outline-none
// //             disabled:border-gray-600 disabled:bg-gray-600
// //           "
// //         />
// //         {sweet}
// //       </label>
// //     </li>
// //   ));

// //   const renderSavories = availableSavories.map((savroy, index) => (
// //     <li key={index} className="filters mx-1 mt-1">
// //       <label
// //         htmlFor={savroy}
// //         className="flex w-full gap-2 items-center select-none"
// //       >
// //         <input
// //           type="checkbox"
// //           name={savroy}
// //           id={savroy}
// //           value={savroy}
// //           className="
// //             shrink-0
// //             appearance-none w-6 h-6 border-2 rounded-md checked:bg-citron
// //             focus:outline-none
// //             disabled:border-gray-600 disabled:bg-gray-600
// //           "
// //         />
// //         {savroy}
// //       </label>
// //     </li>
// //   ));

// //   return (
// //     <header className="select-none flex justify-between items-center bg-white py-2 border-b-2 border-accent">

// //       {/* Logo */}
// //       <section className="ml-4">
// //         <Link to="/">
// //           <img
// //             src="/main-logo.png"
// //             alt="SweetStore"
// //             className="w-[11rem] cursor-pointer"
// //           />
// //         </Link>
// //       </section>

// //       {/* Search */}
// //       {drop.search && <Search />}

// //       {/* Main Navigation */}
// //       <nav className="flex items-center gap-6 text-lg">

// //         <Link
// //           to="/"
// //           className="text-accent font-medium hover:text-lighterAccent transition-colors"
// //         >
// //           Home
// //         </Link>

// //         <Link
// //           to="/my-orders"
// //           className="text-accent font-medium hover:text-lighterAccent transition-colors"
// //         >
// //           My Orders
// //         </Link>

// //         {/* <Link
// //           to="/panel/seller/login"
// //           className="px-4 py-2 bg-orangeee text-white font-medium rounded-lg shadow-md hover:bg-lighterAccent transition-colors duration-300"
// //         >
// //           Login as a Seller
// //         </Link> */}

// //       </nav>

// //       {/* Right-side icons */}
// //       <section className="flex gap-[1rem] items-center justify-end mr-[5rem]">

// //         {/* Search */}
// //         <button
// //           type="button"
// //           onClick={() =>
// //             setDrop((drop) => ({
// //               ...drop,
// //               search: !drop.search,
// //             }))
// //           }
// //           className="cursor-pointer"
// //           aria-label="Search"
// //         >
// //           <svg
// //             className="w-[1.7rem] text-yellowish"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 512 512"
// //           >
// //             <path
// //               fill="currentColor"
// //               d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
// //             />
// //           </svg>
// //         </button>

// //         {/* Cart */}
// //         <button
// //           type="button"
// //           onClick={() => navigate("/cart")}
// //           className="cursor-pointer"
// //           aria-label="Cart"
// //         >
// //           <svg
// //             className="w-[1.7rem] text-yellowish"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 576 512"
// //           >
// //             <path
// //               fill="currentColor"
// //               d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0 96 48 48 0 0 1 0-96z"
// //             />
// //           </svg>
// //         </button>

// //         {/* Profile */}
// //         <button
// //           type="button"
// // onClick={() => navigate("/login")}
// //           className="cursor-pointer"
// //           aria-label="Customer Login"
// //         >
// //           <svg
// //             className="w-[1.4rem] text-yellowish"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 448 512"
// //           >
// //             <path
// //               fill="currentColor"
// //               d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
// //             />
// //           </svg>
// //         </button>

// //       </section>
// //     </header>
// //   );
// // }
// import { useState } from "react";
// import { availableSavories, availableSweets } from "../../../data/filterData";
// import Filter from "../Filters";
// import { Search } from "../Header/Search";
// import { Link, useNavigate } from "react-router-dom";

// export default function Header() {
//   const [drop, setDrop] = useState({
//     sweets: false,
//     savories: false,
//     search: false,
//   });

//   const navigate = useNavigate();

//   // Check current login role
//   const sellerToken = localStorage.getItem("jwtToken");
//   const customerToken = localStorage.getItem("jwtCustomerToken");
//   const adminToken = localStorage.getItem("jwtAdminToken");

//   const isSeller = !!sellerToken && !customerToken;
//   const isCustomer = !!customerToken;
//   const isAdmin = !!adminToken;

//   const renderSweets = availableSweets.map((sweet, index) => (
//     <li key={index} className="filters w-full mt-1">
//       <label
//         htmlFor={sweet}
//         className="flex gap-2 items-center select-none"
//       >
//         <input
//           type="checkbox"
//           name={sweet}
//           id={sweet}
//           value={sweet}
//           className="
//             shrink-0
//             appearance-none w-6 h-6 border-2 rounded-md checked:bg-citron
//             focus:outline-none
//             disabled:border-gray-600 disabled:bg-gray-600
//           "
//         />
//         {sweet}
//       </label>
//     </li>
//   ));

//   const renderSavories = availableSavories.map((savroy, index) => (
//     <li key={index} className="filters mx-1 mt-1">
//       <label
//         htmlFor={savroy}
//         className="flex w-full gap-2 items-center select-none"
//       >
//         <input
//           type="checkbox"
//           name={savroy}
//           id={savroy}
//           value={savroy}
//           className="
//             shrink-0
//             appearance-none w-6 h-6 border-2 rounded-md checked:bg-citron
//             focus:outline-none
//             disabled:border-gray-600 disabled:bg-gray-600
//           "
//         />
//         {savroy}
//       </label>
//     </li>
//   ));

//   return (
//     <header className="select-none flex justify-between items-center bg-white py-2 border-b-2 border-accent">

//       {/* Logo */}
//       <section className="ml-4">
//         <Link to="/">
//           <img
//             src="/main-logo.png"
//             alt="SweetStore"
//             className="w-[11rem] cursor-pointer"
//           />
//         </Link>
//       </section>

//       {/* Search */}
//       {drop.search && <Search />}

//       {/* MAIN NAVIGATION */}
//       <nav className="flex items-center gap-6 text-lg">

//         {/* Everyone */}
//         <Link
//           to="/"
//           className="text-accent font-medium hover:text-lighterAccent transition-colors"
//         >
//           Home
//         </Link>

//         {/* CUSTOMER NAVIGATION */}
//         {isCustomer && (
//           <Link
//             to="/my-orders"
//             className="text-accent font-medium hover:text-lighterAccent transition-colors"
//           >
//             My Orders
//           </Link>
//         )}

//         {/* SELLER NAVIGATION */}
//         {isSeller && (
//           <>
//             <Link
//               to="/panel/seller/"
//               className="text-accent font-medium hover:text-lighterAccent transition-colors"
//             >
//               Products Listing
//             </Link>

//             <Link
//               to="/panel/seller/orders"
//               className="text-accent font-medium hover:text-lighterAccent transition-colors"
//             >
//               Orders
//             </Link>
//           </>
//         )}

//       </nav>

//       {/* RIGHT SIDE ICONS */}
//       <section className="flex gap-[1rem] items-center justify-end mr-[5rem]">

//         {/* Search */}
//         <button
//           type="button"
//           onClick={() =>
//             setDrop((drop) => ({
//               ...drop,
//               search: !drop.search,
//             }))
//           }
//           className="cursor-pointer"
//           aria-label="Search"
//         >
//           <svg
//             className="w-[1.7rem] text-yellowish"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//           >
//             <path
//               fill="currentColor"
//               d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
//             />
//           </svg>
//         </button>

//         {/* CART - CUSTOMER ONLY */}
//         {isCustomer && (
//           <button
//             type="button"
//             onClick={() => navigate("/cart")}
//             className="cursor-pointer"
//             aria-label="Cart"
//           >
//             <svg
//               className="w-[1.7rem] text-yellowish"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 576 512"
//             >
//               <path
//                 fill="currentColor"
//                 d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm336-48a48 48 0 1 1 0 96 48 48 0 0 1 0 96 48 48 0 0 1 0-96z"
//               />
//             </svg>
//           </button>
//         )}

//         {/* PROFILE */}
//         <button
//           type="button"
//           onClick={() => navigate("/login")}
//           className="cursor-pointer"
//           aria-label="Profile"
//         >
//           <svg
//             className="w-[1.4rem] text-yellowish"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 448 512"
//           >
//             <path
//               fill="currentColor"
//               d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
//             />
//           </svg>
//         </button>

//       </section>
//     </header>
//   );
// }
import { useState } from "react";
import { availableSavories, availableSweets } from "../../../data/filterData";
import Filter from "../Filters";
import { Search } from "../Header/Search";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [drop, setDrop] = useState({
    sweets: false,
    savories: false,
    search: false,
    menu: false,
  });

  const navigate = useNavigate();

  // Check current login role
  const sellerToken = localStorage.getItem("jwtToken");
  const customerToken = localStorage.getItem("jwtCustomerToken");
  const adminToken = localStorage.getItem("jwtAdminToken");

  const isSeller = !!sellerToken && !customerToken;
  const isCustomer = !!customerToken;
  const isAdmin = !!adminToken;

  const renderSweets = availableSweets.map((sweet, index) => (
    <li key={index} className="filters w-full mt-1">
      <label
        htmlFor={sweet}
        className="flex gap-2 items-center select-none"
      >
        <input
          type="checkbox"
          name={sweet}
          id={sweet}
          value={sweet}
          className="
            shrink-0
            appearance-none
            w-6 h-6
            border-2
            rounded-md
            checked:bg-citron
            focus:outline-none
            disabled:border-gray-600
            disabled:bg-gray-600
          "
        />
        {sweet}
      </label>
    </li>
  ));

  const renderSavories = availableSavories.map((savroy, index) => (
    <li key={index} className="filters mx-1 mt-1">
      <label
        htmlFor={savroy}
        className="flex w-full gap-2 items-center select-none"
      >
        <input
          type="checkbox"
          name={savroy}
          id={savroy}
          value={savroy}
          className="
            shrink-0
            appearance-none
            w-6 h-6
            border-2
            rounded-md
            checked:bg-citron
            focus:outline-none
            disabled:border-gray-600
            disabled:bg-gray-600
          "
        />
        {savroy}
      </label>
    </li>
  ));

  const closeMenu = () => {
    setDrop((prev) => ({
      ...prev,
      menu: false,
    }));
  };

  return (
    <header className="select-none bg-white border-b-2 border-accent relative">

      {/* ================= DESKTOP / MOBILE HEADER ================= */}
      <div className="flex justify-between items-center py-2 px-3 sm:px-4">

        {/* LOGO */}
        <section>
          <Link to="/" onClick={closeMenu}>
            <img
              src="/main-logo.png"
              alt="SweetStore"
              className="w-[8.5rem] sm:w-[10rem] md:w-[11rem] cursor-pointer"
            />
          </Link>
        </section>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-base lg:text-lg">

          {/* HOME */}
          <Link
            to="/"
            className="text-accent font-medium hover:text-lighterAccent transition-colors"
          >
            Home
          </Link>

          {/* CUSTOMER */}
          {isCustomer && (
            <Link
              to="/my-orders"
              className="text-accent font-medium hover:text-lighterAccent transition-colors"
            >
              My Orders
            </Link>
          )}

          {/* SELLER */}
          {isSeller && (
            <>
              <Link
                to="/panel/seller/"
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                Products Listing
              </Link>

              <Link
                to="/panel/seller/orders"
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                Orders
              </Link>
            </>
          )}

        </nav>

        {/* ================= RIGHT SIDE DESKTOP ================= */}
        <section className="hidden md:flex gap-4 lg:gap-5 items-center">

          {/* SEARCH */}
          <button
            type="button"
            onClick={() =>
              setDrop((prev) => ({
                ...prev,
                search: !prev.search,
              }))
            }
            className="cursor-pointer"
            aria-label="Search"
          >
            <svg
              className="w-6 h-6 lg:w-[1.7rem] text-yellowish"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
              />
            </svg>
          </button>

          {/* CART */}
          {isCustomer && (
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="cursor-pointer"
              aria-label="Cart"
            >
              <svg
                className="w-6 h-6 lg:w-[1.7rem] text-yellowish"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                />
              </svg>
            </button>
          )}

          {/* PROFILE */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer"
            aria-label="Profile"
          >
            <svg
              className="w-6 h-6 lg:w-[1.4rem] text-yellowish"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
              />
            </svg>
          </button>

        </section>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() =>
            setDrop((prev) => ({
              ...prev,
              menu: !prev.menu,
            }))
          }
          className="md:hidden text-accent p-2"
          aria-label="Open menu"
          aria-expanded={drop.menu}
        >
          {drop.menu ? (
            /* X icon */
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M342.6 182.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 242.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 288 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 333.3l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 288l105.3-105.4z"
              />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm32 128C14.3 384 0 369.7 0 352s14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      {drop.search && (
        <div className="px-3 pb-3 md:px-4">
          <Search />
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {drop.menu && (
        <div className="md:hidden border-t border-accent bg-white px-4 py-4 shadow-md">

          <nav className="flex flex-col gap-4 text-base">

            {/* HOME */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-accent font-medium hover:text-lighterAccent transition-colors"
            >
              Home
            </Link>

            {/* CUSTOMER */}
            {isCustomer && (
              <Link
                to="/my-orders"
                onClick={closeMenu}
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                My Orders
              </Link>
            )}

            {/* SELLER */}
            {isSeller && (
              <>
                <Link
                  to="/panel/seller/"
                  onClick={closeMenu}
                  className="text-accent font-medium hover:text-lighterAccent transition-colors"
                >
                  Products Listing
                </Link>

                <Link
                  to="/panel/seller/orders"
                  onClick={closeMenu}
                  className="text-accent font-medium hover:text-lighterAccent transition-colors"
                >
                  Orders
                </Link>
              </>
            )}

            {/* SEARCH */}
            <button
              type="button"
              onClick={() => {
                setDrop((prev) => ({
                  ...prev,
                  search: !prev.search,
                  menu: false,
                }));
              }}
              className="text-left text-accent font-medium"
            >
              Search
            </button>

            {/* CART */}
            {isCustomer && (
              <button
                type="button"
                onClick={() => {
                  navigate("/cart");
                  closeMenu();
                }}
                className="text-left text-accent font-medium"
              >
                Cart
              </button>
            )}

            {/* PROFILE / LOGIN */}
            <button
              type="button"
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
              className="text-left text-accent font-medium"
            >
              Profile / Login
            </button>

          </nav>
        </div>
      )}

    </header>
  );
}