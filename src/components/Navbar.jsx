import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/features/auth/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
    
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors duration-200 flex items-center gap-2"
          >
            <span>Hotel Reservation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white hover:text-blue-200 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-white hover:text-blue-200 font-medium transition-colors duration-200 relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}

            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 font-medium transition-colors duration-200 relative group"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6 border-l border-blue-400 pl-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-100">Welcome,</span>
                  <span className="font-semibold text-white">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 block px-3 py-2 rounded-md text-base font-semibold text-center transition-colors duration-200 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-blue-100">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
