import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Header() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  return (
    <header
      className={`py-3 px-6 shadow-md ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-700"
          : "bg-gradient-to-r from-granite-dark to-granite-medium"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 hidden lg:flex">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-gray-800" : "bg-granite-light"
            }`}
          >
            <span
              className={`text-lg font-bold ${
                isDarkMode ? "text-gray-200" : "text-granite-dark"
              }`}
            >
              🎬
            </span>
          </div>
          <h1
            className="text-xl font-bold font-nunito"
            style={{
              color: isDarkMode ? "#ffffff" : "#f5f5f5",
              fontVariant: "small-caps",
            }}
          >
            WatchTracker
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
          {[
            { name: "My List", path: "/dashboard" },
            { name: "Movies", path: "/movies" },
            { name: "Profile", path: "/account" },
            { name: "Logout", path: "/login" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.path}
              className={`relative text-base font-medium transition duration-300 ${
                location.pathname === link.path
                  ? isDarkMode
                    ? "text-white"
                    : "text-gray-100"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span
                  className={`absolute left-0 -bottom-1 h-1 w-full rounded-full ${
                    isDarkMode ? "bg-white" : "bg-gray-100"
                  }`}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
