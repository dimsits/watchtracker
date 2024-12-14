import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useHeaderTransparency } from "../hooks/useHeaderTransparency";

function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // Use toggleTheme to switch themes
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
            {[
              { name: "Your Watchlist", path: "/dashboard" },
              { name: "Seen Movies", path: "/seen" },
              { name: "Find Movies", path: "/movies" },
              { name: "Account", path: "/account" },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`relative text-base font-medium transition duration-300 ${
                  isTransparent || isDarkMode
                    ? "text-white hover:text-gray-800" //
                    : "text-gray-800 hover:text-gray-900"
                }`}                
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-white" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Dark/Light Mode Toggle */}
        <div>
          <button
            onClick={toggleTheme} // Toggle dark/light mode
            className="text-2xl focus:outline-none transform transition-transform duration-500 hover:scale-125"
            title={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
          >
            <span
              className={`block transition-transform duration-500 ${
                isDarkMode ? "rotate-90 opacity-100" : "rotate-0 opacity-100"
              }`}
            >
              {isDarkMode ? "🌙" : "☀️"} {/* Moon for dark mode, sun for light mode */}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
