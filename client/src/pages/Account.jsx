import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Import the Header component
import { useTheme } from '../contexts/ThemeContext';
import useAuthStore from '../store/authStore'; // Import the Zustand store
import { useNavigate } from 'react-router-dom';

function Account() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuthStore(); // Access logout action and user data from the store
  const navigate = useNavigate(); // Use navigate for redirection

  const [userInfo, setUserInfo] = useState({
    fullName: user?.name || 'John Doe',
    username: user?.username || 'johndoe',
    email: user?.email || 'john@example.com',
    password: '••••••••',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });
  const [showMenu, setShowMenu] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserInfo(editedUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUserInfo({ ...userInfo });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout action from Zustand store
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu') && !event.target.closest('.dropdown-button')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-granite-softWhite'}`}>
      <Header /> {/* Replaced navigation bar with the Header component */}
      <main className="pt-20 px-4 md:px-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 max-w-5xl mx-auto`}>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className={`text-2xl font-nunito ${isDarkMode ? 'text-white' : 'text-granite-dark'}`}>
                  {userInfo.fullName}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-granite-medium'} text-sm`}>
                  {userInfo.email}
                </p>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className={`${isDarkMode ? 'text-white' : 'text-granite-dark'} hover:text-granite-medium focus:outline-none dropdown-button`}
              >
                &#8942; {/* Vertical three dots */}
              </button>
              {showMenu && (
                <div
                  className={`dropdown-menu absolute right-0 mt-2 w-40 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${
                    isDarkMode ? 'border-gray-600' : 'border-granite-light'
                  } shadow-lg rounded-md`}
                >
                  <button
                    onClick={handleEdit}
                    className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'text-white hover:bg-gray-600' : 'text-granite-dark hover:bg-granite-light'} transition`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowAppearanceModal(true);
                      setShowMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'text-white hover:bg-gray-600' : 'text-granite-dark hover:bg-granite-light'} transition`}
                  >
                    Appearance
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 ${
                      isDarkMode
                        ? 'text-white hover:bg-gray-600'
                        : 'text-granite-dark hover:bg-granite-light'
                    } transition`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editedUserInfo.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-black border-gray-300'
                  } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'}`}
                />
              </div>
              {/* Username */}
              <div>
                <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editedUserInfo.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-black border-gray-300'
                  } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'}`}
                />
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            {isEditing && (
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className={`${
                    isDarkMode 
                    ? "bg-darkGranite-button hover:bg-darkGranite-hover text-sm font-semibold text-granite-softWhite"
                    : "bg-granite-medium hover:bg-granite-light  text-sm font-semibold text-granite-softWhite"
                  } text-white py-3 px-6 rounded-lg transition duration-300`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`px-6 py-2 rounded-md text-sm transition ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 font-semibold text-sm text-granite-softWhite"
                      : "bg-gray-300 hover:bg-gray-400 font-semibold text-sm text-granite-softWhite"
                  }`}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Account;
