import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import regions from '../assets/regions'; // Import regions list

function Account() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: user?.name || 'John Doe',
    username: user?.username || 'johndoe',
    email: user?.email || 'john@example.com',
    region: user?.region || '',
    profilePicture: user?.profilePicture || '/placeholder.svg',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });
  const [filteredRegions, setFilteredRegions] = useState([]);
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

    if (name === 'region') {
      const searchQuery = value.toLowerCase();
      const results = regions.filter((region) =>
        region.toLowerCase().startsWith(searchQuery)
      );
      setFilteredRegions(results);
    }
  };

  const handleRegionSelect = (region) => {
    setEditedUserInfo((prevState) => ({
      ...prevState,
      region,
    }));
    setFilteredRegions([]); // Clear dropdown after selection
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserInfo(editedUserInfo);
    setIsEditing(false);
    setFilteredRegions([]);
  };

  const handleCancel = () => {
    setEditedUserInfo({ ...userInfo });
    setFilteredRegions([]);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
      <Header />
      <main className="pt-20 px-4 md:px-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 max-w-5xl mx-auto`}>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative group">
                <img
                  src={editedUserInfo.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover transition duration-300 group-hover:opacity-50"
                />
                {isEditing && (
                  <label
                    htmlFor="profile-picture-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer text-white text-sm font-semibold"
                  >
                    Change
                    <input
                      type="file"
                      id="profile-picture-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleInputChange(e, 'profilePicture')}
                    />
                  </label>
                )}
              </div>
              <div>
                <h3 className={`text-2xl font-nunito ${isDarkMode ? 'text-white' : 'text-granite-dark'}`}>
                  {userInfo.fullName}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-granite-medium'} text-sm`}>
                  @{userInfo.username}
                </p>
              </div>
            </div>

            {/* Triple-Dot Dropdown Menu */}
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
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 ${
                      isDarkMode ? 'text-white hover:bg-gray-600' : 'text-granite-dark hover:bg-granite-light'
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
              {/* Email */}
              <div>
                <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedUserInfo.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-black border-gray-300'
                  } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'}`}
                />
              </div>
              {/* Region */}
              <div className="relative">
                <label className={`block text-lg ${isDarkMode ? 'text-white' : 'text-granite-dark'} mb-2`}>
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  value={editedUserInfo.region}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-black border-gray-300'
                  } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'}`}
                />
                {isEditing && filteredRegions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded-md shadow-lg w-full z-10">
                    {filteredRegions.map((region, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-blue-500 text-black hover:text-black cursor-pointer"
                        onClick={() => handleRegionSelect(region)}
                      >
                        {region}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-md text-white ${
                    isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`px-6 py-2 rounded-md ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'
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
