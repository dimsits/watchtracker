import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useHeaderTransparency } from "../hooks/useHeaderTransparency";

function Header() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const isTransparent = useHeaderTransparency();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isTransparent
          ? "bg-gradient-to-b from-black/25 to-transparent"
          : isDarkMode
          ? "bg-gray-900/95"
          : "bg-white/95"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo, Website Name, and Links */}
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <h1
              className={`text-xl font-bold font-nunito ${
                isTransparent || isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              WatchTracker
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            {[{ name: "Your Watchlist", path: "/dashboard" }, { name: "Seen Movies", path: "/seen" }, { name: "Find Movies", path: "/movies" }, { name: "Account", path: "/account" }].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`relative text-base font-medium transition duration-300 ${
                  isTransparent || isDarkMode ? "text-white" : "text-gray-800"
                } hover:text-gray-300`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-white" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section (if needed for future functionality) */}
        <div></div>
      </div>
    </header>
  );
}

export default Header;
