// Import necessary modules
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // State to store cart item count

  useEffect(() => {
    // Fetch cart items from local storage and update cart item count
    setCartItemCount(localStorage.getItem('cartsTotal'));
  }, []);

  const handleLogout = () => {
    // Perform logout logic here, such as clearing token from localStorage
    localStorage.removeItem("token");
    // Update isLoggedIn state to false to trigger re-render of header component
    setIsLoggedIn(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Store
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/cart"
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Cart
                        {cartItemCount > 0 && ( // Render badge only if cart item count is greater than 0
                          <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/orders"
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Orders
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <div className="flex items-center">
                <span className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {`Welcome, ${localStorage.getItem('username')}`}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            )}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleMobileMenuToggle}
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5H20C20.5523 5 21 M12 6C11.4477 6 11 6.4477 11 7C11 7.5523 11.4477 8 12 8H20C20.5523 8 21 7.5523 21 7C21 6.4477 20.5523 6 20 6H12ZM20 12H4C3.4477 12 3 12.4477 3 13C3 13.5523 3.4477 14 4 14H20C20.5523 14 21 13.5523 21 13C21 12.4477 20.5523 12 20 12ZM3 17C3 16.4477 3.4477 16 4 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H4C3.4477 18 3 17.5523 3 17Z"
                      fill="currentColor"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5ZM20 12H4C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14H20C20.5523 14 21 13.5523 21 13C21 12.4477 20.5523 12 20 12ZM20 17H4C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17Z"
                      fill="currentColor"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Store
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/orders"
                    className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Orders
                  </Link>
                </>
              ) : (

                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;

