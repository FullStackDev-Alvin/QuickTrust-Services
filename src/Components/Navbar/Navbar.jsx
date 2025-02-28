import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get the current route
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");
    
    // Redirect the user to the login page
    navigate("/admin/signin");
  };
  // Dynamically load Flowbite script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/flowbite@1.4.1/dist/flowbite.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Check if the user is logged in (based on token)
  const token = localStorage.getItem("authToken");

  return (
    <div className="flex w-full flex-row py-[20px]">
      <nav className="bg-bg py-2.5 w-full fixed z-20 top-0 start-0 border-b-2 border-gray-200">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap text-text">
              QuickTrust - Services
            </span>
          </Link>

          <div className="flex items-center lg:order-2 space-x-3">
            {/* Show Logout button only when token is present */}
            {token ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none hover:bg-red-700 hover:shadow-md hover:text-button transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            ) : (
              // Show Contact Us button when no token is present
              <Link
                to="/contact#contacts"
                className="text-white bg-button focus:ring-4 focus:ring-purple-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none hover:bg-primary hover:shadow-md hover:text-button transition-all duration-300 ease-in-out"
              >
                Contact Us
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? "block" : "hidden"}`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link to="/" className={`block py-2 pl-3 pr-4 font-semibold lg:p-0 ${isActive("/") ? "text-button" : "text-gray-700"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/real-estate" className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-button lg:p-0 ${isActive("/real-estate") ? "text-button" : "text-gray-700"}`}>
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/promotion-marketing" className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-button lg:p-0 ${isActive("/promotion-marketing") ? "text-button" : "text-gray-700"}`}>
                  Promotion & Marketing
                </Link>
              </li>
              <li>
                <Link to="/listings" className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-button lg:p-0 ${isActive("/listings") ? "text-button" : "text-gray-700"}`}>
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-button lg:p-0 ${isActive("/contact") ? "text-button" : "text-gray-700"}`}>
                  Contact
                </Link>
              </li>
              {token ? (
                <li>
                <Link to="/admin/edit" className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-button lg:p-0 ${isActive("/contact") ? "text-button" : "text-gray-700"}`}>
                  Admin Edit
                </Link>
              </li>
              ) : (<></>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
