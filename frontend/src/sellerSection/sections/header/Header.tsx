
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <section className="bg-background">
//       <header className="flex justify-between items-center py-4 px-6 border-b-2 border-accent">

//         {/* Logo - clicking it goes to main Home */}
//         <Link to="/">
//           <img
//             className="w-40"
//             src="/main-logo.png"
//             alt="Main Logo"
//           />
//         </Link>

//         {/* Navigation */}
//         <nav>
//           <ul className="flex space-x-6 items-center">

//             <li>
//               <Link
//                 to="/"
//                 className="text-accent font-medium hover:text-lighterAccent transition-colors"
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/panel/seller/"
//                 className="text-accent font-medium hover:text-lighterAccent transition-colors"
//               >
//                 Products Listing
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/panel/seller/orders"
//                 className="text-accent font-medium hover:text-lighterAccent transition-colors"
//               >
//                 Orders
//               </Link>
//             </li>

//           </ul>
//         </nav>

//         {/* Profile */}
//         <Link
//           to="/panel/seller/profile"
//           className="hover:text-lighterAccent"
//         >
//           <svg
//             className="w-6 h-6 text-yellowish transition-colors duration-300"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 448 512"
//           >
//             <path
//               fill="currentColor"
//               d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
//             />
//           </svg>
//         </Link>

//       </header>
//     </section>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <section className="bg-background">
      <header className="border-b-2 border-accent">

        {/* Main Header */}
        <div className="flex justify-between items-center py-3 sm:py-4 px-3 sm:px-6">

          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
            <img
              className="w-32 sm:w-40"
              src="/main-logo.png"
              alt="Main Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-5 lg:space-x-6 items-center">

              <li>
                <Link
                  to="/"
                  className="text-accent font-medium hover:text-lighterAccent transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/panel/seller/"
                  className="text-accent font-medium hover:text-lighterAccent transition-colors"
                >
                  Products Listing
                </Link>
              </li>

              <li>
                <Link
                  to="/panel/seller/orders"
                  className="text-accent font-medium hover:text-lighterAccent transition-colors"
                >
                  Orders
                </Link>
              </li>

            </ul>
          </nav>

          {/* Desktop Profile */}
          <Link
            to="/panel/seller/profile"
            className="hidden md:block hover:text-lighterAccent"
            aria-label="Seller Profile"
          >
            <svg
              className="w-6 h-6 text-yellowish transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
              />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-accent p-2"
            aria-label="Toggle seller menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 96C0 78.3 14.3 64 32 64H416C433.7 64 448 78.3 448 96s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256C0 238.3 14.3 224 32 224H416C433.7 224 448 238.3 448 256s-14.3 32-32 32H32C14.3 288 0 273.7 0 256zM0 416C0 398.3 14.3 384 32 384H416C433.7 384 448 398.3 448 416s-14.3 32-32 32H32C14.3 448 0 433.7 0 416z"
                />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-accent bg-white px-4 py-4 shadow-md">

            <nav>
              <ul className="flex flex-col gap-4">

                <li>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block text-accent font-medium py-2 hover:text-lighterAccent transition-colors"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/panel/seller/"
                    onClick={closeMenu}
                    className="block text-accent font-medium py-2 hover:text-lighterAccent transition-colors"
                  >
                    Products Listing
                  </Link>
                </li>

                <li>
                  <Link
                    to="/panel/seller/orders"
                    onClick={closeMenu}
                    className="block text-accent font-medium py-2 hover:text-lighterAccent transition-colors"
                  >
                    Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/panel/seller/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-accent font-medium py-2 hover:text-lighterAccent transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-yellowish"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                      />
                    </svg>

                    Profile
                  </Link>
                </li>

              </ul>
            </nav>

          </div>
        )}

      </header>
    </section>
  );
}