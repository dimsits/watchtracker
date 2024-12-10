import { useState } from 'react';

function Account() {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Seth Demeterio',
    username: 'The Dems',
    email: 'sweatyunderdwear@gmail.com',
    password: '••••••••',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo }); // Store editable data
  const [showMenu, setShowMenu] = useState(false); // State for dropdown menu visibility

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
    setUserInfo(editedUserInfo); // Update user info with edited values
    setIsEditing(false); // Exit editing mode
  };

  const handleCancel = () => {
    setEditedUserInfo({ ...userInfo }); // Reset edits to original values
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-granite-softWhite">
      {/* Navigation Bar */}
      <header className="bg-granite-dark text-white py-4 px-8 shadow-md">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold font-nunito">WatchTracker</h1>
    
    {/* Centered Navigation */}
    <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12">
      <a 
        href="/dashboard" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        My List
      </a>
      <a 
        href="/movies" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Movies
      </a>
      <a 
        href="/account" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Account
      </a>
      <a 
        href="/login" 
        className="text-white text-lg font-semi hover:text-granite-light transition duration-300 font-nunito"
      >
        Logout
      </a>
    </nav>
  </div>
</header>


      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-12 max-w-5xl mx-auto">
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
                <h3 className="text-2xl font-nunito text-granite-dark">
                  {userInfo.fullName}
                </h3>
                <p className="text-granite-medium text-sm">{userInfo.email}</p>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="text-granite-dark hover:text-granite-medium focus:outline-none"
              >
                &#8942; {/* Vertical three dots */}
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-granite-light shadow-lg rounded-md">
                  <button
                    onClick={handleEdit}
                    className="block w-full text-left px-4 py-2 text-granite-dark hover:bg-granite-light hover:text-granite-dark transition"
                  >
                    Edit Profile
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
                <label className="block text-lg text-granite-dark mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editedUserInfo.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg bg-gray-50 ${
                    isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'
                  }`}
                />
              </div>
              {/* Username */}
              <div>
                <label className="block text-lg text-granite-dark mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editedUserInfo.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg bg-gray-50 ${
                    isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg text-granite-dark mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={editedUserInfo.password}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg bg-gray-50 ${
                  isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'cursor-not-allowed'
                }`}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-lg text-granite-dark mb-2">Email Address</label>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full">
                  ✉
                </div>
                <div>
                  <p className="text-granite-dark text-lg">{userInfo.email}</p>
                  <p className="text-sm text-granite-medium">1 month ago</p>
                </div>
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            {isEditing && (
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-granite-dark text-white py-3 px-6 rounded-lg hover:bg-granite-medium transition duration-300"
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
    </div>
  );
}

export default Account;
