import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import { useTheme } from '../contexts/ThemeContext';

function Account() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [userInfo, setUserInfo] = useState({
    fullName: 'Seth Demeterio',
    username: 'The Dems',
    email: 'sweatyunderwear@gmail.com',
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

  const handleLogout = () => {
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-granite-softWhite'}`}>
      <Header /> {/* Replaced navigation bar with the Header component */}
      <main className="container mx-auto px-6 py-8">
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
                className={`${isDarkMode ? 'text-white' : 'text-granite-dark'} hover:text-granite-medium focus:outline-none`}
              >
                &#8942; {/* Vertical three dots */}
              </button>
              {showMenu && (
                <div
                  className={`absolute right-0 mt-2 w-40 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${
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

            {/* Password */}
            <div>
              <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={editedUserInfo.password}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-black border-gray-300'
                } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'}`}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                Email Address
              </label>
              <div className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <div className="w-12 h-12 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full">
                  ✉
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-white' : 'text-granite-dark'} text-lg`}>{userInfo.email}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-granite-medium'}`}>1 month ago</p>
                </div>
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            {isEditing && (
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className={`${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-granite-dark hover:bg-granite-medium'
                  } text-white py-3 px-6 rounded-lg transition duration-300`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Appearance Modal */}
      {showAppearanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-bold mb-4`}>Appearance Settings</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6 bg-yellow-400' : 'translate-x-0 bg-gray-800'
                  }`}
                ></div>
              </button>
              <span className={`${isDarkMode ? 'text-white' : 'text-black'} text-sm font-nunito`}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <button
              onClick={() => setShowAppearanceModal(false)}
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
