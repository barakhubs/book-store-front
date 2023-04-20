import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  const handleLogout = () => {
    // Perform logout logic here, such as clearing token from localStorage
    localStorage.removeItem("token");
    // Update isLoggedIn state to false to trigger re-render of header component
    setIsLoggedIn(false);
  };

  return (
    <div>
    <nav className="bg-white dark:bg-gray-800">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className=" flex items-center">
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
                    </Link>
                    <Link
                      to="/"
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
        </div>
      </div>
    </nav>
  </div>
  );
}

export default Header;
