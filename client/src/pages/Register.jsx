import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/authStore';

function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",     
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData); // Debug: Verify data from form
    const { confirmPassword, ...registrationData } = formData;
    await register(registrationData);
    // Redirect only if registration succeeds
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/dashboard');
    } else {
      console.error('Registration failed:', error); // Debug: Display error if exists
    }
  };
  

  return (
    <div className="min-h-screen bg-granite-softWhite flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-granite-dark to-granite-medium text-white py-4 shadow-md">
        <div className="container mx-auto flex items-left justify-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-granite-light flex items-center justify-center">
              <span className="text-xl font-bold text-granite-dark">🎬</span>
            </div>
            <h1 className="text-2xl font-bold font-nunito">WatchTracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="w-3/4 h-3/4 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/55787/pexels-photo-55787.jpeg?cs=srgb&dl=pexels-donaldtong94-55787.jpg&fm=jpg"
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center px-8 py-12">
          <form
            onSubmit={handleSubmit}
            className="bg-granite-softWhite p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-3xl text-left font-nunito text-black">
              Create an Account
            </h2>
            <p className="text-sm text-black text-left font-nunito">
              Enter your information below to create your account
              <br />
              Use /dashboard in URL to access website *Dev*
            </p>
            {(localError || error) && (
              <div className="bg-red-100 text-red-600 border border-red-500 p-3 rounded">
                {localError || error}
              </div>
            )}

            <div className="space-y-8">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
            />

              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                required
                className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="bg-granite-softWhite block w-full border-b border-granite-medium focus:outline-none focus:border-granite-dark focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-granite-dark text-white py-3 px-4 rounded-md hover:bg-granite-medium focus:outline-none focus:ring-2 focus:ring-granite-medium focus:ring-offset-2 transition duration-300"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-granite-dark text-left mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-granite-dark hover:text-granite-medium">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
